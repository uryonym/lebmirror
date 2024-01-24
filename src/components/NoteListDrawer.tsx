import { FC, ReactNode, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import IconButton from './IconButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNotes } from '../hooks/useNotes'
import NoteFormDialog from './NoteFormDialog'

type NoteListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const [isShowDialog, setIsShowDialog] = useState(false)

  const { data, error, isLoading } = useNotes()

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) throw new Error()

  return (
    <div
      className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <ul className="w-full">
        {data.map((note) => (
          <NoteList key={note.seq} onClick={() => {}}>
            {note.name}
          </NoteList>
        ))}
      </ul>
      <BottomNavBar>
        <button type="button" onClick={() => setIsShowDialog(true)}>
          新規作成
        </button>
        <IconButton icon={faXmark} onClick={onClose} />
      </BottomNavBar>
      <NoteFormDialog
        isShow={isShowDialog}
        onClose={() => setIsShowDialog(false)}
      />
    </div>
  )
}

type NoteListProps = {
  onClick: () => void
  children: ReactNode
}

const NoteList: FC<NoteListProps> = ({ onClick, children }) => {
  return (
    <li className="py-4 px-8 border-b" onClick={onClick}>
      {children}
    </li>
  )
}

export default NoteListDrawer
