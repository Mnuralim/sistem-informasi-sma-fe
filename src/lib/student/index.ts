import fetcher from '@/utils/fetch'

const getStudents = async () => {
  const response = await fetcher('/students')

  const resJson = await response.json()
  const data: IStudent[] = resJson.data
  return data
}

const createStudent = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/students', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateStudent = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/students/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteStudent = async (id: string, accessToken: string) => {
  const response = await fetcher(`/students/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const getAllGrades = async () => {
  const response = await fetcher('/students/grades')
  const resJson = await response.json()
  const data: IGrade[] = resJson.data
  return data
}

export { getStudents, updateStudent, createStudent, deleteStudent, getAllGrades }
