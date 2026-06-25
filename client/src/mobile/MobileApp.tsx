import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import HomeView from "./views/HomeView";

export default function MobileApp() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}
