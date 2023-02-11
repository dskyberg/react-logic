import { create } from 'zustand'

const useAppStore = create((set) => ({
    drawerOpen: false,
    toggleDrawerOpen: (toggle) => set((state) => ({ drawerOpen: toggle })),
}))
export default useAppStore;