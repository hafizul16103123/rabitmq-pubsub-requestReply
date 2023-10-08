import pika

class EventPublisherDirectExchange:
    _instance = None  # Class-level variable to store the singleton instance

    def __new__(cls, host='localhost', username='admin', password='admin-pass'):
        if cls._instance is None:
            cls._instance = super(EventPublisherDirectExchange, cls).__new__(cls)
            cls._instance.initialize(host, username, password)
        return cls._instance

    def initialize(self, host, username, password):
        credentials = pika.PlainCredentials(username, password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host, credentials=credentials)
        )
        self.channel = self.connection.channel()

        # Declare a direct exchange for publishing events
        self.channel.exchange_declare(exchange='events_direct', exchange_type='direct')

    def publish_event(self, event_message, routing_key=''):
        self.channel.basic_publish(
            exchange='events_direct',
            routing_key=routing_key,
            body=event_message
        )
        print(f"Published event: {event_message} with routing key: {routing_key}")

# Example: Publish an event with a custom routing key
event_publisher = EventPublisherDirectExchange()  # You can provide custom host, username, and password here if needed
event_publisher.publish_event("Something happened in Microservice 3!", routing_key='routing_key_01')
