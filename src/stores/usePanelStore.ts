import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PanelState = {
  isProblemPanelVisible: boolean;
  isWorkspacePanelVisible: boolean;
  isChatPanelVisible: boolean;
};

type PanelAction = {
  toggleProblemPanelVisibility: () => void;
  toggleWorkspacePanelVisibility: () => void;
  toggleChatPanelVisibility: () => void;
};

type PanelStore = PanelState & PanelAction;

export const usePanelStore = create<PanelStore>()(
  persist(
    (set) => ({
      isProblemPanelVisible: true,
      isWorkspacePanelVisible: true,
      isChatPanelVisible: false,
      toggleProblemPanelVisibility: () =>
        set((state) => ({
          isProblemPanelVisible: !state.isProblemPanelVisible,
        })),
      toggleWorkspacePanelVisibility: () =>
        set((state) => ({
          isWorkspacePanelVisible: !state.isWorkspacePanelVisible,
        })),
      toggleChatPanelVisibility: () =>
        set((state) => ({
          isChatPanelVisible: !state.isChatPanelVisible,
        })),
    }),
    {
      name: "panel-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
