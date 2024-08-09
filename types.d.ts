interface IProfile {
  name: string
  email: string
  mobile: string
  tagline: string
  instagram: string
  facebook: string
  youtube: string
  village: string
  subdistrict: string
  city: string
  province: string
  postCode: string
  mapsLink: string
  address: string
  vision: string
  mission: string
  imageUrl: string
  createdBy: string
  updatedBy: string
}

interface ISlider {
  id: string
  imageUrl: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface INews {
  id: string
  title: string
  content: string
  imageUrl: string
  slug: string
  author: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}
