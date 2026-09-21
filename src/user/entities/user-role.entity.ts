/*
 * @Date: 2026-09-15 11:16:05
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-15 11:16:07
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

/** 用户-角色关联（PostgreSQL kh_user_role） */
@Entity('kh_user_role')
export class UserRoleEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string;

  @Column({ name: 'user_id', type: 'bigint', transformer: bigintTransformer })
  userId: string;

  @Column({ name: 'role_id', type: 'bigint', transformer: bigintTransformer })
  roleId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
