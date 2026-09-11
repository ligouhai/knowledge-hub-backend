/*
 * @Date: 2026-09-03 14:11:21
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-03 14:11:27
 */
import { Global, Module } from '@nestjs/common';
import { RustfsService } from './rustfs.service';

@Global()
@Module({
  providers: [RustfsService],
  exports: [RustfsService],
})
export class StorageModule {}
