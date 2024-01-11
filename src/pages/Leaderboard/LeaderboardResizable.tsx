import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";

export function LeaderboardResizable() {
  const [isResizable, setResizable] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setResizable((resize) => !resize);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const bases = [
    { id: 1, name: "Base 1", color: "red" },
    { id: 2, name: "Base 2", color: "blue" },
    { id: 3, name: "Base 3", color: "green" },
    { id: 4, name: "Base 4", color: "yellow" },
  ];

  const groups = [
    { id: 1, name: "Group 1", activity: 1, score: 0 },
    { id: 2, name: "Group 2", activity: 1, score: 0 },
    { id: 3, name: "Group 3", activity: 1, score: 0 },
    { id: 4, name: "Group 4", activity: 1, score: 0 },
  ];

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg backdrop-blur"
    >
      <ResizablePanel defaultSize={50}>
        <div className="w-full h-full flex flex-col pr-4">
          <div
            className=" rounded-[48px] flex-1 flex flex-col gap-4 backdrop-blur overflow-hidden"
            style={{ background: "rgba(0,0,0,.15)" }}
          >
            <div
              className="text-[36px] text-white flex py-8"
              style={{ background: "rgba(0,0,0,.15)" }}
            >
              <div className="w-[150px] text-center">#</div>
              <div className="flex-1">Team Name</div>
              <div className="flex-1">Activity</div>
              <div className="flex-1 text-center">score</div>
            </div>
            <div
              className="flex flex-col gap-4"
              style={{ fontFamily: "Product Sans Black Regular" }}
            >
              {groups.map((group) => (
                <div className="text-[36px] text-white flex flex-1">
                  <div
                    className="w-[150px] text-center"
                    style={{ fontWeight: "300" }}
                  >
                    {group.id}
                  </div>
                  <div className="flex-1" style={{ fontWeight: "300" }}>
                    {group.name}
                  </div>
                  <div className="flex-1" style={{ fontWeight: "300" }}>
                    {group.activity}
                  </div>
                  <div
                    className="flex-1 text-center"
                    style={{ fontWeight: "300" }}
                  >
                    {group.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            {bases.map((base) => (
              <div className="flex-1 flex gap-4 justify-center items-center text-lg text-white">
                <div
                  className="w-[36px] h-[36px] rounded-[1000px]"
                  style={{ background: base.color }}
                />
                {base.name}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={isResizable} />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25} className="pl-4 pb-4">
            <div
              className="rounded-[48px] w-full h-full"
              style={{ background: "rgba(0,0,0,0.1)" }}
            ></div>
          </ResizablePanel>
          <ResizableHandle withHandle={isResizable} />
          <ResizablePanel defaultSize={75} className="pl-4 pt-4">
            <div
              className="rounded-[48px] w-full h-full"
              style={{ background: "rgba(0,0,0,0.1)" }}
            ></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
