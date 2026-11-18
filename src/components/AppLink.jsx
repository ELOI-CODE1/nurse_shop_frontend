export function AppLink({ to, navigate, children, onClick, ...props }) {
  return <a href={to} {...props} onClick={(event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target) return
    event.preventDefault()
    navigate(to)
  }}>{children}</a>
}
