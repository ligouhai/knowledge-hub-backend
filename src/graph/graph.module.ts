/*
 * @Date: 2026-09-21 16:54:12
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-21 16:59:19
 */
import { Module } from '@nestjs/common';
import { PipelineModule } from '../pipeline/pipeline.module';
import { GraphController } from './graph.controller';

@Module({
  imports: [PipelineModule],
  controllers: [GraphController],
})
export class GraphModule {}
