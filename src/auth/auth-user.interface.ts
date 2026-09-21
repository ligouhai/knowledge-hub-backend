/*
 * @Date: 2026-09-15 11:08:54
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 16:01:54
 */
/** JWT 校验后注入到 Controller 的当前用户 */
export interface AuthUser {
  userId: string;
  username: string;
  realName?: string | null;
  email?: string | null;
  avatar?: string | null;
  roles: string[];
  permissions?: string[];
}
