import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesktopLayout from "./components/DesktopLayout";
import HomeView from "./views/HomeView";

export default function DesktopApp() {
  return (
    <BrowserRouter>
      <DesktopLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </DesktopLayout>
    </BrowserRouter>
  );
}
