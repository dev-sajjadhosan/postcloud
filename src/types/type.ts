export interface UserProfile {
  picture?: FileList
  photoURL?: string
  name: string
  displayName: string
  username: string
  email: string
  bio: string
  projects: Project[] | []
}

export interface Project {
  id: string
  name: string
  description: string
  apiKey: string
  email: string
  uid: string
  time: string
  date: string
  url: string
}

export interface EmailLog {
  to: string // recipient email address
  subject: string // email subject
  text?: string // plain text body
  html?: string // HTML body
  status?: 'sent' | 'failed' | 'pending' // optional status
  errorMessage?: string // if sending failed
}
