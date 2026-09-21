/*
 * @Date: 2026-09-17 14:52:09
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-17 14:52:11
 */
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string;
}
