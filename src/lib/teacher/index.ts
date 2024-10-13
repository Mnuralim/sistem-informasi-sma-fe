import fetcher from '@/utils/fetch'

const getTeacher = async (query?: string) => {
  let url
  if (query) {
    url = `/teacher?role=${query}`
  } else {
    url = `/teacher`
  }
  const response = await fetcher(url)

  const resJson = await response.json()
  const data: ITeacher[] = resJson.data
  return data
}

const createTeacher = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/teacher', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateTeacher = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/teacher/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteTeacher = async (id: string, accessToken: string) => {
  const response = await fetcher(`/teacher/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getTeacher, updateTeacher, createTeacher, deleteTeacher }
