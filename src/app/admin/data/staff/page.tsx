import React from 'react'
import { auth } from '@/auth'
import { getStaff } from '@/lib/staff'
import StaffList from './components/staff-list'

const Page = async () => {
  const [session, staffs] = await Promise.all([auth(), getStaff()])
  return (
    <section>
      <StaffList accessToken={session?.user.accessToken!} staffs={staffs} />
    </section>
  )
}

export default Page
