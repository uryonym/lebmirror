import { FC, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import IconButton from './IconButton'
import { faRotate, faXmark } from '@fortawesome/free-solid-svg-icons'
import NoteFormDialog from './NoteFormDialog'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  destroyNote,
  fetchNotes,
  noteSelector,
  setCurrentNote,
} from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'
import NoteList from './NoteList'
import { Note } from '../lib/firestoreApi'

type NoteListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch()
  const { notes, currentNote } = useAppSelector(noteSelector)

  const [isShowDialog, setIsShowDialog] = useState(false)
  const [selectNote, setSelectNote] = useState<Note | undefined>()

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

  // 新規作成ボタンをクリックしたときの処理
  const handleNew = () => {
    setSelectNote(undefined)
    setIsShowDialog(true)
  }

  // 編集ボタンをクリックしたときの処理
  const handleEdit = (note: Note) => () => {
    setSelectNote(note)
    setIsShowDialog(true)
  }

  // 削除ボタンをクリックしたときの処理
  const handleDelete = (noteId: string) => () => {
    const confirm = window.confirm('本当に削除しますか？')
    if (confirm) {
      dispatch(destroyNote(noteId))
    }
  }

  return (
    <div
      className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <ul className="w-full">
        {notes.map((note) => (
          <NoteList
            key={note.id}
            onClick={handleSelect(note.id ?? '')}
            onClickEdit={handleEdit(note)}
            onClickDelete={handleDelete(note.id ?? '')}
          >
            {note.name}
          </NoteList>
        ))}
      </ul>
      <BottomNavBar>
        <div>
          <button type="button" onClick={handleNew}>
            新規作成
          </button>
          <IconButton icon={faRotate} onClick={handleGetNotes} />
        </div>
        <IconButton icon={faXmark} onClick={onClose} />
      </BottomNavBar>
      <NoteFormDialog
        isShow={isShowDialog}
        onClose={() => setIsShowDialog(false)}
        note={selectNote}
      />
    </div>
  )
}

export default NoteListDrawer
