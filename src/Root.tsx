import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Home from "./pages";
import "./reset.css";
import LoginPage from "./pages/auth/login";
import Turu from "./pages/turu";
import Takuaki from "./pages/takuaki";
import { AuthProvider } from "./context/AuthProvider";
import { Room1 } from "./pages/room1";
import { Room2 } from "./pages/room2";
import { Room3 } from "./pages/room3";
import { Issei } from "./pages/issei";
import Ranking from "./pages/Ranking";
import SelectRoom from "./pages/SelectRoom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="auth/login" element={<LoginPage />} />

      <Route path="/room1" element={<Room1 />} />
      <Route path="/room2" element={<Room2 />} />
      <Route path="/room3" element={<Room3 />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/select" element={<SelectRoom />} />

      <Route path="/issei" element={<Issei />} />

      <Route path="aaa" element={<div>aaabbb</div>} />

      <Route path="turu" element={<Turu />} />

      <Route path="takuaki" element={<Takuaki/>} />
    </Route>
  )
);

const root = document.getElementById("root");

if (root) {
  const app = createRoot(root);

  app.render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}
