/*
 * @Date: 2026-09-17 15:34:32
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-17 15:34:33
 */
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

/** 全量替换用户角色 */
export class AssignRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roleCodes: string[];
}
