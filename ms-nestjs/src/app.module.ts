import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviceModule } from './microservice/microservice.module';
import { EventPublisherModule } from './rabitmq/event-publisher/event-publisher.module';
import { EventSubscriberModule } from './rabitmq/event-subscriber/event-subscriber.module';
import { RpcModule } from './rabitmq/rpc/rpc.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'HELLO_SERVICE', transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://admin:admin-passlocalhost:5672'],
    //       queue: 'rpc_queue',
    //       queueOptions: {
    //         durable: false
    //       },
    //     },
    //   },
    // ]),
    EventPublisherModule, EventSubscriberModule, RpcModule, MicroserviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
