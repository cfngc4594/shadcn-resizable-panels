"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePanelStore } from "@/stores/usePanelStore";
import PanelToggleGroup from "@/components/panel-toggle-group";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";

interface AppLayoutProps {
  problem: React.ReactNode;
  workspace: React.ReactNode;
  chat: React.ReactNode;
}

export default function AppLayout({ problem, workspace, chat }: AppLayoutProps) {
  const {
    isProblemPanelVisible,
    isWorkspacePanelVisible,
    isChatPanelVisible,
  } = usePanelStore();

  const [mounted, setMounted] = useState(false);
  const resizableChatPanelRef = useRef<ImperativePanelHandle>(null);
  const resizableProblemPanelRef = useRef<ImperativePanelHandle>(null);
  const resizableWorkspacePanelRef = useRef<ImperativePanelHandle>(null);
  const resizablePanelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-12 items-center justify-end gap-2 px-2.5">
        <PanelToggleGroup />
        <ModeToggle />
      </header>

      <main className="flex flex-grow overflow-y-hidden p-2.5 pt-0">
        {mounted ? (
          <ResizablePanelGroup
            autoSaveId="conditional"
            direction="horizontal"
            ref={resizablePanelGroupRef}
          >
            {isProblemPanelVisible && (
              <ResizablePanel
                id="problem"
                order={1}
                ref={resizableProblemPanelRef}
                defaultSize={50}
                className="border rounded-lg px-4 py-2"
              >
                {problem}
              </ResizablePanel>
            )}

            {isProblemPanelVisible && isWorkspacePanelVisible && (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isWorkspacePanelVisible ? (
              <ResizablePanel
                id="workspace"
                order={2}
                ref={resizableWorkspacePanelRef}
                defaultSize={50}
                className="border rounded-lg px-4 py-2"
              >
                {workspace}
              </ResizablePanel>
            ) : (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isWorkspacePanelVisible && isChatPanelVisible && (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isChatPanelVisible && (
              <ResizablePanel
                id="chat"
                order={3}
                ref={resizableChatPanelRef}
                defaultSize={50}
                className="border rounded-lg px-4 py-2"
              >
                {chat}
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </main>
    </div>
  );
}
