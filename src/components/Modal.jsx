import { useGlobalContext } from "../context";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();
  const {
    idMeal,
    strMeal: mealTitle,
    strInstructions: text,
    strSource: source,
    strMealThumb: mealPhoto,
  } = selectedMeal;

  return (
    <aside className="modal__overlay" onClick={closeModal}>
      <div className="modal__container">
        <img src={mealPhoto} alt={mealTitle} className="modal__image" />
        <div className="modal__content">
          <h4>{mealTitle}</h4>
          <p>Cooking Instructions</p>
          <p>{text}</p>
          <a href={source} target="_blank">
            Original Source
          </a>
          <button className="btn modal__close-btn" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
