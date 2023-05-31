import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

// 커스텀 데코레이터. 이걸 붙여주면 로그인을 안해도 (=jwt 토큰이 헤더에 안박혀있어도) guard를 통과
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
