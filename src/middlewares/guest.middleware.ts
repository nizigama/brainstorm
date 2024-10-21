import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GuestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.session.isAuthenticated === "yes") {
      res.redirect("/")
      return;
    }

    next();
  }
}
