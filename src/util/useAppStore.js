import { create } from 'zustand'

const useAppStore = create((set) => ({
    drawerOpen: true,
    toggleDrawerOpen: (toggle) => set((state) => ({ drawerOpen: toggle })),
}))
export default useAppStore;