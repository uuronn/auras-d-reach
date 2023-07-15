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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="auth/login" element={<LoginPage />} />
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
