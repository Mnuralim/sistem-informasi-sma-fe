interface IProfile {
  id: string
  name: string
  email: string
  mobile: string
  tagline: string
  instagram: string
  facebook: string
  youtube: string
  address: {
    id: string
    village: string
    subdistrict: string
    city: string
    province: string
    postCode: string
    mapsLink: string
    address: string
  }
  vision: string
  mission: string
  imageUrl: string
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

interface IHistory {
  id: string
  founding: string
  development: string
  foundingImageUrl: string
  developmentImageUrl: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IStructuralOrganization {
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

interface IWelcomeMessage {
  id: string
  message: string
  teacherId: string
  teacher: ITeacher
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

interface IImageGallery {
  id: string
  url: string
  title: string
  description: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IVideoGallery {
  id: string
  url: string
  title: string
  type: 'YOUTUBE' | 'UPLOAD'
  description: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IFinanceReports {
  id: string
  title: string
  fileUrl: string
  description: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IExtracurricular {
  id: string
  name: string
  imageUrl: string
  description: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IStudentAchievement {
  id: string
  description: string
  quotes: string
  imageUrl: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  studentId: string
  student: {
    id: string
    name: string
    class: {
      id: string
      name: string
    }
  }
}

interface IOsis {
  id: string
  position: string
  description: string | null
  imageUrl: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  studentId: string
  student: {
    name: string
    id: string
    imageUrl: string
    class: {
      id: string
      name: string
    }
  }
}

interface ITeacher {
  id: string
  name: string
  subject: string
  description: string
  imageUrl: string
  email: string
  gender: 'man' | 'woman'
  password: string
  phoneNumber: string
  rank: string
  golongan: string
  nip: string
  roleId: string
  role: { id: string; name: 'committe' | 'teacher' | 'headmaster' }
  username: string
}

interface IStaff {
  id: string
  name: string
  position: string
  description: string
  imageUrl: string
  golongan: string
  nip: string
  email: string
  password: string
  phoneNumber: string
  rank: string
  gender: 'man' | 'woman'
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

interface ITeacherAchievement {
  id: string
  award: string
  year: string
  staffId?: string
  teacherId?: string
  teacher?: ITeacher
  staff?: IStaff
  imageUrl: string
  description: string
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IBlog {
  id: string
  title: string
  content: string
  imageUrl: string
  isDeleted: boolean
  createdBy: string
  createdByAdmin: {
    username: string
  }
  updatedBy: string
  deletedBy: null | string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

interface IStudent {
  id: string
  name: string
  username: string
  gender: 'man' | 'woman'
  nisn: string
  email: string
  imageUrl: string
  classId: string
  createdAt: string
  updatedAt: string
  class: {
    id: string
    name: string
  }
}

interface IGrade {
  id: string
  name: string
}

interface IMessage {
  id: string
  name: string
  email: string
  message: string
  subject: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}
