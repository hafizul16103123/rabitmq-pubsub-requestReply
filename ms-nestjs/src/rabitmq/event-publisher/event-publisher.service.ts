// src/event-publisher/event-publisher.service.ts

import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class EventPublisherService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor() {
        this.initialize();
    }

    async initialize() {
        const host = 'localhost';
        const username = 'admin';
        const password = 'admin-pass';

        const connection = await amqp.connect(`amqp://${username}:${password}@${host}`);
        this.connection = connection;
        this.channel = await connection.createChannel();
    }

    async publishEvent(eventMessage: string, routingKey: string) {
        const exchangeName = 'events_direct';

        await this.channel.assertExchange(exchangeName, 'direct', { durable: false });
        await this.channel.publish(exchangeName, routingKey, Buffer.from(eventMessage));
        console.log(`Published event: ${eventMessage} with routing key: ${routingKey}`);
    }

    async closeConnection() {
        await this.channel.close();
        await this.connection.close();
    }
}
