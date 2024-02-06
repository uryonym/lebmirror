import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, MouseEventHandler, ReactNode } from 'react'

type NoteListProps = {
  onClick: MouseEventHandler<HTMLAnchorElement>
  onClickEdit: () => void
  children: ReactNode
}

const NoteList: FC<NoteListProps> = ({ onClick, onClickEdit, children }) => {
  return (
    <li className="flex py-2 px-8 justify-between items-center border-b">
      <a onClick={onClick}>{children}</a>
      <button className="p-2 mx-1" type="button" onClick={onClickEdit}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
    </li>
  )
}

export default NoteList
