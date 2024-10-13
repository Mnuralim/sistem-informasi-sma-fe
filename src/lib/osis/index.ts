import fetcher from '@/utils/fetch'

const getOsis = async () => {
  const response = await fetcher('/osis')

  const resJson = await response.json()
  const data: IOsis[] = resJson.data
  return data
}

const createOsis = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/osis', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateOsis = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/osis/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteOsis = async (id: string, accessToken: string) => {
  const response = await fetcher(`/osis/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getOsis, updateOsis, createOsis, deleteOsis }
