import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, CreateProductPriceDto, CreateProductVariantDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryIds, collectionIds, prices, variants, ...productData } = createProductDto;

    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Create the product
        let product;
        try {
          product = await prisma.product.create({
            data: {
              ...productData,
              categories: {
                connect: categoryIds.map(id => ({ id })),
              },
              ...(collectionIds && collectionIds.length > 0 && {
                collections: {
                  connect: collectionIds.map(id => ({ id })),
                },
              }),
            },
            include: {
              categories: true,
              collections: true,
            },
          });
        } catch (error) {
          this.logger.error(`Error creating product: ${error.message}`, error.stack);
          this.handlePrismaError(error, 'Error creating product');
        }

        // Create product prices
        try {
          await this.createProductPrices(prisma, product.id, prices);
        } catch (error) {
          this.logger.error(`Error creating product prices: ${error.message}`, error.stack);
          throw new InternalServerErrorException('Error creating product prices');
        }

        // Create product variants
        try {
          await this.createProductVariants(prisma, product.id, variants);
        } catch (error) {
          this.logger.error(`Error creating product variants: ${error.message}`, error.stack);
          throw new InternalServerErrorException('Error creating product variants');
        }

        // Fetch the complete product with all related data
        const createdProduct = await prisma.product.findUnique({
          where: { id: product.id },
          include: {
            categories: true,
            collections: true,
            prices: { include: { currency: true } },
            variants: {
              include: {
                prices: { include: { currency: true } },
              },
            },
          },
        });

        if (!createdProduct) {
          throw new InternalServerErrorException(`Product was created but could not be retrieved`);
        }

        return createdProduct;
      });
    } catch (error) {
      this.logger.error(`Error in create product transaction: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating product');
    }
  }

  private async createProductPrices(prisma: any, productId: string, prices: CreateProductPriceDto[]) {
    try {
      await Promise.all(
        prices.map(price =>
          prisma.productPrice.create({
            data: {
              product: { connect: { id: productId } },
              currency: { connect: { id: price.currencyId } },
              price: price.price,
            },
          })
        )
      );
    } catch (error) {
      this.logger.error(`Error creating product prices: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error creating product prices');
    }
  }

  private async createProductVariants(prisma: any, productId: string, variants: CreateProductVariantDto[]) {
    try {
      await Promise.all(
        variants.map(async variant => {
          const createdVariant = await prisma.productVariant.create({
            data: {
              product: { connect: { id: productId } },
              title: variant.title,
              sku: variant.sku,
              imageUrl: variant.imageUrl,
              inventoryQuantity: variant.inventoryQuantity,
              weightValue: variant.weightValue,
              weightUnit: variant.weightUnit,
            },
          });

          await this.createVariantPrices(prisma, createdVariant.id, variant.prices);
        })
      );
    } catch (error) {
      this.logger.error(`Error creating product variants: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error creating product variants');
    }
  }

  private async createVariantPrices(prisma: any, variantId: string, prices: CreateProductPriceDto[]) {
    try {
      await Promise.all(
        prices.map(price =>
          prisma.variantPrice.create({
            data: {
              variant: { connect: { id: variantId } },
              currency: { connect: { id: price.currencyId } },
              price: price.price,
            },
          })
        )
      );
    } catch (error) {
      this.logger.error(`Error creating variant prices: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error creating variant prices');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        include: {
          categories: true,
          collections: true,
          prices: { include: { currency: true } },
          variants: {
            include: {
              prices: { include: { currency: true } },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error finding all products: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error retrieving products');
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          categories: true,
          collections: true,
          prices: { include: { currency: true } },
          variants: {
            include: {
              prices: { include: { currency: true } },
            },
          },
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error finding product with id ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Error retrieving product with id ${id}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categoryIds, collectionIds, prices, variants, ...productData } = updateProductDto;

    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Update the product
        let updatedProduct;
        try {
          updatedProduct = await prisma.product.update({
            where: { id },
            data: {
              ...productData,
              ...(categoryIds && {
                categories: {
                  set: categoryIds.map(id => ({ id })),
                },
              }),
              ...(collectionIds && {
                collections: {
                  set: collectionIds.map(id => ({ id })),
                },
              }),
            },
          });
        } catch (error) {
          this.handlePrismaError(error, `Error updating product with id ${id}`);
        }

        // Update product prices
        if (prices) {
          try {
            await prisma.productPrice.deleteMany({ where: { productId: id } });
            await this.createProductPrices(prisma, id, prices);
          } catch (error) {
            this.logger.error(`Error updating product prices: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error updating product prices');
          }
        }

        // Update product variants
        if (variants) {
          try {
            // First, delete all variant prices
            await prisma.variantPrice.deleteMany({
              where: { variant: { productId: id } },
            });

            // Then, delete all variants
            await prisma.productVariant.deleteMany({
              where: { productId: id },
            });

            // Finally, create new variants with their prices
            await this.createProductVariants(prisma, id, variants);
          } catch (error) {
            this.logger.error(`Error updating product variants: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error updating product variants');
          }
        }

        // Fetch the updated product with all related data
        const refreshedProduct = await prisma.product.findUnique({
          where: { id },
          include: {
            categories: true,
            collections: true,
            prices: { include: { currency: true } },
            variants: {
              include: {
                prices: { include: { currency: true } },
              },
            },
          },
        });

        if (!refreshedProduct) {
          throw new NotFoundException(`Product with ID ${id} not found after update`);
        }

        return refreshedProduct;
      });
    } catch (error) {
      this.logger.error(`Error in update product transaction: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error updating product with id ${id}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.productPrice.deleteMany({ where: { productId: id } });
        await prisma.variantPrice.deleteMany({ where: { variant: { productId: id } } });
        await prisma.productVariant.deleteMany({ where: { productId: id } });
        await prisma.product.delete({ where: { id } });
      });
    } catch (error) {
      this.handlePrismaError(error, `Error deleting product with id ${id}`);
    }
  }

  private handlePrismaError(error: any, message: string) {
    this.logger.error(`${message}: ${error.message}`, error.stack);
    if (error.code) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('A product with this slug already exists');
        case 'P2025':
          throw new NotFoundException(`Related entity not found. Please check your input.`);
        case 'P2003':
          throw new BadRequestException('Invalid foreign key constraint. Please check your input.');
        default:
          throw new InternalServerErrorException(message);
      }
    }
    throw new InternalServerErrorException(message);
  }
}

