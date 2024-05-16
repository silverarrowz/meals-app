import "./App.css";
import { useGlobalContext } from "./context";
import Meals from "./components/Meals";
import Search from "./components/Search";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const { showModal, favorites } = useGlobalContext();
  return (
    <>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Outlet />
      {showModal && <Modal />}
      <Footer />
    </>
  );
}

export default App;
