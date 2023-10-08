// microservice.controller.ts
import { Controller } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class MicroserviceController {
    constructor(private readonly client: ClientProxy) { }

    @MessagePattern('nest_rpc_queue')
    async yourHandler(@Payload() data: any): Promise<any> {
        const response = await this.client.send<any>('nest_rpc_queue', data).toPromise();
        return response;
    }
}
