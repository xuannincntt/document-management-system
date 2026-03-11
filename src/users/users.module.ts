import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AccountPermissionsModule } from '../account-permissions/account-permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AccountPermissionsModule
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController]
})
export class UsersModule { }
