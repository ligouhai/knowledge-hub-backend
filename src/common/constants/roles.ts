/*
 * @Date: 2026-09-15 11:09:53
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-15 11:10:05
 */
/** 预置角色编码（与 kh_role.role_code 一致） */
export const RoleCode = {
  ADMIN: 'ROLE_ADMIN',
  REVIEWER: 'ROLE_REVIEWER',
  USER: 'ROLE_USER',
} as const;

export type RoleCodeValue = (typeof RoleCode)[keyof typeof RoleCode];
