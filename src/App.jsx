import "./App.css";
import { useGlobalContext } from "./context";
import Meals from "./components/Meals";
import Search from "./components/Search";
import Modal from "./components/Modal";
import Favories from "./components/Favorites";

function App() {
  const { showModal, favorites } = useGlobalContext();
  return (
    <>
      <Search />
      {favorites.length > 0 && <Favories />}
      <Meals />
      {showModal && <Modal />}
    </>
  );
}

export default App;
