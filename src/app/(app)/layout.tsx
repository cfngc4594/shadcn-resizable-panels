import DockView from "@/components/dock-view";
import { ModeToggle } from "@/components/mode-toggle";

interface AppLayoutProps {
  Description: React.ReactNode;
  Solutions: React.ReactNode;
  Submissions: React.ReactNode;
  Code: React.ReactNode;
  Testcase: React.ReactNode;
  TestResult: React.ReactNode;
}

export default function AppLayout({
  Description,
  Solutions,
  Submissions,
  Code,
  Testcase,
  TestResult,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-end flex-none h-12 gap-2 px-2.5">
        <ModeToggle />
      </header>
      <main className="flex flex-grow overflow-y-hidden">
        <DockView
          Description={Description}
          Solutions={Solutions}
          Submissions={Submissions}
          Code={Code}
          Testcase={Testcase}
          TestResult={TestResult}
        />
      </main>
    </div>
  );
}
