import { Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { UserEntity } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { JwtStrategy } from './jwt.strategy'

@Injectable()
export class AuthService implements OnModuleInit {
  private declare userService: UserService

  constructor(
    private readonly moduleRef: ModuleRef,
    private jwtStrategy: JwtStrategy,
  ) {}

  async createAuthToken() {
    const user = {
      username: 'test',
      userId: 1,
    }

    return this.jwtStrategy.login(user)
  }

  async refreshToken(token: string) {
    return this.jwtStrategy.refreshToken(token)
  }

  async getToken(user: UserEntity) {
    return this.jwtStrategy.getToken(user)
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }
}