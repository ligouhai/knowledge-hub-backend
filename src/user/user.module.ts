/*
 * @Date: 2026-09-17 16:02:42
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 16:03:45
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '../document/entities/document.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RoleEntity } from './entities/role.entity';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserEntity } from './entities/user.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      PermissionEntity,
      RolePermissionEntity,
      UserPermissionEntity,
      DocumentEntity,
    ]),
  ],
  controllers: [UserController, RoleController, PermissionController],
  providers: [UserService, RoleService, PermissionService],
  exports: [UserService, RoleService, PermissionService],
})
export class UserModule {}
