import { BaseRepo } from "src/providers/base-dao";
import { SignUpDto } from "./dto/user.dto";

export class UserRepo extends BaseRepo<any> {
  signUp(params: SignUpDto) {
    return this.insert(params);
  }
}