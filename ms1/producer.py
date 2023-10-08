import pika
import uuid

class RPCClient:
    _instance = None  # Class-level variable to store the singleton instance

    def __new__(cls, host=None, username=None, password=None):
        if cls._instance is None:
            cls._instance = super(RPCClient, cls).__new__(cls)
            cls._instance.initialize(host, username, password)
        return cls._instance

    def initialize(self, host=None, username=None, password=None):
        # Use default values if the arguments are not provided
        self.host = host if host is not None else 'localhost'
        self.username = username if username is not None else 'admin'
        self.password = password if password is not None else 'admin-pass'

        self.credentials = pika.PlainCredentials(self.username, self.password)
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(self.host, credentials=self.credentials))

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue='', exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True
        )

    def on_response(self, ch, method, properties, body):
        if self.corr_id == properties.correlation_id:
            self.response = body

    def call(self, message):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange='',
            routing_key='rpc_queue',
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id
            ),
            body=message
        )
        while self.response is None:
            self.connection.process_data_events()
        return self.response

# # Usage:
# rpc_client = RPCClient()  # Creating an instance directly
# response = rpc_client.call("Hello, Microservice 2!")
# print(f"Received response: {response}")
