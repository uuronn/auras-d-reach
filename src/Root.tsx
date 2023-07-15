import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Home from "./Home";
import "./reset.css";
import LoginPage from "./pages/auth/login";
import Turu from "./pages/turu";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="aaa" element={<div>aaabbb</div>} />
      <Route path="turu" element={<Turu />} />
    </Route>
  )
);

const root = document.getElementById("root");

if (root) {
  const app = createRoot(root);

  app.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
