import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyDeckPage from "./pages/MyDeckPage";
import DeckPage from "./pages/DeckPage";
import LobbyPage from "./pages/LobbyPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1565c0" },
    secondary: { main: "#6a1b9a" },
  },
});

function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <BottomNav />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/mon-deck"
              element={
                <PrivateRoute>
                  <Layout>
                    <MyDeckPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/deck"
              element={
                <PrivateRoute>
                  <Layout>
                    <DeckPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/lobby"
              element={
                <PrivateRoute>
                  <Layout>
                    <LobbyPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
