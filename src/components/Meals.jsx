import { useGlobalContext } from "../context";
import { MdFavoriteBorder } from "react-icons/md";

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorites } = useGlobalContext();

  if (loading)
    return (
      <section className="section">
        <h4 className="loading">Loading...</h4>
      </section>
    );

  if (meals.length < 1)
    return (
      <section className="section">
        <h4>No meals matched your search terms. Please try again.</h4>
      </section>
    );

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: mealTitle, strMealThumb: mealPhoto } = meal;
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
                onClick={() => addToFavorites(idMeal)}
              >
                <MdFavoriteBorder />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
