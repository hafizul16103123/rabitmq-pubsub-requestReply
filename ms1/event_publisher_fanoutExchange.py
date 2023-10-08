import pika

class EventPublisher:
    _instance = None  # Class-level variable to store the singleton instance

    def __new__(cls, host='localhost', username='admin', password='admin-pass'):
        if cls._instance is None:
            cls._instance = super(EventPublisher, cls).__new__(cls)
            cls._instance.initialize(host, username, password)
        return cls._instance

    def initialize(self, host, username, password):
        credentials = pika.PlainCredentials(username, password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host, credentials=credentials)
        )
        self.channel = self.connection.channel()

        # Declare an exchange for publishing events
        self.channel.exchange_declare(exchange='events', exchange_type='fanout')

    def publish_event(self, event_message):
        self.channel.basic_publish(
            exchange='events',
            routing_key='',
            body=event_message
        )
        print(f"Published event: {event_message}")

# # Example: Publish an event
# event_publisher = EventPublisher()  # You can provide custom host, username, and password here if needed
# event_publisher.publish_event("Something happened in Microservice 3!")
