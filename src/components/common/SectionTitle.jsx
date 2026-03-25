
import React from 'react'

export function SectionTitle({ children, dark = true }) {
  return (
    <div>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'} leading-tight`}>{children}</h2>
      <div className="mt-4 h-1 w-12 bg-[var(--accent)] rounded-full" />
    </div>
  )
}
