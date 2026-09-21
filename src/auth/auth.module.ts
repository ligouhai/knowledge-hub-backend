/*
 * @Date: 2026-09-15 11:39:01
 * @LastEditors: zhujinyi
 * @LastEditTime: 2026-09-18 15:54:03
 */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailActivationService } from './email-activation.service';
import { EmailService } from './email.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { PasswordResetService } from './password-reset.service';
import { PermissionsGuard } from './permissions.guard';
import { RolesGuard } from './roles.guard';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'dev-secret-change-me'),
      }),
    }),

    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    EmailActivationService,
    PasswordResetService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
