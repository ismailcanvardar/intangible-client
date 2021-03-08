import create from "zustand";

const useDropdownStore = create((set, get) => ({
  isOpen: false,
  openDropdown: () => set({isOpen: true}),
  closeDropdown: () => set({isOpen: false}),
}));

export default useDropdownStore;
