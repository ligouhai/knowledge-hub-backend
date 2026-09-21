/*
 * @Date: 2026-09-16 15:44:31
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-16 15:44:37
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
