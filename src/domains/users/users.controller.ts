import { Body, Controller } from '@nestjs/common';
import { SignUpDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  signUp(@Body() params: SignUpDto) {
    return 
  }
}
