import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PanelState = {
  isChatVisible: boolean;
  isProblemVisible: boolean;
  isWorkspaceVisible: boolean;
};

type PanelActions = {
  toggleChat: () => void;
  toggleProblem: () => void;
  toggleWorkspace: () => void;
};

type PanelStore = PanelState & PanelActions;

export const usePanelStore = create<PanelStore>()(
  persist(
    (set) => ({
      isChatVisible: false,
      isProblemVisible: true,
      isWorkspaceVisible: true,
      
      toggleChat: () =>
        set((state) => ({
          isChatVisible: !state.isChatVisible,
        })),
      
      toggleProblem: () =>
        set((state) => ({
          isProblemVisible: !state.isProblemVisible,
        })),
      
      toggleWorkspace: () =>
        set((state) => ({
          isWorkspaceVisible: !state.isWorkspaceVisible,
        })),
    }),
    {
      name: "zustand:conditional",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isChatVisible: state.isChatVisible,
        isProblemVisible: state.isProblemVisible,
        isWorkspaceVisible: state.isWorkspaceVisible,
      }),
    }
  )
);
