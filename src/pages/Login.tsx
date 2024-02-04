import { FC } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { login } from '../features/authSlice'

const Login: FC = () => {
  const dispatch = useAppDispatch()

  const handleLogin = async () => {
    const userData = {
      displayName: undefined,
      email: undefined,
    }
    dispatch(login(userData))
  }

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        ログイン
      </button>
    </div>
  )
}

export default Login
