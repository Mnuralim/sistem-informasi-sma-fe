import React from 'react'
import Organization from './components/organization'
import { auth } from '@/auth'
import { getStructuralOrganization } from '@/lib/structural-organization'

const Page = async () => {
  const [structuralOrganization, session] = await Promise.all([getStructuralOrganization(), auth()])
  return (
    <section>
      <Organization
        imageUrl={structuralOrganization?.imageUrl}
        id={structuralOrganization?.id}
        accessToken={session?.user.accessToken!}
      />
    </section>
  )
}

export default Page
