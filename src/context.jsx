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

  const closeModal = () => {
    setShowModal(false);
  };

  const closeOnEsc = () => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  };

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

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
    closeOnEsc();
  };

  const addToFavorites = (idMeal) => {
    const isFavorite = favorites.find(
      (favoriteMeal) => favoriteMeal.idMeal === idMeal
    );
    if (isFavorite) return;

    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);

    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);

    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchMeals(allMealUrl);
  }, []);

  useEffect(() => {
    if (searchTerm) fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
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
