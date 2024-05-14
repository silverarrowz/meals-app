import { useGlobalContext } from "../context";

const Favories = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();

  return (
    <section className="favorites">
      <div className="favorites__content">
        <h5 className="favorites__title">Favorite Recipes</h5>
        <div className="favorites__container">
          {favorites.map((favoriteMeal) => {
            const {
              idMeal,
              strMeal: mealTitle,
              strMealThumb: mealPhoto,
            } = favoriteMeal;
            return (
              <div className="favorites__item" key={idMeal}>
                <img
                  className="favorites__image"
                  src={mealPhoto}
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="favorites__remove-btn"
                  onClick={() => removeFromFavorites(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favories;
