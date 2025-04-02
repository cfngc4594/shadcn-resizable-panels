"use client";

import { usePanelStore } from "@/stores/usePanelStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export default function PanelToggleGroup() {
  const {
    isProblemPanelVisible,
    isWorkspacePanelVisible,
    isChatPanelVisible,
    toggleProblemPanelVisibility,
    toggleWorkspacePanelVisibility,
    toggleChatPanelVisibility,
  } = usePanelStore();

  return (
    <ToggleGroup
      className="divide-background inline-flex divide-x"
      size="sm"
      type="multiple"
    >
      <ToggleGroupItem
        className="bg-primary/50 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Toggle problem panel"
        value="problem"
        data-state={isProblemPanelVisible ? "on" : "off"}
        onClick={toggleProblemPanelVisibility}
      >
        <AlignLeftIcon size={16} aria-hidden="true" />
      </ToggleGroupItem>

      <ToggleGroupItem
        className="bg-primary/50 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Toggle workspace panel"
        value="workspace"
        data-state={isWorkspacePanelVisible ? "on" : "off"}
        onClick={toggleWorkspacePanelVisibility}
      >
        <AlignCenterIcon size={16} aria-hidden="true" />
      </ToggleGroupItem>

      <ToggleGroupItem
        className="bg-primary/50 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Toggle chat panel"
        value="chat"
        data-state={isChatPanelVisible ? "on" : "off"}
        onClick={toggleChatPanelVisibility}
      >
        <AlignRightIcon size={16} aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
