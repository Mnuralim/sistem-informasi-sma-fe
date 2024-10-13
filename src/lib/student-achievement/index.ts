import fetcher from '@/utils/fetch'

const getStudentAchievements = async () => {
  const response = await fetcher('/student-achievements', {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: IStudentAchievement[] = resJson.data
  return data
}

const createStudentAchievement = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/student-achievements', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateStudentAchievement = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/student-achievements/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteStudentAchievement = async (id: string, accessToken: string) => {
  const response = await fetcher(`/student-achievements/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getStudentAchievements, updateStudentAchievement, createStudentAchievement, deleteStudentAchievement }
