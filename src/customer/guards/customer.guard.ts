import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Authorization token is missing");
    }

    const secrets = [process.env.CUSTOMER_JWT_SECRET, process.env.SECRET];

    for (const secret of secrets) {
      try {
        await this.jwtService.verifyAsync(token, { secret });
        return true; // Token is valid
      } catch {
        // Continue to the next secret if verification fails
      }
    }

    throw new UnauthorizedException("Invalid token");
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = (request.headers.authorization?.split(" ") ?? []);
    return type === "Bearer" ? token : undefined;
  }
}
