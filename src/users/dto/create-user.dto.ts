import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNumber, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(15)
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsNumber()
  age: number;
}
