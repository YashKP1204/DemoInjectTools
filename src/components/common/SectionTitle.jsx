
import React from 'react'

export function SectionTitle({ children, dark = false }) {
  return (
    <div>
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${dark ? 'text-gray-900' : 'text-white'} leading-snug`}>{children}</h2>
      <div className="mt-3 underline-accent" />
    </div>
  )
}
