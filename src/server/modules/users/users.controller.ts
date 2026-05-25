import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('me')
  getCurrentUser() {
    return {
      user: null,
      message: 'User profile placeholder. Authentication is not implemented yet.',
    };
  }
}
