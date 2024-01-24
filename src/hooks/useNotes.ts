import useSWR from 'swr'
import { api } from '../lib/api'

export type Note = {
  id: string
  name: string
  seq: number
}

export type INote = {
  name: string
}

export const useNotes = () => {
  const fetcher = (url: string) => api.get(url).then((res) => res.data)

  const { data, error, isLoading, mutate } = useSWR<Note[], Error>(
    '/notes',
    fetcher
  )

  const createNote = async (name: string) => {
    const newData: INote = {
      name: name,
    }
    await api.post('/notes', newData)
    mutate()
  }

  const updateNote = async (note: Note, name: string) => {
    const updateData: Note = { ...note, name: name }
    await api.patch(`/notes/${note.id}`, updateData)
    mutate()
  }

  const removeNote = async (note: Note) => {
    await api.delete(`/notes/${note.id}`)
    mutate()
  }

  return { data, error, isLoading, createNote, updateNote, removeNote }
}
