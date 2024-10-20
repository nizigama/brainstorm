import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  use(req: any, res: Response, next: NextFunction) {

    if (req.session.isAuthenticated !== "yes") {

      if (req.headers.accept.includes("application/json")) {
        throw new UnauthorizedException
      }

      res.redirect("/auth")
      return;
    }

    next();
  }
}
