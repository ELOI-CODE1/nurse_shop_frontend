export interface AppLinkProps {
  to: string
  navigate: (to: string) => void
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

export function AppLink({ to, navigate, children, onClick, ...props }: AppLinkProps) {
  return (
    <a
      href={to}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target
        )
          return
        event.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
