// src/event-publisher/event-publisher.module.ts

import { Module } from '@nestjs/common';
import { EventPublisherController } from './event-publisher.controller';
import { EventPublisherService } from './event-publisher.service';

@Module({
    controllers: [EventPublisherController],
    providers: [EventPublisherService],
})
export class EventPublisherModule { }
