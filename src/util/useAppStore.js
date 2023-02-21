import { create } from 'zustand'

const useAppStore = create((set) => ({
    drawerOpen: true,
    aboutOpen: false,
    toggleDrawerOpen: (toggle) => set((state) => ({ drawerOpen: toggle })),
    toggleAboutOpen: (toggle) => set((state) => ({ aboutOpen: toggle })),
}))
export default useAppStore;