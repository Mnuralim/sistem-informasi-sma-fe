import React from 'react'
import FinanceReportsList from './components/finance-report-list'
import { auth } from '@/auth'
import { getFinanceReport } from '@/lib/finance-report'

const Page = async () => {
  const [session, financeReports] = await Promise.all([auth(), getFinanceReport()])
  return (
    <section>
      <FinanceReportsList accessToken={session?.user.accessToken!} reports={financeReports} />
    </section>
  )
}

export default Page
