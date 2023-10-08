// src/event-subscriber/event-subscriber.module.ts

import { Module } from '@nestjs/common';
import { EventSubscriberService } from './event-subscriber.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [EventEmitterModule.forRoot()],
    providers: [EventSubscriberService],
    exports: [EventSubscriberService],
})
export class EventSubscriberModule { }
