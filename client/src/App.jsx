import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPages";
import LoginPages from "./pages/LoginPages";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/places/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
