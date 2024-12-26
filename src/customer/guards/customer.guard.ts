import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Authorization token is missing");
    }

    try {
      let payload;
      
      // Try to verify with CUSTOMER_JWT_SECRET
      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.CUSTOMER_JWT_SECRET,
        });

        return true
      } catch (error) {

        try {
          payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.SECRET,
          });
          
        } catch (error) {
          throw new UnauthorizedException("Invalid token")          
        }
      }
 
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = (request.headers.authorization?.split(" ") ?? []);
    return type === "Bearer" ? token : undefined;
  }
}