import { useGlobalContext } from "../context";
import Meal from "./Meal";

const Meals = () => {
  const { loading, meals } = useGlobalContext();

  if (loading)
    return (
      <section className="section">
        <h4 className="loading">Loading...</h4>
      </section>
    );

  if (meals.length < 1)
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );

  return (
    <section className="section-center">
      {meals.map((meal) => {
        return <Meal key={meal.idMeal} meal={meal} />;
      })}
    </section>
  );
};

export default Meals;
