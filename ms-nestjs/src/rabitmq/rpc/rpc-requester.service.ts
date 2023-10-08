// import { Injectable } from '@nestjs/common';
// import * as amqp from 'amqplib';

// @Injectable()
// export class RpcRequesterService {
//     private readonly rpcQueue = 'rpc_queue';
//     private connection: amqp.Connection;
//     private channel: amqp.Channel;
//     private readonly replyQueue = 'amq.rabbitmq.reply-to';

//     constructor() {
//         this.connectToRabbitMQ();
//     }

//     private async connectToRabbitMQ() {
//         const host = 'localhost';
//         const username = 'admin';
//         const password = 'admin-pass';

//         this.connection = await amqp.connect(`amqp://${username}:${password}@${host}`);
//         this.channel = await this.connection.createChannel();
//         this.channel.assertQueue(this.rpcQueue, { durable: false });
//     }

//     async sendRequest(requestData: any): Promise<any> {
//         const correlationId = Math.random().toString(); // Generate a unique correlation ID

//         this.channel.sendToQueue(
//             this.rpcQueue,
//             Buffer.from(JSON.stringify(requestData)),
//             { correlationId, replyTo: this.replyQueue }
//         );

//         return new Promise<any>((resolve) => {
//             this.channel.consume(this.replyQueue, (msg) => {
//                 if (msg.properties.correlationId === correlationId) {
//                     resolve(JSON.parse(msg.content.toString()));
//                 }
//             }, { noAck: true });
//         });
//     }
// }
