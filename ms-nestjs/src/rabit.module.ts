// import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// import { Module } from '@nestjs/common';
// import { MessagingController } from './messaging/messaging.controller';
// import { MessagingService } from './messaging/messaging.service';

// @Module({
//     imports: [
//         RabbitMQModule.forRoot(RabbitMQModule, {
//             exchanges: [
//                 {
//                     name: 'exchange1',
//                     type: 'topic',
//                 },
//             ],
//             uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
//             channels: {
//                 'channel-1': {
//                     prefetchCount: 15,
//                     default: true,
//                 },
//                 'channel-2': {
//                     prefetchCount: 2,
//                 },
//             },
//         }),
//         RabbitExampleModule,
//     ],
//     providers: [MessagingService],
//     controllers: [MessagingController],
// })
// export class RabbitExampleModule { }