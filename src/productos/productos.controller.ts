import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateNewProjectDto } from './dto/create-product.dto';
import { UpdateProjectDto } from './dto/update-product.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  
  @Post()
  crearProducto(@Body() newProducto: CreateNewProjectDto) {
    return this.productosService.crearProducto(newProducto)
  }

  @Get()
  verTodoProsuctos() {
    return this.productosService.verTodoProsuctos();
  }

  @Get(':id')
  verProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.verProducto(id);
  }

  @Delete(':id')
  eliminarPorducto(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.eliminarPorducto(id);
  }

  @Patch(':id')
  actualizarPorducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProjectDto,
  ) {
    return this.productosService.actualizarPorducto(id, updateProduct);
  }

}
