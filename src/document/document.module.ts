/*
 * @Date: 2026-09-01 11:39:20
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-11 14:25:43
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { DocumentReviewService } from './document-review.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentReviewEntity } from './entities/document-review.entity';
import { DocumentEntity } from './entities/document.entity';
import { FileParserService } from './parser/file-parser.service';
import {
  DocumentContent,
  DocumentContentSchema,
} from './schemas/document-content.schema';

/**
 * 文档模块
 * - DocumentService：文档 CRUD + 状态流转（草稿 / 发布 / 归档 / 待审核）
 * - FileParserService：上传文件解析为 Markdown
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity, DocumentReviewEntity]),
    MongooseModule.forFeature([
      { name: DocumentContent.name, schema: DocumentContentSchema },
    ]),
    StorageModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentReviewService, FileParserService],
  exports: [DocumentService, DocumentReviewService, FileParserService],
})
export class DocumentModule {}
