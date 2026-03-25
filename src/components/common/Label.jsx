
import React from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-200">{children}</label>
}
