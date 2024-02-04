import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, MouseEventHandler, ReactNode } from 'react'

type NoteListProps = {
  onClick: MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

const NoteList: FC<NoteListProps> = ({ onClick, children }) => {
  return (
    <li
      className="flex py-2 px-8 justify-between items-center border-b"
      onClick={onClick}
    >
      <span>{children}</span>
      <button className="p-2 mx-1" type="button" onClick={() => {}}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
    </li>
  )
}

export default NoteList
