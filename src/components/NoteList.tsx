import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, MouseEventHandler, ReactNode } from 'react'

type NoteListProps = {
  onClick: MouseEventHandler<HTMLAnchorElement>
  onClickEdit: () => void
  onClickDelete: () => void
  children: ReactNode
}

const NoteList: FC<NoteListProps> = ({
  onClick,
  onClickEdit,
  onClickDelete,
  children,
}) => {
  return (
    <li className="flex py-2 px-6 justify-between items-center border-b">
      <a onClick={onClick}>{children}</a>
      <div>
        <button className="p-2 mx-1" type="button" onClick={onClickEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="p-2 mx-1" type="button" onClick={onClickDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  )
}

export default NoteList
