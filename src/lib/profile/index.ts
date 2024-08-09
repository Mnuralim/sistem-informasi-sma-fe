import fetcher from '@/utils/fetch'

const getProfile = async () => {
  const response = await fetcher('/profiles', {
    cache: 'no-store',
  })

  const resJson = await response.json()
  const data: IProfile = resJson.data
  return data
}

const updateProfile = async (body: IProfile, accessToken: string) => {
  const {
    address,
    city,
    email,
    facebook,
    instagram,
    mapsLink,
    mobile,
    name,
    postCode,
    province,
    subdistrict,
    tagline,
    village,
    youtube,
  } = body
  const response = await fetcher('/profiles/update-profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      address,
      city,
      email,
      facebook,
      instagram,
      mapsLink,
      mobile,
      name,
      postCode,
      province,
      subdistrict,
      tagline,
      village,
      youtube,
    }),
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
