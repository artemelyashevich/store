import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, authResponseDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signUp")
  public async signUp(@Body() authDto: AuthDTO): Promise<authResponseDTO> {
    return this.authService.signUp(authDto)
  }

  @Post("/signIn")
  public async signIn(@Body() authDto: AuthDTO): Promise<authResponseDTO> {
    return this.authService.signIn(authDto)
  }
}
