import { z } from 'zod'
import { EdgeSchema, IEdge } from '../../graph'

const FieldDataSchema = z.object({
  id: z.string().default(''),
  name: z.string().optional().nullable(),
  key: z.string(),
  description: z.string().optional().nullable(),
})

export const FieldSchema = z.intersection(EdgeSchema, FieldDataSchema)

/**
 * Type edge can be:
 * - Interface -> Field relation - IField is used then
 * - Array -> Array Item Type relation - IEdge
 * - Union -> Union Item Type relation - IEdge
 */
export const TypeEdgeSchema = z.union([FieldSchema, EdgeSchema])

export type IField = z.infer<typeof FieldSchema>

export type ITypeEdge = z.infer<typeof TypeEdgeSchema>

export const typeEdgeIsField = (edge: IEdge): edge is IField => {
  return edge && (edge as IField).id && ((edge as IField).key as any)
}
