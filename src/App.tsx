import { useLocation } from "react-router-dom";

import { useUser } from "./context/userContext";
import AdminRoutes from "./routes/AdminRoutes";
import SiteRoutes from "./routes/SiteRoutes";

function App() {

  const {role} = useUser();
  console.log(role)
  return (
    <>
      {role === 'admin' ? <AdminRoutes /> : <SiteRoutes/>}
  
    </>
  );
}

export default App;
