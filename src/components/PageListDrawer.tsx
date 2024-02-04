import { FC, MouseEventHandler, ReactNode } from 'react'
import BottomNavBar from './BottomNavBar'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { sectionSelector, setCurrentSection } from '../features/sectionSlice'
import { fetchPages, pageSelector, setCurrentPage } from '../features/pageSlice'

type PageListDrawerProps = {
  isShow: boolean
  onClose: () => void
}

const PageListDrawer: FC<PageListDrawerProps> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch()
  const { sections, currentSection } = useAppSelector(sectionSelector)
  const { pages, currentPage } = useAppSelector(pageSelector)

  // セクションを選択したときの処理
  const handleSelectSection = (sectionId: string) => () => {
    if (currentSection?.id !== sectionId) {
      dispatch(setCurrentSection(sectionId))
      dispatch(fetchPages(sectionId))
    }
  }

  // ページを選択したときの処理
  const handleSelectPage = (pageId: string) => () => {
    if (currentPage?.id !== pageId) {
      dispatch(setCurrentPage(pageId))
      onClose()
    }
  }

  return (
    <div
      className={`${isShow ? '' : 'hidden'} absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <div className="flex">
        <ul className="flex-1 list-disc list-inside mb-14">
          {sections.map((section) => (
            <Section
              key={section.id}
              onClick={handleSelectSection(section.id ?? '')}
            >
              {section.name}
            </Section>
          ))}
        </ul>
        <ul className="flex-1 list-disc list-inside mb-14">
          {pages.map((page) => (
            <Page key={page.id} onClick={handleSelectPage(page.id ?? '')}>
              {page.name}
            </Page>
          ))}
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
  onClick: MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

const Section: FC<SectionProps> = ({ onClick, children }) => {
  return (
    <li className="pt-2" onClick={onClick}>
      {children}
    </li>
  )
}

const Page: FC<SectionProps> = ({ onClick, children }) => {
  return (
    <li className="pt-2" onClick={onClick}>
      {children}
    </li>
  )
}

export default PageListDrawer
