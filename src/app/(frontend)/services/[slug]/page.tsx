import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

import { LivePreviewListener } from '@/components/LivePreviewListener'
type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params // ✅ IMPORTANT
    const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const service = docs[0]

  if (!service) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>

 <article>
<PayloadRedirects disableNotFound url={url} />

     { <LivePreviewListener />}
      <RenderHero {...service.hero} />
      <RenderBlocks blocks={service.layout} />
      </article>
    </>
  )
}
