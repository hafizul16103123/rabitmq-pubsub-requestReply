// src/event-subscriber/event-subscriber.service.ts

import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventSubscriberService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(private readonly eventEmitter: EventEmitter2) {
        this.initialize();
    }

    async initialize() {
        const host = 'localhost';
        const username = 'admin';
        const password = 'admin-pass';

        const connection = await amqp.connect(`amqp://${username}:${password}@${host}`);
        this.connection = connection;
        this.channel = await connection.createChannel();

        const exchangeName = 'events_direct';
        const routingKey = 'routing_key_01';

        await this.channel.assertExchange(exchangeName, 'direct', { durable: false });

        const assertQueue = await this.channel.assertQueue('', { exclusive: true });
        await this.channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

        this.consumeMessages(assertQueue.queue);
    }

    async consumeMessages(queueName: string) {
        this.channel.consume(queueName, (message) => {
            if (message) {
                const eventMessage = message.content.toString();
                const routingKey = message.fields.routingKey;

                // Emit the received event using NestJS event emitter
                this.eventEmitter.emit('receivedEvent', { routingKey, eventMessage });

                // Acknowledge the message to remove it from the queue
                this.channel.ack(message);
            }
        });
    }

    async closeConnection() {
        await this.channel.close();
        await this.connection.close();
    }
}
