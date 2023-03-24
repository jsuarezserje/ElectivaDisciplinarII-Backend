import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos/producto.entitie';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tienda_online',
      entities: [Productos],
      synchronize: true,
    }),
    ProductosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
