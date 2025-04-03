"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/mode-toggle";
import { usePanelStore } from "@/stores/usePanelStore";
import PanelToggleGroup from "@/components/panel-toggle-group";

interface AppLayoutProps {
  chat: React.ReactNode;
  problem: React.ReactNode;
  workspace: React.ReactNode;
}

export default function AppLayout({ chat, problem, workspace }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { isChatVisible, isProblemVisible, isWorkspaceVisible } = usePanelStore();

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
          >
            {isProblemVisible && (
              <ResizablePanel
                id="problem"
                order={1}
                className="border rounded-lg px-4 py-2"
              >
                {problem}
              </ResizablePanel>
            )}

            {isProblemVisible && isWorkspaceVisible && (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isWorkspaceVisible ? (
              <ResizablePanel
                id="workspace"
                order={2}
                className="border rounded-lg px-4 py-2"
              >
                {workspace}
              </ResizablePanel>
            ) : (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isWorkspaceVisible && isChatVisible && (
              <ResizableHandle className="mx-1 bg-transparent hover:bg-blue-500" />
            )}

            {isChatVisible && (
              <ResizablePanel
                id="chat"
                order={3}
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
