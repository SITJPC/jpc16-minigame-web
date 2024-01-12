export interface LeaderboardUpdate {
  event: "leaderboard/state" | "loading";
  payload: LeaderboardPayload;
}

export interface LeaderboardPayload {
  teams: PayloadTeam[];
  ath?: Ath;
  recentA?: Ath;
  recentB?: Ath;
  games: PayloadGame[];
}

export interface Ath {
  gameName: string;
  gameId: string;
  ranks: Rank[];
}

export interface Rank {
  score: number;
  teams: RankTeam[];
}
export interface RankTeam {
  teamId: string;
  teamName: string;
}

export interface PayloadGame {
  gameId: string;
  gameName: string;
  color: string;
}

export interface PayloadTeam {
  no: string;
  teamNumber: string;
  teamName: string;
  games: TeamGame[];
  updatedAt: Date;
}

export interface TeamGame {
  color: string;
  maxRound: number;
  playedRound: number;
}
