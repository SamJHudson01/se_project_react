import "../Vendor/normalize.css";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { getWeatherData, filterWeatherType } from "../utils/weatherAPI";
import {
  longitude,
  latitude,
  APIkey,
  defaultClothingItems,
} from "../utils/constants";
import { useEffect, useState } from "react";
import { Footer } from "./Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  useEffect(() => {
    const weatherData = getWeatherData(latitude, longitude, APIkey);
    weatherData
      .then((data) => {
        const weatherType = filterWeatherType(data);
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        setWeatherData({ temperature, weatherType, cityName });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeAllModals();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeAllModals = () => {
    setActiveModal(null);
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header
          weatherData={weatherData.cityName}
          handleAddItem={() => setActiveModal("add-item")}
        />
        <Main
          temperature={weatherData.temperature}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        />
        <Footer />
        {activeModal === "add-item" && (
          <ModalWithForm
            name="add-garment-modal"
            title="New garment"
            buttonText="Add Garment"
            close={closeAllModals}
          >
            <p className="modal__input-label">Name</p>
            <input
              type="text"
              id="owner-name"
              name="name"
              className="modal__input"
              placeholder="Name"
              required
            />
            <p className="modal__input-label">Image</p>
            <input
              type="url"
              id="owner-name"
              name="name"
              className="modal__input"
              placeholder="Image URL"
              required
            />

            <p className="modal__input-label">Name</p>
            <div className="modal__radio-container">
              <label className="modal__radio-label">
                <input type="radio" name="radio-buttons" />
                <div className="circle"></div>
                <span className="modal__radio-item-text">Hot</span>
              </label>
              <label className="modal__radio-label">
                <input type="radio" name="radio-buttons" />
                <div className="circle"></div>
                <span className="modal__radio-item-text">Warm</span>
              </label>
              <label className="modal__radio-label">
                <input type="radio" name="radio-buttons" />
                <div className="circle"></div>
                <span className="modal__radio-item-text">Cold</span>
              </label>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal clothingItem={selectedCard} close={closeAllModals} />
        )}
      </div>
    </div>
  );
}

export default App;
