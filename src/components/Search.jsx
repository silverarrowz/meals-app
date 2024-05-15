import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const [text, setText] = useState("");

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText("");
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  return (
    <header className="search__container">
      <div className="search__nav">
        <button className="search__home-btn" onClick={() => setSearchTerm(" ")}>
          Home
        </button>
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
