import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSession = (redirectIfNoSession = true) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    const now = Date.now()
    const fifteenMinutes = 15 * 60 * 1000

    if (!userStr) {
      if (redirectIfNoSession) navigate('/login')
      return
    }

    const user = JSON.parse(userStr)
    const lastActive = user.lastActive || now

    if (now - lastActive > fifteenMinutes) {
      localStorage.removeItem('user')
      if (redirectIfNoSession) navigate('/login')
      return
    }

    localStorage.setItem('user', JSON.stringify({ ...user, lastActive: now }))
  }, [navigate, redirectIfNoSession])
}
