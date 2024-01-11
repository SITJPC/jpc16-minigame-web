/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ijyidiMvHQe
 */
import Realtime, { useRealtimeService } from "@/Realtime";
import { AddFriendDialog } from "@/components/AddFriend";
import { CreateTeamDialog } from "@/components/CreateTeam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { PropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";

export default function Lobby() {
  const navigate = useNavigate();
  const { page, profile, teamPairs } = useRealtimeService();

  const handleLogout = () => {
    localStorage.removeItem("playerId");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <Realtime />
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">JPC 16 Minigame</span>
        </div>
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </header>
      <main className="flex flex-1 justify-center px-6 pb-6 flex-col">
        {match(page)
          .with("loading", () => (
            <div className="flex items-center space-x-4">
              <div className="space-y-2 first:mt-10">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
          .otherwise(() => (
            <>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-10">
                N' {profile.nickname}
              </h1>
              <div className="text-lg font-semibold text-muted-foreground">
                {profile.groupName}
              </div>
            </>
          ))}

        <div className="py-6 h-full max-h-[300px] flex flex-col gap-2">
          {match(page)
            .with("loading", () => (
              <>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <div>
                    <Skeleton className="w-[32px] h-[32px] rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-lg leading-none">
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-[75px]" />
                  </p>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <div>
                    <Skeleton className="w-[32px] h-[32px] rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-lg leading-none">
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-[75px]" />
                  </p>
                </div>
              </>
            ))
            .otherwise(() => (
              <></>
            ))}
          {(teamPairs || []).map((pair) => (
            <div
              key={pair.id}
              className="flex items-center space-x-4 rounded-md border p-4"
            >
              <UserIcon className="h-6 w-6" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-lg leading-none">
                  {pair.fullname} ({pair.name})
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                <Badge>{pair.groupName}</Badge>
              </p>
            </div>
          ))}
        </div>
      </main>
      {teamPairs.length < 2 && (
        <div className="p-6">
          {match(page)
            .with("lobby", () => <AddFriendDialog />)
            .with("pair", () => <CreateTeamDialog />)
            .otherwise(() => (
              <></>
            ))}
        </div>
      )}
    </div>
  );
}

function UserIcon(props: PropsWithoutRef<JSX.IntrinsicElements["svg"]>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
