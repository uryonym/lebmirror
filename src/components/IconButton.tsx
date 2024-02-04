import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

type IconButtonProps = {
  icon: IconProp
  onClick: () => void
}

const IconButton: FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button className="p-2 mx-2" type="button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="xl" />
    </button>
  )
}

export default IconButton
