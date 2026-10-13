/*
 * @Date: 2026-09-21 16:39:19
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-21 16:50:29
 */
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

/** 全文搜索请求 */
export class SearchDocumentsDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  authorId?: string;
}
