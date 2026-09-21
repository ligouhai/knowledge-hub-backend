/*
 * @Date: 2026-09-18 15:28:24
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 15:44:14
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleCode } from '../common/constants/roles';
import {
  CreatePermissionDto,
  QueryPermissionDto,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permissions')
@Roles(RoleCode.ADMIN)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('list')
  @RequirePermission('system:permission')
  async list() {
    return this.permissionService.listAll();
  }

  @Get('tree')
  @RequirePermission('system:permission')
  async tree() {
    return this.permissionService.getTree();
  }

  @Get('page')
  @RequirePermission('system:permission')
  async page(@Query() query: QueryPermissionDto) {
    return this.permissionService.page(query);
  }

  @Get(':id/children')
  @RequirePermission('system:permission')
  async children(@Param('id') id: string) {
    return this.permissionService.getChildren(id);
  }

  @Get(':id')
  @RequirePermission('system:permission')
  async getById(@Param('id') id: string) {
    return this.permissionService.getById(id);
  }

  @Post()
  @RequirePermission('system:permission:create')
  async create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Put(':id')
  @RequirePermission('system:permission:edit')
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('system:permission:delete')
  async delete(@Param('id') id: string) {
    await this.permissionService.delete(id);
    return { message: '删除成功' };
  }
}
