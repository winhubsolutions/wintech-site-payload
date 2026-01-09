import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { hero } from '@/heros/config'

import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { FormBlock } from '../../blocks/Form/config'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'

import {
  MetaTitleField,
  MetaDescriptionField,
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Services: CollectionConfig<'services'> = {
  slug: 'services' as string,

  access: {
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
  },

  defaultPopulate: {
    title: true,
    slug: true,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
        req,
      }),
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },

        /* ===============================
       CARD / LISTING (USED IN SLIDER)
    =============================== */
        {
          label: 'Service Card (Listing)',
          admin: {
            description: 'Used in homepage slider & service listings',
          },
          fields: [
            {
              name: 'cardImage',
              label: 'Card Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'excerpt',
              label: 'Short Description',
              type: 'textarea',

              maxLength: 180,
            },
            {
              name: 'features',
              label: 'Key Features',
              type: 'array',
              minRows: 1,
              maxRows: 5,
              fields: [
                {
                  name: 'text',
                  label: 'Feature',
                  type: 'text',
                },
              ],
            },
            {
              name: 'showOnHomepage',
              label: 'Show on Homepage',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Content, MediaBlock, CallToAction, Archive, FormBlock],
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },

    slugField(),
  ],

  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },

  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
