import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  second_name: string;
}
