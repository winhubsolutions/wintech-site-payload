import type { FieldHook } from 'payload'
import { toKebabCase } from './toKebabCase'

const formatSlug = (fieldToUse: string): FieldHook => {
  return ({ data, value }) => {
    if (value) return value

    const slug = toKebabCase(data?.[fieldToUse] || '')

    return slug
  }
}

export default formatSlug