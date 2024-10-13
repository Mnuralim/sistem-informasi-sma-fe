import fetcher from '@/utils/fetch'

const getStaff = async () => {
  const response = await fetcher('/staff')

  const resJson = await response.json()
  const data: IStaff[] = resJson.data
  return data
}

const createStaff = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/staff', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateStaff = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/staff/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteStaff = async (id: string, accessToken: string) => {
  const response = await fetcher(`/staff/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getStaff, updateStaff, createStaff, deleteStaff }
