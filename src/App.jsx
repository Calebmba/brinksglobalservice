import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import TrackingPage from "./pages/TrackingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/tracking"
          element={
            <PublicLayout>
              <TrackingPage />
            </PublicLayout>
          }
        />
        {/* NotFound renders its own Navbar/Footer, so it's not wrapped in PublicLayout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;