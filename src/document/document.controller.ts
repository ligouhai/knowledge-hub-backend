/*
 * @Date: 2026-09-01 11:39:20
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-07 14:20:33
 */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { QueryDocumentDto } from './dto/query-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UploadParseDto } from './dto/upload-parse.dto';
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // 创建文档
  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentService.create(dto);
  }

  // 查询文档列表
  @Get()
  findAll(@Query() query: QueryDocumentDto) {
    return this.documentService.findAll(query);
  }

  /** 直接发布文档（无审核；发布后 MQ 异步触发 RAG / KG / ES） */
  @Put(':id/publish')
  publish(@Param('id') id: string) {
    return this.documentService.publish(id);
  }

  // 查询文档详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  // 更新文档
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentService.update(id, dto);
  }
  // 软删除文档
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }

  @Post('upload/parse')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 50,
      },
    }),
  )
  uploadAndParse(
    @UploadedFile() file: Express.Multer.File,
    @Body() meta: UploadParseDto,
  ) {
    if (!file) {
      throw new BadRequestException('请上传文件（form-data 字段名：file）');
    }
    return this.documentService.uploadAndCreateDocument(file, meta);
  }
}
