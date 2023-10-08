import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RpcReplierService {
    private readonly rpcQueue = 'rpc_queue';

    constructor() {
        this.connectToRabbitMQ();
    }

    private async connectToRabbitMQ() {
        const host = 'localhost';
        const username = 'admin';
        const password = 'admin-pass';

        const connection = await amqp.connect(`amqp://${username}:${password}@${host}`);
        const channel = await connection.createChannel();
        channel.assertQueue(this.rpcQueue, { durable: false });

        channel.consume(this.rpcQueue, (msg) => {
            const requestData = JSON.parse(msg.content.toString());
            const result = this.processRequest(requestData);

            channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify(result)),
                { correlationId: msg.properties.correlationId }
            );
        }, { noAck: true });
    }

    private processRequest(requestData: any): any {
        // Implement your request processing logic here
        // This is where you handle the request and generate a response
        const { num1, num2 } = requestData
        const result = num1 + num2 + 100
        return { result: result };
    }
}
