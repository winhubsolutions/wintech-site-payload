import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          name: 'children',
          label: 'Dropdown Items',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'link',
              type: 'group',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
