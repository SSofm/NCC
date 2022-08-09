import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: 'src/common/envs/development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        return {
          type: 'mongodb',
          host,
          port,
          database,
          authSource: 'admin',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
