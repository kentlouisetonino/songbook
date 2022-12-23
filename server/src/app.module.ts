import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { config } from './config'
import { DatabaseConfig } from './database.config'
import { HealthCheckModule } from './health-check/health-check.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { SongModule } from './song/song.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    HealthCheckModule,
    UserModule,
    AuthModule,
    SongModule,
  ],
})
export class AppModule {}
