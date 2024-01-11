import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/layouts/MainLayout";
import Lobby from "./pages/Lobby";
import LeaderboardPage from "./pages/Leaderboard/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/lobby",
        element: <Lobby />,
      },
      {
        path: "leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },
]);

export default router;
