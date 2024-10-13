import fetcher from '@/utils/fetch'

const getBlog = async () => {
  const response = await fetcher('/blogs')

  const resJson = await response.json()
  const data: IBlog[] = resJson.data
  return data
}

const getBlogById = async (id: string) => {
  const response = await fetcher(`/blogs/${id}`)

  const resJson = await response.json()
  const data: IBlog | null = resJson.data || null
  return data
}

const createBlog = async (formData: FormData, accessToken: string) => {
  const response = await fetcher('/blogs', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const updateBlog = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/blogs/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteBlog = async (id: string, accessToken: string) => {
  const response = await fetcher(`/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getBlog, updateBlog, createBlog, deleteBlog, getBlogById }
