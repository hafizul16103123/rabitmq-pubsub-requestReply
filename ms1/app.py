# from event_publisher import EventPublisher
from flask import Flask, request
from event_publisher import EventPublisher
from producer import RPCClient
import json
app = Flask(__name__)

# Define a route for handling GET requests
@app.route('/message-pattern', methods=['POST'])
def get_route():
    data = request.get_json()
    jsonStringData=json.dumps(data)
    rpc_client = RPCClient()
    response = rpc_client.call(jsonStringData)
    return response

# Define a route for handling POST requests
@app.route('/event-pattern', methods=['POST'])
def post_route():
    data = request.get_json()
    jsonStringData=json.dumps(data)
    event_publisher = EventPublisher()
    event_publisher.publish_event(jsonStringData)
    return "Event send successfully"

if __name__ == '__main__':
    app.run(debug=True)
