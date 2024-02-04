import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/authSlice'
import { noteSlice } from './features/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    note: noteSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
