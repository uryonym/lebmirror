export type IUser = {
  displayName: string | undefined
  email: string | undefined
  uid: string | undefined
}

export type IPage = {
  name: string
  content: string
  sectionId: string
  createdAt: Date | undefined
  id: string | undefined
}
