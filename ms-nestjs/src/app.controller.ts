import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @RabbitRPC({
    exchange: '',
    routingKey: 'rpc-queue',
    queue: 'rpc-queue',
  })
  public async rpcHandler(msg: {}) {
    console.log("Nestjs is consuming and return")
    console.log({ msg })
    return {
      response: 42,
    };
  }
}
