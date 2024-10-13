import fetcher from '@/utils/fetch'

const getAllImageGallery = async () => {
  const response = await fetcher('/images-gallery', {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: IImageGallery[] = resJson.data
  return data
}

const createImageGallery = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/images-gallery', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const updateImageGallery = async (id: string, title: string, description: string, accessToken: string) => {
  const response = await fetcher(`/images-gallery/${id}`, {
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

const deleteImageGallery = async (id: string, accessToken: string) => {
  const response = await fetcher(`/images-gallery/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export { getAllImageGallery, createImageGallery, updateImageGallery, deleteImageGallery }
