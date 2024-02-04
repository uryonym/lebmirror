import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { signInWithRedirect, signOut, UserCredential } from 'firebase/auth'
import { firebaseAuth, googleProvider } from '../lib/firebase'
import { RootState } from '../store'

export type AuthState = {
  uid?: string
  displayName?: string
  email?: string
  authenticated?: boolean
  error?: SerializedError
}

const initialState: AuthState = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  authenticated: undefined,
  error: undefined,
}

interface PayLoad {
  uid?: string
  displayName?: string
  email?: string
}

export const login = createAsyncThunk<AuthState, PayLoad>(
  'login',
  async (req, thunkAPI) => {
    try {
      if (req.displayName === undefined) {
        const response: UserCredential = await signInWithRedirect(
          firebaseAuth,
          googleProvider
        )
        const uid = response.user.uid
        const displayName = response.user.displayName
        const email = response.user.email
        return { uid, displayName, email } as PayLoad
      } else {
        return req
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : ''
      return thunkAPI.rejectWithValue({ error: errMessage })
    }
  }
)

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await signOut(firebaseAuth)
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : ''
    return thunkAPI.rejectWithValue({ error: errMessage })
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.uid = action.payload.uid
      state.displayName = action.payload.displayName
      state.email = action.payload.email
      state.authenticated = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticated = false
      state.uid = initialState.uid
      state.displayName = initialState.displayName
      state.email = initialState.email
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error
    })
  },
})

export const authSelector = (state: RootState) => state.auth
