import { AuthProvider } from "./shared/context/AuthContext";
import { useDevice } from "./shared/hooks/useDevice";
import DesktopApp from "./desktop/DesktopApp";
import MobileApp from "./mobile/MobileApp";

// Mobile and desktop are strongly separated UI trees; shared logic lives in src/shared.
export default function App() {
  const device = useDevice();
  return <AuthProvider>{device === "mobile" ? <MobileApp /> : <DesktopApp />}</AuthProvider>;
}
