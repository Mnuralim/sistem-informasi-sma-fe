import fetcher from '@/utils/fetch'

const getExtracurricular = async () => {
  const response = await fetcher('/extracurriculars')

  const resJson = await response.json()
  const data: IExtracurricular[] = resJson.data
  return data
}

const createExtracurricular = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/extracurriculars', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateExtracurriculer = async (id: string, name: string, description: string, accessToken: string) => {
  const response = await fetcher(`/extracurriculars/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      description,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  return response
}

const deleteExtracurricular = async (id: string, accessToken: string) => {
  const response = await fetcher(`/extracurriculars/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getExtracurricular, updateExtracurriculer, createExtracurricular, deleteExtracurricular }
