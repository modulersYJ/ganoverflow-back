import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   // host: '118.67.134.211',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'modulers',
    //   password: 'inssafood',
    //   database: 'ganoverflow',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
