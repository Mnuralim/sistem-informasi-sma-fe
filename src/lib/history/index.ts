import fetcher from '@/utils/fetch'

const getHistory = async () => {
  const response = await fetcher('/history', {
    next: { revalidate: 1 * 60 * 60 * 24 * 7 },
  })

  const resJson = await response.json()
  const data: IHistory = resJson.data
  return data
}

const updateHistory = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/history/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getHistory, updateHistory }
