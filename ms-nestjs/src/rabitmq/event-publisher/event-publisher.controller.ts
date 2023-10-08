// src/event-publisher/event-publisher.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { EventPublisherService } from './event-publisher.service';

@Controller('event-publisher')
export class EventPublisherController {
    constructor(private readonly eventPublisherService: EventPublisherService) { }

    @Post('publish')
    async publishEvent(@Body() body: { eventMessage: string, routingKey: string }) {
        const { eventMessage, routingKey } = body;
        await this.eventPublisherService.publishEvent(eventMessage, routingKey);
    }
}
