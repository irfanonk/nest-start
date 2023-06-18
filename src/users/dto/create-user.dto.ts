import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsAlphanumeric, IsEmail, IsNumber, MaxLength } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(15)
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Validate(Unique)
  email: string;

  @ApiProperty({ required: false })
  @IsNumber()
  age: number;
}
