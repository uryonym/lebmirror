import { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import { pageSelector } from '../features/pageSlice'

const MainEditor: FC = () => {
  const { currentPage } = useAppSelector(pageSelector)

  return currentPage ? (
    <div>
      <p>test</p>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <p>ページを選択してください</p>
    </div>
  )
}

export default MainEditor
