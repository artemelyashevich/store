import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, authResponseDTO } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<User>,
        private jwtService: JwtService
    ) { }

    public async signUp(signUpDTO: AuthDTO): Promise<authResponseDTO> {
        const { email, password } = signUpDTO
        const findUser = await this.userRepository.find({ email })
        if (findUser.length > 0) {
            throw new BadRequestException("Such user already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userRepository.create({
            email,
            password: hashedPassword
        })
        const token = this.jwtService.sign({ id: user._id })
        return { token, email: user.email }
    }

    public async signIn(signInDTO: AuthDTO): Promise<authResponseDTO> {
        const { email, password } = signInDTO
        const user = await this.userRepository.findOne({ email })
        if (!user) {
            throw new UnauthorizedException("Invalid email or password")
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email or password")
        }
        const token = this.jwtService.sign({ id: user._id })
        return { token, email: user.email }
    }
}
