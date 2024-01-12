import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { proxy, useSnapshot } from "valtio";

const wsUrl =
  import.meta.env.VITE_WEBSOCKET_URL || "ws://127.0.0.1:3000/ws/player";

export type Event = "player/connecting" | "player/state";

export type Page = "loading" | "pair" | "lobby";

export type Pair = {
  id: string;
  name: string;
  fullname: string;
  groupName: string;
};

export type Profile = {
  groupName: string;
  groupNumber: number;
  nickname: string;
};

export const realtimeService = proxy<{
  event: Event;
  page: Page;
  profile: Profile;
  teamPairs: Pair[];
}>({
  event: "player/connecting",
  page: "loading",
  profile: { groupName: "", groupNumber: 0, nickname: "" },
  teamPairs: [],
});

export const useRealtimeService = () => useSnapshot(realtimeService);

export default function Realtime() {
  const navigate = useNavigate();

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (!playerId) {
      toast.error("You are not logged in...");
      navigate("/");
      return;
    }

    const ws = new WebSocket(
      wsUrl + "?playerId=" + localStorage.getItem("playerId")
    );
    ws.onopen = () => {
      toast.success("Connected to server", {
        duration: 1000,
        position: "top-center",
      });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      realtimeService.event = data.event;
      realtimeService.page = data.payload.page;
      realtimeService.profile = structuredClone(data.payload.profile);

      if (data.payload?.profile?.teamName) {
        realtimeService.profile.groupName =
          structuredClone(data.payload.profile)?.teamName || "No group";
      }

      if (data.payload?.teamMembers) {
        realtimeService.teamPairs = structuredClone(data.payload?.teamMembers);
      }

      if (data.payload?.teamPairs) {
        realtimeService.teamPairs = structuredClone(data.payload?.teamPairs);
      }
    };

    ws.onclose = () => {
      toast.error("Disconnected from server", {
        duration: 1000,
        position: "top-center",
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  return <></>;
}
