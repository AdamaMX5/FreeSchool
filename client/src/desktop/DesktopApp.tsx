import DesktopLayout from "./components/DesktopLayout";

// The desktop shell owns navigation and content state directly (no router needed —
// the category path is in-memory state, not URL-driven).
export default function DesktopApp() {
  return <DesktopLayout />;
}
