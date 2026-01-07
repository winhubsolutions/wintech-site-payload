import type { Metadata } from 'next'
import { Background } from '@/components/background'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Hero } from '@/components/blocks/hero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
//import { ServicesSlider } from '@/components/ServicesSlider'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  const page = await queryPageBySlug({
    slug: decodedSlug,
  })
  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const videoSrc =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? 'https://ekubta8widqodb9a.public.blob.vercel-storage.com/video/glass-animation-5.mp4'
      : '/api/media/file/glass-animation-6.mp4'
  return (
    <>
      {slug === 'home' ? (
        <Background variant="top" videoSrc={videoSrc} className="min-h-[600px]">
          <article>
            <Hero />
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}

            <RenderHero {...hero} />

            <RenderBlocks blocks={layout} />
          </article>
        </Background>
      ) : (
        <article>
          <PayloadRedirects disableNotFound url={url} />

          {draft && <LivePreviewListener />}

          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </article>
      )}
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
