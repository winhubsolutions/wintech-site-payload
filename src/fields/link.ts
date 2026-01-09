import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            options: [
              { label: 'Internal link', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'Open in new tab',
            admin: {
              width: '50%',
              style: { alignSelf: 'flex-end' },
            },
          },
        ],
      },
    ],
  }

  const linkTargets: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      localized: true,
      label: 'Document to link to',
      relationTo: ['pages', 'posts', 'services'], // ✅ SERVICES ADDED
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
        width: '50%',
      },
    },
    {
      name: 'url',
      type: 'text',
      localized: true,
      label: 'Custom URL',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        width: '50%',
      },
    },
  ]

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTargets,
        {
          name: 'label',
          type: 'text',
          localized: true,
          label: 'Label',
          required: true,
          admin: { width: '50%' },
        },
      ],
    })
  } else {
    linkResult.fields.push(...linkTargets)
  }

  if (appearances !== false) {
    const options =
      appearances?.map((a) => appearanceOptions[a]) ?? Object.values(appearanceOptions)

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options,
      admin: {
        description: 'Choose how the link should be rendered.',
      },
    })
  }

  return deepMerge(linkResult, overrides)
}
