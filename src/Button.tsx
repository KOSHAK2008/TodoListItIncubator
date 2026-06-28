type Props = {
  title: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const Button = ({ title, onClick,disabled, className }: Props) => {
  return <button
      className={className}
      disabled={disabled}
      onClick={onClick}
  >{title}</button>
}
