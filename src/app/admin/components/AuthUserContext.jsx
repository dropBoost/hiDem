'use client'

import { createContext, useContext } from 'react'

const AuthUserContext = createContext(null)

export function AuthUserProvider({ value, children }) {
  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

export function useAuthUser() {
  return useContext(AuthUserContext)
}
