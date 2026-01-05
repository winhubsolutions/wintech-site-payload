import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'services',
    where: { _status: { equals: 'published' } },
  })

  return (

 
  
    <div className="container py-24">
      <h1 className="text-4xl font-bold mb-12">Services</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {docs.map((service) => (
          <Link
            key={service.id}
            href={service.slug}
            className="border rounded-lg p-6 hover:shadow"
          >
            <h3 className="text-xl font-semibold">{service.title}</h3>
          </Link>
        ))}
      </div>
    </div>

    
  )
}
