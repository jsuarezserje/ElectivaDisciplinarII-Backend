import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './producto.entitie';
import { Repository } from 'typeorm';
import { CreateNewProjectDto } from './dto/create-product.dto';
import { UpdateProjectDto } from './dto/update-product.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private ProductosRepository: Repository<Productos>,
  ) {}

  crearProducto(product: CreateNewProjectDto) {
    const chet = this.ProductosRepository.findOne({
      where: { code: product.code },
    });

    if (chet) return 'este producto ya existe';
    this.ProductosRepository.create(product);
    return new HttpException(
      'Se ha registrado un producto nuevo satisfactoriamente',
      HttpStatus.CONFLICT,
    );
  }
  verTodoProsuctos() {
    return this.ProductosRepository.find();
  }
  async verProducto(id: number) {
    const productFound = await this.ProductosRepository.findOne({
      where: { id },
    });

    if (!productFound) {
      return new HttpException('el producto no existe', HttpStatus.NOT_FOUND);
    }

    return productFound;
  }

  async eliminarPorducto(id: number) {
    const productFound = await this.ProductosRepository.findOne({
      where: { id },
    });

    if (!productFound) {
      return new HttpException('el producto no existe', HttpStatus.NOT_FOUND);
    }
    await this.ProductosRepository.delete({ id });
    return 'Se ha eliminado correctamente.';
  }
  async actualizarPorducto(id: number, product: UpdateProjectDto) {
    const productFound = await this.ProductosRepository.findOne({
      where: { id },
    });

    if (!productFound) {
      return new HttpException('el producto no existe', HttpStatus.NOT_FOUND);
    }

    const updateProducto =Object.assign(productFound, product)
    this.ProductosRepository.save(updateProducto);
    return 'Se ha actualizado correctamente.';
  }
}
