import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate || !doc?.slug) return doc

  if (doc._status === 'published') {
    const path = `${doc.slug as string}}`
    payload.logger.info(`Revalidating service: ${path}`)
    await revalidatePath(path)
    await revalidateTag('services-sitemap')
  }

  if (
    previousDoc?._status === 'published' &&
    doc._status !== 'published' &&
    previousDoc?.slug
  ) {
    const oldPath = `${previousDoc.slug as string}`
    await revalidatePath(oldPath)
    await revalidateTag('services-sitemap')
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> =
  async ({ doc, req: { context } }) => {
    if (context.disableRevalidate || !doc?.slug) return doc

    const path = `${doc.slug as string }`
    await revalidatePath(path)
    await revalidateTag('services-sitemap')

    return doc
  }
