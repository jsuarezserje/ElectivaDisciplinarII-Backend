import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos/producto.entitie';
import { ProductosModule } from './productos/productos.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAMEDB,
      entities: [Productos, User],
      synchronize: true,
    }),
    ProductosModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
