import type { GlobalConfig } from 'payload'
import fs from 'fs'
import path from 'path'


export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'logo',
      label: 'Site Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logoDark',
      label: 'Logo (Dark Background)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },

    // 🔽 LOGO SIZE CONTROLS
    {
      type: 'row',
      fields: [
        {
          name: 'logoWidth',
          label: 'Logo Width (px)',
          type: 'number',
          defaultValue: 120,
          min: 40,
          max: 400,
          admin: {
            width: '50%',
            description: 'Controls logo display width',
          },
        },
        {
          name: 'logoHeight',
          label: 'Logo Height (px)',
          type: 'number',
          defaultValue: 32,
          min: 16,
          max: 200,
          admin: {
            width: '50%',
            description: 'Controls logo display height',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (!doc.logo || typeof doc.logo !== 'object') return

        try {
          // Extract filename from media URL
          const filename = doc.logo.url.split('/').pop()
          if (!filename) return

          const sourcePath = path.join(
            process.cwd(),
            'public',
            'api',
            'media',
            'file',
            filename
          )

          const targetPath = path.join(
            process.cwd(),
            'public',
            'admin-logo.png'
          )

          fs.copyFileSync(sourcePath, targetPath)

          console.log('✅ Admin logo synced from Site Settings')
        } catch (err) {
          console.error('❌ Failed to sync admin logo', err)
        }
      },
    ],
  },
}
