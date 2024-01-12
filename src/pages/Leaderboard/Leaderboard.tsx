/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GcBkPZWLhTn
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import "@/Leaderboard.css";
import { LeaderboardResizable, useLeaderboard } from "./LeaderboardResizable";

export default function LeaderboardPage() {
  const { payload } = useLeaderboard();
  return (
    <div
      className="leaderboard flex w-[1920px] h-[1080px] flex-col "
      style={{ backdropFilter: "blur(48px)" }}
    >
      <div className="h-[80px] mt-4 flex w-full items-center justify-between px-8">
        <h1 className="text-8xl font-bold text-white">
          09:41 <span className="text-6xl">AM</span>
        </h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              alt="Profile picture"
              src="/placeholder.svg?height=40&width=40"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">Circus</h2>
            <p className="text-sm text-white">TAEYEON</p>
          </div>
        </div>
      </div>
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
