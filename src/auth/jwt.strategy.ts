import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "./user.schema"
import { Model } from "mongoose"
import { PassportStrategy } from "@nestjs/passport"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    public async validate(payload) {
        const { id } = payload
        const user = this.userRepository.findById(id)
        if (!user) {
            throw new UnauthorizedException('Login first to access this route')
        }
        return user
    }
}