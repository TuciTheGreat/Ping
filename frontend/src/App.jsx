import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotificationsPage from "./pages/NotificationsPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ChatPage from "./pages/ChatPage";
import RequestsPage from "./pages/RequestsPage";
import CallPage from "./pages/CallPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios";

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axiosInstance.get("auth/me");
      return response.data;
    },
    retry: false, // Disable automatic retries on failure
  });

  const isAuth = data?.user;

  return (
    <main>
      <Routes>
        <Route
          path="/signup"
          element={!isAuth ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={isAuth ? <NotificationsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/connections"
          element={isAuth ? <ConnectionsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuth ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/requests"
          element={isAuth ? <RequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={isAuth ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={isAuth ? <OnboardingPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{ className: "!bg-base-100 !text-base-content" }}
      />
    </main>
  );
};

export default App;
