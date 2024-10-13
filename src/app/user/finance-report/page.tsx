import React from 'react'
import ListReport from './components/list-report'
import { getFinanceReport } from '@/lib/finance-report'

const FinancePage = async () => {
  const financeReports = await getFinanceReport()
  return (
    <section className="bg-gray-100 py-12">
      <ListReport financeReports={financeReports} />
    </section>
  )
}

export default FinancePage
