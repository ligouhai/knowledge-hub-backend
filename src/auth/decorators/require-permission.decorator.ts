/*
 * @Date: 2026-09-18 15:43:56
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 15:43:57
 */
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/** 要求用户拥有指定权限码之一（需配合 PermissionsGuard；ROLE_ADMIN 自动放行） */
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
