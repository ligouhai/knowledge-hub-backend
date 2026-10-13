/*
 * @Date: 2026-09-21 16:34:36
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-21 19:01:04
 */
import { Body, Controller, Post } from '@nestjs/common';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { PermissionCode } from '../common/constants/permissions';
import { SearchIndexService } from '../pipeline/search-index.service';
import { SearchDocumentsDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchIndex: SearchIndexService) {}

  /** 关键词检索已发布文档（ES kh_document） */
  @Post()
  @RequirePermission(PermissionCode.search)
  search(@Body() dto: SearchDocumentsDto) {
    return this.searchIndex.searchDocuments({
      keyword: dto.keyword,
      page: dto.page,
      pageSize: dto.pageSize,
      categoryId: dto.categoryId,
      authorId: dto.authorId,
    });
  }
}
