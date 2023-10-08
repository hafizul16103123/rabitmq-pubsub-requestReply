import { Module } from '@nestjs/common';
import { RpcReplierService } from './rpc-replier.service';
// import { RpcController } from './rpc.controller';

@Module({
    imports: [],
    providers: [RpcReplierService],
    controllers: [],
    // exports: [RpcReplierService,RabbitmqConnectionService],
})
export class RpcModule { }