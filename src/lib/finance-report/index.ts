import fetcher from '@/utils/fetch'

const getFinanceReport = async () => {
  const response = await fetcher('/finance-reports', {
    next: { revalidate: 1 * 60 * 60 * 24 * 7 },
  })

  const resJson = await response.json()
  const data: IFinanceReports[] = resJson.data
  return data
}

const createFinanceReport = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/finance-reports', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateFinanceReport = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/finance-reports/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteFinanceReport = async (id: string, accessToken: string) => {
  const response = await fetcher(`/finance-reports/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getFinanceReport, updateFinanceReport, createFinanceReport, deleteFinanceReport }
