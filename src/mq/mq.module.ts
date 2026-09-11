/*
 * @Date: 2026-09-07 11:44:36
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-07 11:45:04
 */
import { Global, Module } from '@nestjs/common';
import { PipelineModule } from '../pipeline/pipeline.module';
import { DocumentPipelineConsumer } from './document-pipeline.consumer';
import { DocumentPipelinePublisher } from './document-pipeline.publisher';
import { RabbitMqService } from './rabbitmq.service';

@Global()
@Module({
  imports: [PipelineModule],
  providers: [
    RabbitMqService,
    DocumentPipelinePublisher,
    DocumentPipelineConsumer,
  ],
  exports: [RabbitMqService, DocumentPipelinePublisher],
})
export class MqModule {}
