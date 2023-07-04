import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { jwtConstants } from "./constants";
import { Request } from "express";
import { hashTokenSync } from "src/UTILS/hash.util";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 예외1: @Public 데코레이터 붙인 케이스
    if (isPublic) {
      return true;
    }

    // 예외2: OPTIONS 메서드로 Preflight인 경우
    const request = context.switchToHttp().getRequest();
    if (request.method === "OPTIONS") {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("로그인 하세요");
    }
    try {
      const hashedToken = hashTokenSync(token);
      const payload = this.jwtService.verify(hashedToken, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
