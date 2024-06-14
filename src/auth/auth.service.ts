import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, authResponseDTO } from './dto/auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    public readonly EXPIRE_DAY_REFRESH_TOKEN = 1
    public readonly REFRESH_TOKEN_NAME = 'refreshToken'

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
        const tokens = this.getTokens(String(user._id))
        return { ...tokens, email: user.email }
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
        const tokens = this.getTokens(String(user._id))
        return { ...tokens, email: user.email }
    }

    public addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: "localhost",
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        })
    }

    public removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: "localhost",
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        })
    }

    public getTokens(userId: string) {
        const data = { id: userId }

        const accessToken = this.jwtService.sign(data, {
            expiresIn: '1d'
        })
        const refreshToken = this.jwtService.sign(data, {
            expiresIn: '7d'
        })
        return { accessToken, refreshToken }
    }
}
