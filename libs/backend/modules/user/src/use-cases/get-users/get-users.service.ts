import { UseCasePort } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { User } from '../../domain/user.model'
import { GetUsersInput } from './get-users.input'

@Injectable()
export class GetUsersService
  implements UseCasePort<GetUsersInput | undefined, Array<User>>
{
  async execute(request: GetUsersInput | undefined): Promise<Array<User>> {
    // https://auth0.com/docs/api/management/v2#!/Users/get_users
    return Promise.resolve([])
    // return await this.auth0.getManagementClient().getUsers({
    //   page: request?.page,
    //   per_page: request?.perPage,
    //   sort: request?.sort,
    //   q: request?.query,
    // })
  }
}
