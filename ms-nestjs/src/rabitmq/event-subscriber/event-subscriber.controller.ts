// src/event-subscriber/event-subscriber.controller.ts

import { Controller, Get } from '@nestjs/common';
import { EventSubscriberService } from './event-subscriber.service';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('events')
export class EventSubscriberController {
    constructor(private readonly eventSubscriberService: EventSubscriberService) { }

    @Get()
    subscribeToEvents() {
        return 'Subscribed to events.';
    }

    @OnEvent('receivedEvent')
    handleReceivedEvent(payload: { routingKey: string; eventMessage: string }) {
        const { routingKey, eventMessage } = payload;
        console.log(`Received event with routing key '${routingKey}': ${eventMessage}`);
        // Handle the received event as needed
    }
}
