import { FC, useCallback, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { authSelector, login } from './features/authSlice'
import { firebaseAuth } from './lib/firebase'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { authenticated } = useAppSelector(authSelector)

  const refresh = useCallback(
    async (uid: string, displayName: string, email: string) => {
      const userData = {
        uid,
        displayName,
        email,
      }
      return dispatch(login(userData))
    },
    [dispatch]
  )

  useEffect(() => {
    const f = async () => {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user && authenticated) {
          if (location.pathname === '/login') {
            navigate('/')
          }
        }
        if (user && !authenticated) {
          return await refresh(
            user.uid,
            user.displayName ?? '',
            user.email ?? ''
          )
        }
        if (!user && !authenticated) {
          if (location.pathname !== '/login') {
            navigate('/login')
          }
        }
      })
    }
    f()
  })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App
