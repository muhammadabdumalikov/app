import { Injectable } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(data) {
    return sign(data, '4324');
  }

  verify(token) {
    return verify(token, '4324');
  }
}