import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteMeals")) || []
  );

  // Fetching data

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = async () => {
    fetchMeals(randomMealUrl);
  };

  useEffect(() => {
    fetchMeals(allMealUrl);
  }, []);

  useEffect(() => {
    if (searchTerm) fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);

  // Opening/closing modal

  const closeModal = (e) => {
    if (
      e.target.classList.contains("modal__overlay") ||
      e.target.classList.contains("modal__close-btn")
    ) {
      setShowModal(false);
      document.removeEventListener("keydown", handleKeyDown);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowModal(false);
      document.removeEventListener("keydown", handleKeyDown);
    }
  };

  const selectMeal = (idMeal, isFavorite) => {
    const selectedMeal = (isFavorite ? favorites : meals).find(
      (meal) => meal.idMeal === idMeal
    );
    setSelectedMeal(selectedMeal);
    setShowModal(true);
    document.addEventListener("keydown", handleKeyDown);
  };

  // Adding/removing favorites

  const updateLocalStorageFavorites = (updatedFavorites) => {
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (idMeal) => {
    const isAlreadyFavorite = favorites.some(
      (favoriteMeal) => favoriteMeal.idMeal === idMeal
    );
    if (isAlreadyFavorite) return;

    const mealToAdd = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, mealToAdd];
    setFavorites(updatedFavorites);

    updateLocalStorageFavorites(updatedFavorites);
  };

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);

    updateLocalStorageFavorites(updatedFavorites);
  };

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        fetchMeals,
        allMealUrl,
        showModal,
        closeModal,
        selectedMeal,
        selectMeal,

        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
