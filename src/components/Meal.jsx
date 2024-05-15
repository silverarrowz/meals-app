import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { useGlobalContext } from "../context";

const Meal = ({ meal }) => {
  const { selectMeal, addToFavorites, removeFromFavorites, favorites } =
    useGlobalContext();

  const { idMeal, strMeal: mealTitle, strMealThumb: mealPhoto } = meal;

  const toggleFavorite = (isFavorite, idMeal) => {
    isFavorite ? removeFromFavorites(idMeal) : addToFavorites(idMeal);
  };

  const isFavorite = favorites.find((meal) => meal.idMeal === idMeal);

  return (
    <article className="meal" key={idMeal}>
      <img
        className="meal__image"
        src={mealPhoto}
        alt="meal-photo"
        onClick={() => selectMeal(idMeal)}
      />
      <footer className="meal__info">
        <h5 className="meal__title">{mealTitle}</h5>
        <button
          className="meal__like-btn"
          onClick={() => toggleFavorite(isFavorite, idMeal)}
        >
          {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
      </footer>
    </article>
  );
};

export default Meal;
