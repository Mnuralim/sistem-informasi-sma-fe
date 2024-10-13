import fetcher from '@/utils/fetch'

const getAchievements = async () => {
  const response = await fetcher('/teacher-achievements')

  const resJson = await response.json()
  const data: ITeacherAchievement[] = resJson.data
  return data
}

const createAchievement = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/teacher-achievements', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateAchievement = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/teacher-achievements/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteAchievement = async (id: string, accessToken: string) => {
  const response = await fetcher(`/teacher-achievements/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getAchievements, updateAchievement, createAchievement, deleteAchievement }
