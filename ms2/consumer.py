import pika
import json


class RPCConsumer:
    _instance = None  # Class-level variable to store the singleton instance

    def __new__(cls, host='localhost', username='admin', password='admin-pass', queue_name='rpc_queue'):
        if cls._instance is None:
            cls._instance = super(RPCConsumer, cls).__new__(cls)
            cls._instance.initialize(host, username, password, queue_name)
        return cls._instance

    def initialize(self, host, username, password, queue_name):
        self.credentials = pika.PlainCredentials(username, password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host, credentials=self.credentials))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)
        self.channel.basic_consume(
            queue=queue_name, on_message_callback=self.on_request)
        print("Microservice is waiting for requests...")

    def on_request(self, ch, method, properties, body):

        body_str = body.decode('utf-8')  # Decode the bytes to a string
        # Parse the JSON string into a dictionary
        python_dict = json.loads(body_str)
        result = python_dict['num1'] + python_dict['num2']
        response = f"Response From MS-2: {result}"
        ch.basic_publish(
            exchange='',
            routing_key=properties.reply_to,
            properties=pika.BasicProperties(
                correlation_id=properties.correlation_id
            ),
            body=str(response)
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def start_consuming(self):
        try:
            self.channel.start_consuming()
        except KeyboardInterrupt:
            self.connection.close()


# Usage:
rpc_consumer = RPCConsumer()  # Use default values
rpc_consumer.start_consuming()
