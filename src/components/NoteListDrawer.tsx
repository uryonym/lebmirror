import { FC, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import IconButton from './IconButton'
import { faRotate, faXmark } from '@fortawesome/free-solid-svg-icons'
import NoteFormDialog from './NoteFormDialog'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'
import NoteList from './NoteList'

type NoteListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch()
  const { notes, currentNote } = useAppSelector(noteSelector)

  const [isShowDialog, setIsShowDialog] = useState(false)

  // ノート一覧を取得する
  const handleGetNotes = () => {
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
      <ul className="w-full">
        {notes.map((note) => (
          <NoteList key={note.id} onClick={handleSelect(note.id ?? '')}>
            {note.name}
          </NoteList>
        ))}
      </ul>
      <BottomNavBar>
        <div>
          <button type="button" onClick={() => setIsShowDialog(true)}>
            新規作成
          </button>
          <IconButton icon={faRotate} onClick={handleGetNotes} />
        </div>
        <IconButton icon={faXmark} onClick={onClose} />
      </BottomNavBar>
      <NoteFormDialog
        isShow={isShowDialog}
        onClose={() => setIsShowDialog(false)}
      />
    </div>
  )
}

export default NoteListDrawer
