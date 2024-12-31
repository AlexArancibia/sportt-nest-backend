import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async create(createShopDto: CreateShopDto) {
    const { defaultCurrencyId, ...shopData } = createShopDto;

    return this.prisma.shopSettings.create({
      data: {
        ...shopData,
        defaultCurrency: {
          connect: { id: defaultCurrencyId }
        },
        acceptedCurrencies: {
          connect: { id: defaultCurrencyId }
        }
      },
      include: {
        defaultCurrency: true,
        acceptedCurrencies: true,
      },
    });
  }

  async findAll() {
    return this.prisma.shopSettings.findMany({
      include: {
        defaultCurrency: true,
        acceptedCurrencies: true,
      },
    });
  }

  async findOne(id: string) {
    const shop = await this.prisma.shopSettings.findUnique({
      where: { id },
      include: {
        defaultCurrency: true,
        acceptedCurrencies: true,
      },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    return shop;
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    const { defaultCurrencyId, ...shopData } = updateShopDto;

    try {
      if (defaultCurrencyId) {
        // Primero, obtenemos la tienda actual
        const currentShop = await this.prisma.shopSettings.findUnique({
          where: { id },
          include: { acceptedCurrencies: true }
        });

        // Verificamos si la nueva moneda predeterminada ya está en las monedas aceptadas
        const isNewCurrencyAccepted = currentShop.acceptedCurrencies.some(
          currency => currency.id === defaultCurrencyId
        );

        // Si no está en las monedas aceptadas, la añadimos
        if (!isNewCurrencyAccepted) {
          return this.prisma.shopSettings.update({
            where: { id },
            data: {
              ...shopData,
              defaultCurrency: { connect: { id: defaultCurrencyId } },
              acceptedCurrencies: { 
                connect: { id: defaultCurrencyId }
              }
            },
            include: {
              defaultCurrency: true,
              acceptedCurrencies: true,
            },
          });
        }
      }

      // Si no se cambia la moneda predeterminada o ya está aceptada, actualizamos normalmente
      return this.prisma.shopSettings.update({
        where: { id },
        data: {
          ...shopData,
          ...(defaultCurrencyId && {
            defaultCurrency: { connect: { id: defaultCurrencyId } }
          }),
        },
        include: {
          defaultCurrency: true,
          acceptedCurrencies: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.shopSettings.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
  }

  async addAcceptedCurrency(shopId: string, currencyId: string) {
    try {
      return await this.prisma.shopSettings.update({
        where: { id: shopId },
        data: {
          acceptedCurrencies: {
            connect: { id: currencyId },
          },
        },
        include: {
          acceptedCurrencies: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Shop or Currency not found`);
    }
  }

  async removeAcceptedCurrency(shopId: string, currencyId: string) {
    try {
      const shop = await this.prisma.shopSettings.findUnique({
        where: { id: shopId },
        include: { defaultCurrency: true }
      });

      if (shop.defaultCurrency.id === currencyId) {
        throw new Error("Cannot remove the default currency from accepted currencies");
      }

      return await this.prisma.shopSettings.update({
        where: { id: shopId },
        data: {
          acceptedCurrencies: {
            disconnect: { id: currencyId },
          },
        },
        include: {
          acceptedCurrencies: true,
        },
      });
    } catch (error) {
      if (error.message === "Cannot remove the default currency from accepted currencies") {
        throw new BadRequestException(error.message);
      }
      throw new NotFoundException(`Shop or Currency not found`);
    }
  }
}

