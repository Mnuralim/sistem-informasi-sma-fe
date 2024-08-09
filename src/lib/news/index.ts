import fetcher from '@/utils/fetch'

const getAllNews = async () => {
  const response = await fetcher('/news', {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: INews[] = resJson.data
  return data
}

const getNewsBySlug = async (slug: string) => {
  const response = await fetcher(`/news/${slug}`, {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: INews = resJson.data

  if (!data) {
    return null
  }

  return data
}

const createNews = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/news', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const updateNews = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/news/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const deleteNews = async (id: string, accessToken: string) => {
  const response = await fetcher(`/news/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getAllNews, createNews, getNewsBySlug, updateNews, deleteNews }
