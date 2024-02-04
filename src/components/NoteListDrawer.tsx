import { FC, MouseEventHandler, ReactNode, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import IconButton from './IconButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import NoteFormDialog from './NoteFormDialog'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'

type NoteListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch()
  const { notes, currentNote } = useAppSelector(noteSelector)

  const [isShowDialog, setIsShowDialog] = useState(false)

  // ノート一覧を取得する
  const handleClick = () => {
    dispatch(fetchNotes())
  }

  // 選択したノートをセットする
  const handleSelect = (noteId: string) => () => {
    if (currentNote?.id !== noteId) {
      dispatch(setCurrentNote(noteId))
      dispatch(fetchSections(noteId))
      onClose()
    }
  }

  return (
    <div
      className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <button type="button" onClick={handleClick}>
        ノート一覧を取得
      </button>
      <ul className="w-full">
        {notes.map((note) => (
          <NoteList key={note.id} onClick={handleSelect(note.id ?? '')}>
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
  onClick: MouseEventHandler<HTMLLIElement>
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
