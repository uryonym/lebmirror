import { FC, useState } from 'react'
import { Note } from '../lib/firestoreApi'
import { useAppDispatch } from '../hooks/redux'
import { changeNote, createNote } from '../features/noteSlice'
import { firebaseAuth } from '../lib/firebase'

type NoteFormDialogProps = {
  isShow: boolean
  onClose: () => void
  note?: Note
}

const NoteFormDialog: FC<NoteFormDialogProps> = ({ isShow, onClose, note }) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')

  const handleRegister = () => {
    if (note) {
      const data = { ...note, name: name }
      dispatch(changeNote(data))
    } else {
      const data: Note = {
        name: name,
        uid: firebaseAuth.currentUser?.uid ?? '',
        createdAt: new Date(),
      }
      dispatch(createNote(data))
    }
    onClose()
  }

  return (
    <div
      className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen`}
    >
      <div className="h-full w-full bg-black opacity-50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 h-1/5 w-full p-4 bg-white">
        <div className="flex">
          <input
            type="text"
            className="flex-1"
            placeholder="ノートを作成"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className="ms-2 p-2 border border-gray-500"
            onClick={handleRegister}
          >
            登録
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteFormDialog
