/*
 * @Date: 2026-09-18 15:27:38
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 15:33:11
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

@Entity('kh_role_permission')
export class RolePermissionEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string;

  @Column({ name: 'role_id', type: 'bigint', transformer: bigintTransformer })
  roleId: string;

  @Column({
    name: 'permission_id',
    type: 'bigint',
    transformer: bigintTransformer,
  })
  permissionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
