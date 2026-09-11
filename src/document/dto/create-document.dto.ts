/*
 * @Date: 2026-09-01 15:29:58
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-02 09:59:13
 */
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { DocumentStatus } from '../document-status';
export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  /** 封面图 URL */
  @IsOptional()
  @IsString()
  coverImage?: string;

  /** 标签（逗号分隔） */
  @IsOptional()
  @IsString()
  tags?: string;

  /** 状态 */
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  /** 备注 */
  @IsOptional()
  @IsString()
  remark?: string;

  /** 是否公开 */
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  /** 创建人 ID */
  @IsOptional()
  @IsString()
  createBy?: string;
}
