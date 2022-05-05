import { ITagRef } from '../tag'
import { IInterfaceTypeRef } from '../type'
import { IAuth0ID } from '../user'
import { AtomFragment } from './atom.fragment.graphql.gen'
import { IAtomType } from './atom-type.enum'

export interface ICreateAtomDTO {
  /**
   * Optional string to override auto-generated id
   */
  id?: string
  name: string
  type: IAtomType
  tags?: Array<ITagRef>
  owner: IAuth0ID

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export type IAtomDTO = AtomFragment

export type IAtomExport = {
  id: string
  name: string
  type: string
  api: {
    id: string
  }
}
