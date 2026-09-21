/*
 * @Date: 2026-09-17 14:47:37
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-17 14:47:40
 */
import { IsEmail, IsOptional, IsString } from 'class-validator';

/** 当前用户更新资料 */
export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  realName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
