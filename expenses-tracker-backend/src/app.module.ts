import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared/shared.module';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [SharedModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
