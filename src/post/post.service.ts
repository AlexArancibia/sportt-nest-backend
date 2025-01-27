import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostStatus, PostType } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { postCategoryIds, tagIds, ...postData } = createPostDto

    return this.prisma.post.create({
      data: {
        ...postData,
        postCategories: {
          connect: postCategoryIds?.map((id) => ({ id })) || [],
        },
        tags: {
          connect: tagIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        author: true,
        postCategories: true,
        tags: true,
      },
    })
  }

  async findAll(params: { status?: PostStatus; type?: PostType; authorId?: string }) {
    const { status, type, authorId } = params
    return this.prisma.post.findMany({
      where: {
        status: status,
        type: type,
        authorId: authorId,
      },
      include: {
        author: true,
        postCategories: true,
        tags: true,
      },
    })
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        postCategories: true,
        tags: true,
      },
    })

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }

    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { postCategoryIds, tagIds, ...postData } = updatePostDto

    try {
      return await this.prisma.post.update({
        where: { id },
        data: {
          ...postData,
          postCategories: {
            set: postCategoryIds?.map((id) => ({ id })) || [],
          },
          tags: {
            set: tagIds?.map((id) => ({ id })) || [],
          },
        },
        include: {
          author: true,
          postCategories: true,
          tags: true,
        },
      })
    } catch (error) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.post.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
  }
}

