import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LeaderboardPayload, LeaderboardUpdate } from "@/types/leaderboard";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { proxy, useSnapshot } from "valtio";
import { match } from "ts-pattern";

dayjs.extend(relativeTime);

export const leaderBoard = proxy<LeaderboardUpdate>({
  event: "loading",
  payload: {
    teams: [],
    games: [],
  },
});

export const useLeaderboard = () => useSnapshot(leaderBoard);

export function LeaderboardResizable() {
  const [isResizable, setResizable] = useState(false);
  const { payload } = useLeaderboard();
  useSWR<{ data: LeaderboardUpdate }>(
    "https://wwwii.bsthun.com/mock/jpc/leaderboard.json",
    {
      refreshInterval: 1000,
      dedupingInterval: 1000,
      onSuccess: (data) => {
        console.log("data:", data);
        leaderBoard.event = data.data.event;
        leaderBoard.payload = data.data.payload;
      },
    }
  );

  const teams = payload.teams ?? [];
  const games = payload.games ?? [];

  console.log(games, teams);

  useEffect(() => {
    const timer = setInterval(() => {
      setResizable((resize) => !resize);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg backdrop-blur"
    >
      <ResizablePanel defaultSize={65}>
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
              {teams.map((team) => (
                <div className="text-[36px] text-white flex flex-1">
                  <div
                    className="w-[150px] text-center"
                    style={{ fontWeight: "300" }}
                  >
                    {team.no}
                  </div>
                  <div className="flex-1" style={{ fontWeight: "300" }}>
                    {team.teamName}
                  </div>
                  <div
                    className="flex-1 flex gap-2 items-center"
                    style={{ fontWeight: "300" }}
                  >
                    {/* {JSON.stringify(team.games)} */}
                    {team.games.map((game, index) => (
                      <Fragment key={index}>
                        {match(game)
                          .with({ maxRound: 1 }, () => (
                            <div
                              className="w-[36px] h-[36px] rounded-full"
                              style={{
                                background:
                                  game.playedRound == 1
                                    ? game.color
                                    : "rgba(255,255,255,.2)",
                              }}
                            />
                          ))
                          .with({ maxRound: 2 }, () => (
                            <div className="w-[72px] h-[32px] rounded-full overflow-hidden flex">
                              <div
                                className="flex-1 "
                                style={{
                                  background:
                                    game.playedRound >= 1
                                      ? game.color
                                      : "rgba(255,255,255,.2)",
                                }}
                              />
                              <div
                                className="flex-1"
                                style={{
                                  background:
                                    game.playedRound >= 2
                                      ? game.color
                                      : "rgba(255,255,255,.2)",
                                }}
                              />
                            </div>
                          ))
                          .otherwise(() => (
                            <></>
                          ))}
                      </Fragment>
                    ))}
                  </div>
                  <div
                    className="flex-1 text-center"
                    style={{ fontWeight: "300" }}
                  >
                    {dayjs(team.updatedAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="mt-4 flex space-x-2">
            {bases.map((base) => (
              <div className="flex-1 flex gap-4 justify-center items-center text-lg text-white">
                <div
                  className="w-[36px] h-[36px] rounded-[1000px]"
                  style={{ background: base.color }}
                />
                {base.name}
              </div>
            ))}
          </div> */}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={isResizable} />
      <ResizablePanel defaultSize={35}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={40} className="pl-4 pb-4">
            <div
              className="rounded-[48px] w-full h-full p-8 flex flex-col"
              style={{ background: "rgba(0,0,0,0.1)" }}
            >
              <h1 className="p-4 text-4xl text-white font-semibold tracking-tight first:mt-0">
                ATH Score • {payload.ath?.gameName || "N/A"}
              </h1>
              <ResizablePanelGroup direction="horizontal" className="flex-1">
                {(payload.ath?.ranks || []).map((rank, index) => (
                  <>
                    <ResizablePanel className="flex items-center justify-center flex-col">
                      <h1 className="text-4xl text-white font-semibold tracking-tight first:mt-0">
                        {rank.score}
                      </h1>
                      {rank.teams.map((team) => (
                        <h2
                          key={team.teamId}
                          className="text-4xl text-white font-semibold tracking-tight first:mt-0"
                        >
                          {team.teamName}
                        </h2>
                      ))}
                    </ResizablePanel>
                    {index < (payload.ath?.ranks.length ?? 0) - 1 && (
                      <ResizableHandle withHandle={isResizable} />
                    )}
                  </>
                ))}
              </ResizablePanelGroup>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={isResizable} />
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="horizontal" className="flex-1 ">
              <ResizablePanel className="pl-4 pt-4 pr-4 flex items-center justify-center flex-col">
                <div
                  className="rounded-[48px] w-full h-full p-8"
                  style={{ background: "rgba(0,0,0,0.1)" }}
                >
                  <div className="flex flex-col h-full">
                    <p className="text-xl text-white/70">Recent Score</p>
                    <div className="text-4xl flex flex-col gap-4 text-white font-semibold tracking-tight first:mt-0">
                      {payload.recentA?.gameName}
                      <div className="flex flex-col gap-2">
                        {payload.recentA?.ranks.map((rank) => (
                          <>
                            <div className="w-full max-w-[75px] h-[2px] bg-white" />
                            <div className="text-4xl text-white font-semibold tracking-tight first:mt-0">
                              {rank.score}
                            </div>
                            {rank.teams.map((team) => (
                              <div
                                key={team.teamId}
                                className="text-3xl text-white font-light tracking-tight first:mt-0"
                              >
                                {team.teamName}
                              </div>
                            ))}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle={isResizable} />
              <ResizablePanel className="pl-4 pt-4 flex items-center justify-center flex-col">
                <div
                  className="rounded-[48px] w-full h-full p-6"
                  style={{ background: "rgba(0,0,0,0.1)" }}
                >
                  <div className="flex flex-col h-full">
                    <p className="text-xl text-white/70">Recent Score</p>
                    <div className="text-4xl flex flex-col gap-4 text-white font-semibold tracking-tight first:mt-0">
                      {payload.recentB?.gameName}
                      <div className="flex flex-col gap-2">
                        {payload.recentB?.ranks.map((rank) => (
                          <>
                            <div className="w-full max-w-[75px] h-[2px] bg-white" />
                            <div className="text-4xl text-white font-semibold tracking-tight first:mt-0">
                              {rank.score}
                            </div>
                            {rank.teams.map((team) => (
                              <div
                                key={team.teamId}
                                className="text-3xl text-white font-light tracking-tight first:mt-0"
                              >
                                {team.teamName}
                              </div>
                            ))}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
