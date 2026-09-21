/*
 * @Date: 2026-09-15 11:29:29
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-15 11:29:30
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** 标记接口无需 JWT（login / register / refresh 等） */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
