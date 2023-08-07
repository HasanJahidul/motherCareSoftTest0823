import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(
    @Query('skip',ParseIntPipe) skip?: number,
    @Query('take',ParseIntPipe) take?: number,
  ){
    return this.userService.findAll(skip,take);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get(':column/:value')
  async findByColumn(
    @Param('column') column: string,
    @Param('value') value: string,
  ): Promise<User[]> {
    return this.userService.findByColumn(column, value);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUploadUsers(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User[]> {
    console.log('controller');
    return this.userService.bulkUploadUsers(file);
  }
}
