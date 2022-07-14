import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    console.log('super', context)
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err
    } else if (!user) {
      if (info == 'TokenExpiredError: jwt expired') {
        throw new UnauthorizedException();
      }
    }

    console.log(user);
    return user;
  }
}
