import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('status')
  getStatus() {
    return {
      enabled: false,
      message: 'Authentication placeholder. Supabase and OAuth are not implemented yet.',
    };
  }
}
