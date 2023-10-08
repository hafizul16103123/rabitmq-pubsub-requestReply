import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://admin:admin-pass@localhost:5672'],
  //     queue: 'rpc_queue',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin-pass@localhost:5672'],
      queue: 'rpc_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log("APP is running")
}
bootstrap();
