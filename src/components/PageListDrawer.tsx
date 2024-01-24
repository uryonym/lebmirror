import { FC, ReactNode } from 'react'
import BottomNavBar from './BottomNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'

type PageListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const PageListDrawer: FC<PageListDrawerProps> = ({ isShow, onClose }) => {
  return (
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
      <BottomNavBar>
        <div>追加</div>
        <IconButton icon={faXmark} onClick={onClose} />
      </BottomNavBar>
    </div>
  )
}

type SectionProps = {
  children: ReactNode
}

const Section: FC<SectionProps> = ({ children }) => {
  return <li className="pt-2">{children}</li>
}

const Page: FC<SectionProps> = ({ children }) => {
  return <li className="pt-2">{children}</li>
}

export default PageListDrawer
