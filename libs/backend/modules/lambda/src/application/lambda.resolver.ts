import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  Void,
} from '@codelab/backend/infra'
import { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Lambda, LambdaPayload } from '../domain/lambda.model'
import {
  CreateLambdaInput,
  CreateLambdaService,
} from '../use-cases/create-lambda'
import {
  DeleteLambdaInput,
  DeleteLambdaService,
} from '../use-cases/delete-lambda'
import {
  ExecuteLambdaInput,
  ExecuteLambdaService,
} from '../use-cases/execute-lambda'
import { GetLambdaInput, GetLambdaService } from '../use-cases/get-lambda'
import { GetLambdasService } from '../use-cases/get-lambdas'
import {
  UpdateLambdaInput,
  UpdateLambdaService,
} from '../use-cases/update-lambda'
import { LambdaAdapter } from './lambda.adapter'
import { LambdaService } from './lambda.service'

@Resolver(() => Lambda)
@Injectable()
export class LambdaResolver {
  constructor(
    private readonly lambdaService: LambdaService,
    private readonly createLambdaService: CreateLambdaService,
    private readonly deleteLambdaService: DeleteLambdaService,
    private readonly getLambdasService: GetLambdasService,
    private readonly getLambdaService: GetLambdaService,
    private readonly executeLambdaService: ExecuteLambdaService,
    private readonly updateLambdaService: UpdateLambdaService,
    private readonly lambdaAdapter: LambdaAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  async createLambda(
    @Args('input') input: CreateLambdaInput,
    @CurrentUser() currentUser: User,
  ) {
    const { id } = await this.createLambdaService.execute({
      input,
      currentUser,
    })

    await this.lambdaService.createLambda({
      id,
      ...input,
    })

    return { id }
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteLambda(@Args('input') input: DeleteLambdaInput) {
    await this.deleteLambdaService.execute(input)

    return await this.lambdaService.deleteLambda({ id: input.lambdaId })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateLambda(@Args('input') input: UpdateLambdaInput) {
    await this.updateLambdaService.execute(input)

    await this.lambdaService.updateLambda(input)
  }

  @Query(() => Lambda, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getLambda(@Args('input') input: GetLambdaInput) {
    const dgraphLambda = await this.getLambdaService.execute(input)

    if (!dgraphLambda) {
      return null
    }

    return this.lambdaAdapter.map(dgraphLambda)
  }

  @Mutation(() => LambdaPayload, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async executeLambda(@Args('input') input: ExecuteLambdaInput) {
    const dgraphLambda = await this.getLambdaService.execute(input)

    if (!dgraphLambda) {
      return null
    }

    const lambda = this.lambdaAdapter.map(dgraphLambda)

    const results = await this.lambdaService.executeLambda(
      lambda,
      JSON.parse(input.payload || '{}'),
    )

    return { payload: JSON.stringify(results) }
  }

  @Query(() => [Lambda], { defaultValue: [] })
  @UseGuards(GqlAuthGuard)
  async getLambdas(@CurrentUser() currentUser: User) {
    const dgraphLambdas = await this.getLambdasService.execute({ currentUser })

    return this.lambdaAdapter.map(dgraphLambdas)
  }
}