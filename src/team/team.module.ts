/*
 * @Date: 2026-09-18 16:42:51
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 16:43:07
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TeamMemberEntity } from './entities/team-member.entity';
import { TeamEntity } from './entities/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, TeamMemberEntity, UserEntity]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
