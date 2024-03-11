import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Call super.canActivate(context) to execute the standard JWT authentication logic
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false; // If standard JWT authentication fails, return false
    }

    return true; // Return true to indicate successful authentication
  }
}
