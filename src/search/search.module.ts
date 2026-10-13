/*
 * @Date: 2026-09-21 16:34:44
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-21 16:50:21
 */
import { Module } from '@nestjs/common';
import { PipelineModule } from '../pipeline/pipeline.module';
import { SearchController } from './search.controller';

@Module({
  imports: [PipelineModule],
  controllers: [SearchController],
})
export class SearchModule {}
