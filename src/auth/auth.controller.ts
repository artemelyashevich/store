import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, authResponseDTO } from './dto/auth.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/signUp")
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  public async signUp(
    @Body() authDto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ): Promise<authResponseDTO> {
    const { refreshToken, ...response } = await this.authService.signIn(authDto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)
    return response
  }

  @Post("/signIn")
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  public async signIn(
    @Body() authDto: AuthDTO,
    @Res({ passthrough: true }) res: Response
  ): Promise<authResponseDTO> {
    const { refreshToken, ...response } = await this.authService.signIn(authDto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)
    return response
  }

  @Post("/logout")
  @HttpCode(201)
  public async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)
  }

  @Post("/signIn/access-token")
  public async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshTokenFromCookie = req.cookies[this.authService.REFRESH_TOKEN_NAME]
    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException()
    }
    const {refreshToken, ...response} = this.authService.getTokens('1')
    this.authService.addRefreshTokenToResponse(res, refreshTokenFromCookie)
    return response
  }
}
