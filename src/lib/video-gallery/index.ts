import fetcher from '@/utils/fetch'

const getAllVideoGallery = async () => {
  const response = await fetcher('/videos-gallery')

  const resJson = await response.json()
  const data: IVideoGallery[] = resJson.data
  return data
}

const createVideoGallery = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/videos-gallery', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const updateVideoGallery = async (id: string, title: string, description: string, accessToken: string) => {
  const response = await fetcher(`/videos-gallery/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })

  return response
}

const deleteVideoGallery = async (id: string, accessToken: string) => {
  const response = await fetcher(`/videos-gallery/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export { getAllVideoGallery, createVideoGallery, updateVideoGallery, deleteVideoGallery }
