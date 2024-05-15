import { useState } from "react";
import { useGlobalContext } from "../context";

import { NavLink, useNavigate } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeal, fetchMeals, allMealUrl } =
    useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText("");
      navigate("/meals-app/");
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
    navigate("/meals-app/");
  };

  return (
    <header className="search">
      <div className="search__container">
        <img
          className="search__logo"
          onClick={() => navigate("/meals-app/")}
          src="./public/fish.png"
        />
        <nav className="search__nav">
          <NavLink
            to="/meals-app/"
            className="search__nav-link"
            onClick={() => fetchMeals(allMealUrl)}
          >
            Home
          </NavLink>
          <NavLink to="favorites" className="search__nav-link">
            Favorites
          </NavLink>
        </nav>

        <form className="search__form" onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={handleChange}
            type="text"
            placeholder="Search for recipes..."
            className="search__input"
          />
          <button type="submit" className="btn search__btn">
            Search
          </button>
          <button
            type="button"
            className="btn search__btn search__btn_random"
            onClick={handleRandomMeal}
          >
            Surprise me!
          </button>
        </form>
      </div>
    </header>
  );
};

export default Search;
