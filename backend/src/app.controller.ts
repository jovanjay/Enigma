import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  login(): string {
    return 'This action logs a user';
  }

  @Post()
  logout(): string {
    return 'This action logs out a user';
  }

  @Post()
  register(): string {
    return 'This action registers a user';
  }

  @Post()
  forgotPassword(): string {
    return 'This action sends an email to reset password';
  }

  @Post()
  resetPassword(): string {
    return 'This action resets the password';
  }
}
