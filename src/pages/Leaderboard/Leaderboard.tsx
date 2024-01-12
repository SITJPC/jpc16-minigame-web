/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GcBkPZWLhTn
 */
import "@/Leaderboard.css";
import { LeaderboardResizable, useLeaderboard } from "./LeaderboardResizable";
import { useEffect } from "react";

declare global {
  interface Window {
    bubbly: () => void;
  }
}

export default function LeaderboardPage() {
  const { payload } = useLeaderboard();

  useEffect(() => {
    if (window.bubbly) window.bubbly();
  }, []);

  return (
    <div
      className="leaderboard flex w-[1920px] h-[1080px] flex-col "
      style={{ backdropFilter: "blur(48px)" }}
    >
      <div className="flex-1 flex overflow-hidden gap-10 p-6">
        <LeaderboardResizable />
      </div>
      <div className="h-20 flex flex-row gap-8 px-8 pb-8">
        {payload.games.map((game) => (
          <div
            key={game.gameId}
            className="flex flex-row items-center justify-center gap-4"
          >
            <div
              className="w-[36px] h-[36px] rounded-full"
              style={{ background: game.color }}
            />
            <h3 className="text-lg font-semibold text-white">
              {game.gameName}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
