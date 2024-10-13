import fetcher from '@/utils/fetch'

const getSliders = async () => {
  const response = await fetcher('/sliders')

  const resJson = await response.json()
  const data: ISlider[] = resJson.data
  return data
}

const updateSlider = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/sliders/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const createSlider = async (formData: FormData, accessToken: string) => {
  const response = await fetcher(`/sliders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  return response
}

const deleteSlider = async (id: string, accessToken: string) => {
  const response = await fetcher(`/sliders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getSliders, updateSlider, deleteSlider, createSlider }
