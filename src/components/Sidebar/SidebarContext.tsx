import { createContext, useContext, useState } from 'react'

interface SidebarContextData {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData
)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  return useContext(SidebarContext)
}
