/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GcBkPZWLhTn
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import "@/Leaderboard.css";
import { Button } from "@/components/ui/button";
import { LeaderboardResizable } from "./LeaderboardResizable";

export default function LeaderboardPage() {
  return (
    <div
      className="leaderboard flex w-[1920px] h-[1080px] flex-col bg-slate-600"
      // style={{ backdropFilter: "blur(48px)" }}
    >
      <div className="h-[160px] flex w-full items-center justify-between px-8">
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
      <div className="flex-1 flex overflow-hidden gap-10">
        <LeaderboardResizable />
      </div>
    </div>
  );
}
