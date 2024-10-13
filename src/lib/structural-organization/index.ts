import fetcher from '@/utils/fetch'

const getStructuralOrganization = async () => {
  const response = await fetcher('/structural-organization', {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: IStructuralOrganization = resJson.data
  return data
}

const updateStructuralOrganization = async (id: string, formData: FormData, accessToken: string) => {
  const response = await fetcher(`/structural-organization/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { getStructuralOrganization, updateStructuralOrganization }
