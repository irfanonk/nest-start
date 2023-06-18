import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getAllUsers(@Query('name') name?: string): Promise<User[]> {
    return await this.usersService.getAllUsers(name);
  }
  @ApiOkResponse({ type: User, description: 'returns single user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }
  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createUser(body);
  }
}
