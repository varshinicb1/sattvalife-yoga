import { siFacebook, siInstagram, siWhatsapp, type SimpleIcon } from 'simple-icons'

const ICONS = { instagram: siInstagram, facebook: siFacebook, whatsapp: siWhatsapp } satisfies Record<string, SimpleIcon>

/** Official brand marks from Simple Icons, rendered in currentColor. */
export function BrandIcon({ name, className = 'h-5 w-5' }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={ICONS[name].path} />
    </svg>
  )
}
