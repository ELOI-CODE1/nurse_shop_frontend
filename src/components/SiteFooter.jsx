import { phone } from '../utils/whatsapp'

export function SiteFooter() {
  return <footer className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
    <span>© {new Date().getFullYear()} Nurse's Closet</span>
    <div className="flex flex-wrap items-center gap-5"><a href={`tel:+${phone}`}>+231 889 388 919</a><a href="https://www.facebook.com/profile.php?id=61559504650346&sk=photos_by" target="_blank" rel="noreferrer">Facebook</a></div>
  </footer>
}
