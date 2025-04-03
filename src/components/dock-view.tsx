"use client";

import {
  DockviewReact,
  themeAbyssSpaced,
  themeLightSpaced,
  type DockviewReadyEvent,
  type IDockviewPanelHeaderProps,
} from "dockview";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import "dockview/dist/styles/dockview.css";

interface DockviewProps {
  Description: React.ReactNode;
  Solutions: React.ReactNode;
  Submissions: React.ReactNode;
  Code: React.ReactNode;
  Testcase: React.ReactNode;
  TestResult: React.ReactNode;
}

const LAYOUT_STORAGE_KEY = "dockview:layout";

const DefaultTab = (props: IDockviewPanelHeaderProps<{ title: string }>) => (
  <div>{props.params.title}</div>
);

const tabComponents = {
  default: DefaultTab,
};

const DEFAULT_PANELS = [
  { id: "Description", component: "Description", position: null },
  {
    id: "Solutions",
    component: "Solutions",
    position: { referencePanel: "Description", direction: "within" }
  },
  {
    id: "Submissions",
    component: "Submissions",
    position: { referencePanel: "Solutions", direction: "within" }
  },
  {
    id: "Code",
    component: "Code",
    position: { referencePanel: "Submissions", direction: "right" }
  },
  {
    id: "Testcase",
    component: "Testcase",
    position: { referencePanel: "Code", direction: "below" }
  },
  {
    id: "TestResult",
    component: "TestResult",
    position: { referencePanel: "Testcase", direction: "within" }
  },
];

export default function DockView(props: DockviewProps) {
  const { resolvedTheme } = useTheme();
  const theme = useMemo(
    () => resolvedTheme === "dark" ? themeAbyssSpaced : themeLightSpaced,
    [resolvedTheme]
  );

  const components = useMemo(
    () => ({
      Description: () => props.Description,
      Solutions: () => props.Solutions,
      Submissions: () => props.Submissions,
      Code: () => props.Code,
      Testcase: () => props.Testcase,
      TestResult: () => props.TestResult,
    }),
    [props]
  );

  const handleReady = (event: DockviewReadyEvent) => {
    let success = false;

    try {
      const layout = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (layout) {
        event.api.fromJSON(JSON.parse(layout));
        success = true;
      }
    } catch (error) {
      console.error("Failed to load layout:", error);
      localStorage.removeItem(LAYOUT_STORAGE_KEY);
    }

    if (!success) {
      DEFAULT_PANELS.forEach(({ id, component, position }) => {
        event.api.addPanel({
          id,
          component,
          tabComponent: "default",
          params: { title: id },
          position: position || undefined,
        });
      });
    }

    const saveLayout = () => {
      localStorage.setItem(
        LAYOUT_STORAGE_KEY,
        JSON.stringify(event.api.toJSON())
      );
    };

    const disposable = event.api.onDidLayoutChange(saveLayout);
    return () => disposable.dispose();
  };

  return (
    <DockviewReact
      theme={theme}
      onReady={handleReady}
      components={components}
      tabComponents={tabComponents}
    />
  );
}
