// // rabbitmq-connection.service.ts
// import { Injectable } from '@nestjs/common';
// import * as amqp from 'amqplib';

// @Injectable()
// export class RabbitmqConnectionService {
//     private static instance: RabbitmqConnectionService;
//     private connection: amqp.Connection;

//     private constructor() { }

//     static getInstance(): RabbitmqConnectionService {
//         if (!this.instance) {
//             this.instance = new RabbitmqConnectionService();
//         }
//         return this.instance;
//     }

//     async connect(): Promise<amqp.Connection> {
//         if (!this.connection || !this.connection.isConnected()) {
//             const host = 'localhost';
//             const username = 'admin';
//             const password = 'admin-pass';

//             this.connection = await amqp.connect(`amqp://${username}:${password}@${host}`);
//         }
//         return this.connection;
//     }
// }
