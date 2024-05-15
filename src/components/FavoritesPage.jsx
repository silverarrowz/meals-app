import { useGlobalContext } from "../context";
import Meal from "./Meal";

const FavoritesPage = () => {
  const { selectMeal, removeFromFavorites, favorites } = useGlobalContext();

  if (favorites.length < 1)
    return (
      <section className="section">
        <h4>You don't have any favorite meals added yet.</h4>
      </section>
    );

  return (
    <section className="section-center">
      {favorites.map((meal) => {
        const { idMeal, strMeal: mealTitle, strMealThumb: mealPhoto } = meal;
        return <Meal key={idMeal} meal={meal} />;
      })}
    </section>
  );
};

export default FavoritesPage;
