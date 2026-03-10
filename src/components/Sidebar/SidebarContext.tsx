import { createContext, useContext, useMemo, useState } from 'react'

interface SidebarContextData {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData
)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  return useContext(SidebarContext)
}
