import React from 'react'
import ListReport from './components/list-report'

const financeReports = [
  { title: 'Laporan Keuangan Januari 2023', type: 'pdf', url: '/img/test.pdf' },
  { title: 'Laporan Keuangan Februari 2023', type: 'image', url: '/img/misi.png' },
]

const FinancePage = () => {
  return (
    <section className="bg-gray-100 py-12">
      <ListReport financeReports={financeReports} />
    </section>
  )
}

export default FinancePage
