import fetcher from '@/utils/fetch'

const getMessages = async () => {
  const response = await fetcher('/messages', {
    next: { revalidate: 1 * 60 * 60 * 24 * 7 },
  })

  const resJson = await response.json()
  const data: IMessage[] = resJson.data
  return data
}

const createMessage = async (name: string, email: string, subject: string, message: string) => {
  const response = await fetcher('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, subject, message }),
  })

  return response
}

const updateMessage = async (id: string, accessToken: string) => {
  const response = await fetcher(`/messages/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

const deleteMessage = async (id: string, accessToken: string) => {
  const response = await fetcher(`/messages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getMessages, updateMessage, createMessage, deleteMessage }
