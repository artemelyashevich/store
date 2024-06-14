import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema
      }
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>("JWT_SECRET"),
          signOptions: {
            expiresIn: config.get<string | number>("JWT_EXPIRES")
          }
        }
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
