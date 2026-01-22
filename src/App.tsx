import { useUser } from "./context/userContext";
import AdminRoutes from "./routes/AdminRoutes";
import SiteRoutes from "./routes/SiteRoutes";

function App() {
  const { role } = useUser();
  return <>{role === "admin" ? <AdminRoutes /> : <SiteRoutes />}</>;
}

export default App;
