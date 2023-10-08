import pika
import json


class EventSubscriberDirectExchange:
    _instance = None  # Class-level variable to store the singleton instance

    def __new__(cls, host='localhost', username='admin', password='admin-pass'):
        if cls._instance is None:
            cls._instance = super(
                EventSubscriberDirectExchange, cls).__new__(cls)
            cls._instance.initialize(host, username, password)
        return cls._instance

    def initialize(self, host, username, password):
        credentials = pika.PlainCredentials(username, password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host, credentials=credentials)
        )
        self.channel = self.connection.channel()

        # Declare a direct exchange for subscribing to events
        self.channel.exchange_declare(
            exchange='events_direct', exchange_type='direct')

        # Create a temporary queue with a random name
        result = self.channel.queue_declare(queue='', exclusive=True)
        self.queue_name = result.method.queue

        # Bind the queue to the events exchange with a specific routing key
        routing_key = 'routing_key_01'  # Replace with the desired routing key
        self.channel.queue_bind(
            exchange='events_direct', queue=self.queue_name, routing_key=routing_key)

        # Set up a callback function to process events
        self.channel.basic_consume(
            queue=self.queue_name, on_message_callback=self.process_event, auto_ack=True)

    def process_event(self, ch, method, properties, body):
        data = json.loads(body)
        # Extract the routing key from the message properties
        routing_key = method.routing_key
        print(f"Received event with routing key '{routing_key}': {data}")


# Example: Start listening for events
# You can provide custom host, username, and password here if needed
event_subscriber = EventSubscriberDirectExchange()
print("Microservice 4 is waiting for events...")
event_subscriber.channel.start_consuming()
