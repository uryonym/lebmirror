import { FC, useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import BottomNavBar from '../components/BottomNavBar'
import PageListDrawer from '../components/PageListDrawer'
import NoteListDrawer from '../components/NoteListDrawer'
import IconButton from '../components/IconButton'
import MainEditor from '../components/MainEditor'

const Home: FC = () => {
  const [isShowNote, setIsShowNote] = useState(false)
  const [isShowPage, setIsShowPage] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <header className="h-8 px-4 bg-amber-300">
        <span className="text-lg font-semibold">lebmirror</span>
      </header>
      <main className="flex-1 mb-14">
        <MainEditor />
      </main>
      <BottomNavBar>
        <button type="button" onClick={() => setIsShowNote(true)}>
          ノート
        </button>
        <IconButton icon={faBars} onClick={() => setIsShowPage(true)} />
      </BottomNavBar>
      <NoteListDrawer
        isShow={isShowNote}
        onClose={() => setIsShowNote(false)}
      />
      <PageListDrawer
        isShow={isShowPage}
        onClose={() => setIsShowPage(false)}
      />
    </div>
  )
}

export default Home
