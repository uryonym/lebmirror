import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const App: FC = () => {
  const [isShow, setIsShow] = useState(false)

  const handleClickMenu = () => {
    setIsShow(true)
  }

  const handleClose = () => {
    setIsShow(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="h-8 px-4 bg-amber-300">
        <span className="text-lg font-semibold">ynymnote</span>
      </header>
      <main className="flex-1 flex mb-14">page editor</main>
      <div className="fixed bottom-0 h-14 w-full border-t bg-white">
        <div className="flex justify-between items-center h-full px-4">
          <button type="button">ノート</button>
          <button type="button" onClick={handleClickMenu}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </button>
        </div>
      </div>
      <div
        className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen bg-white`}
      >
        <div className="flex">
          <ul className="flex-1 list-disc list-inside mb-14">
            <Section>セクション１</Section>
            <Section>セクション２</Section>
            <Section>セクション３</Section>
            <Section>セクション４</Section>
            <Section>セクション５</Section>
            <Section>セクション６</Section>
            <Section>セクション７</Section>
            <Section>セクション８</Section>
            <Section>セクション９</Section>
          </ul>
          <ul className="flex-1 list-disc list-inside mb-14">
            <Page>ページ１</Page>
            <Page>ページ２</Page>
            <Page>ページ３</Page>
            <Page>ページ４</Page>
            <Page>ページ５</Page>
            <Page>ページ６</Page>
            <Page>ページ７</Page>
            <Page>ページ８</Page>
            <Page>ページ９</Page>
          </ul>
        </div>
        <button type="button" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
      </div>
    </div>
  )
}

const Section = ({ children }) => {
  return <li className="pt-2">{children}</li>
}

const Page = ({ children }) => {
  return <li className="pt-2">{children}</li>
}

export default App
