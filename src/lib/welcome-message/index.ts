import fetcher from '@/utils/fetch'

const getWelcomeMessage = async (type: string) => {
  const response = await fetcher(`/welcome-message/${type}`)

  const resJson = await response.json()
  const data: IWelcomeMessage = resJson.data
  return data
}

const updateWelcomeMessage = async (
  type: string,
  body: {
    message: string
    teacherId: string
  },
  accessToken: string
) => {
  const response = await fetcher(`/welcome-message/${type}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  return response
}

export { getWelcomeMessage, updateWelcomeMessage }
