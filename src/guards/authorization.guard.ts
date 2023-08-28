import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from 'src/providers/jwt.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    if (token.startsWith('Bearer ')) {
      token = token.substring('Bearer '.length);
    }
    const payload = this.jwtService.verify(token);

    request.user = payload;

    return true;
  }
}
