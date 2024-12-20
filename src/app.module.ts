import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlumnosModule } from './alumnos/alumnos.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as winston from 'winston';
import * as path from 'path';

@Module({
  imports: [
    /*WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json({
            maximumDepth: 50
          }),
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike(configService.get('APP_NAME'), {
                colors: true,
                prettyPrint: true,
                processId: true
              }),
            ),
          }),
          new winston.transports.File({
            dirname: (configService.get('LOGFILE_RELATIVE') == 1)?
                path.join(__dirname,configService.get('LOGFILE_LOG_DIR'))
              :
                configService.get('LOGFILE_LOG_DIR'), //path to where save loggin result 
            filename: configService.get('LOGFILE_LOG_NAME'), //name of file where will be saved logging result
            level: 'log',
          }),
          new winston.transports.File({
            dirname: (configService.get('LOGFILE_RELATIVE') == 1)?
                path.join(__dirname,configService.get('LOGFILE_DEBUG_DIR'))
              :
                configService.get('LOGFILE_DEBUG_DIR'), //path to where save loggin result 
            filename: configService.get('LOGFILE_DEBUG_NAME'), //name of file where will be saved logging result
            level: 'debug',
          }),
          new winston.transports.File({
            dirname: (configService.get('LOGFILE_RELATIVE') == 1)?
                path.join(__dirname,configService.get('LOGFILE_INFO_DIR'))
              :
                configService.get('LOGFILE_INFO_DIR'), //path to where save loggin result 
            filename: configService.get('LOGFILE_INFO_NAME'), //name of file where will be saved logging result
            level: 'info',
          }),
          new winston.transports.File({
            dirname: (configService.get('LOGFILE_RELATIVE') == 1)?
                path.join(__dirname,configService.get('LOGFILE_ERROR_DIR'))
              :
                configService.get('LOGFILE_ERROR_DIR'), //path to where save loggin result 
            filename: configService.get('LOGFILE_ERROR_NAME'), //name of file where will be saved logging result
            level: 'error',
          }),
        ],
      })
    }),*/
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'test-paycash.cekuahwifdlp.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'dbadmin',
      password: '6Nwzayr0rmVj8YcQQ7Z7',
      database: 'examenRB',
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true          
      },
      timezone: "America/Guayaquil"
    }),
    AlumnosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
