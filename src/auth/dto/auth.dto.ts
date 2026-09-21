/*
 * @Date: 2026-09-14 17:13:10
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-16 15:40:53
 */
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

/** 登录 */
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

/** 注册（简化：注册后 status=1，立即可登录） */
export class RegisterDto {
  @IsOptional()
  @IsBoolean()
  requireEmailVerification?: boolean;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  realName?: string;
}

/** 刷新 Token */
export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
