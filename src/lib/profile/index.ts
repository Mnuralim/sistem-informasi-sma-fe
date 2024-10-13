import fetcher from '@/utils/fetch'

const getProfile = async () => {
  const response = await fetcher('/profiles')

  const resJson = await response.json()
  const data: IProfile = resJson.data
  return data
}

const updateProfile = async (body: any, accessToken: string) => {
  const response = await fetcher('/profiles/update-profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  })

  return response
}

const updateImageProfile = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/profiles/update-image-profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

export { getProfile, updateProfile, updateImageProfile }
