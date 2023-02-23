import { create } from 'zustand'

const useAppStore = create((set) => ({
    drawerOpen: true,
    aboutOpen: false,
    mapOpen: true,
    toggleDrawerOpen: (toggle) => set((state) => ({ drawerOpen: toggle })),
    toggleAboutOpen: (toggle) => set((state) => ({ aboutOpen: toggle })),
    toggleMapOpen: (value) => {
        console.log('mapOpen:', value);
        set((state) => ({ mapOpen: value }))
    }
}))
export default useAppStore;