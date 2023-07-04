import * as bcrypt from "bcrypt";

export function hashTokenSync(token: string, saltOrRounds = 10): string {
  return bcrypt.hashSync(token, saltOrRounds);
}
