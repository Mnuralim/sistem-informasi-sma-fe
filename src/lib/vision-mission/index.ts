import fetcher from '@/utils/fetch'

const updateVisionMision = async (
  id: string,
  vision: string,
  mission: string,
  accessToken: string
): Promise<Response> => {
  const response = await fetcher(`/vision-mission/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      vision,
      mission,
    }),
  })

  return response
}

export { updateVisionMision }
