/*
 * @Date: 2026-09-18 15:27:56
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 15:33:40
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

@Entity('kh_user_permission')
export class UserPermissionEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string;

  @Column({ name: 'user_id', type: 'bigint', transformer: bigintTransformer })
  userId: string;

  @Column({
    name: 'permission_id',
    type: 'bigint',
    transformer: bigintTransformer,
  })
  permissionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
