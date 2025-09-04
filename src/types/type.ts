export interface UserProfile {
  picture?: FileList
  photoURL?: string
  name: string
  username: string
  bio: string
}

export interface EmailLog {
  to: string // recipient email address
  subject: string // email subject
  text?: string // plain text body
  html?: string // HTML body
  status?: 'sent' | 'failed' | 'pending' // optional status
  errorMessage?: string // if sending failed
}
