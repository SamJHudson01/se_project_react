import "../Vendor/normalize.css";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { ClothingItemsContext } from "../contexts/ClothingItemsContext";
import { getWeatherData, filterWeatherType } from "../utils/weatherAPI";
import { longitude, latitude, APIkey } from "../utils/constants";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import Profile from "./Profile/Profile";
import { getItems, addItem, deleteItem } from "../utils/api";
import { register, authorize } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  function handleToggleSwitchChange(event) {
    setCurrentTemperatureUnit(event.target.checked ? "C" : "F");
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((data) => {
        closeAllModals();
        setClothingItems([data, ...clothingItems]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item.id !== id);
        setClothingItems(updatedItems);

        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const weatherData = getWeatherData(latitude, longitude, APIkey);
    weatherData
      .then((data) => {
        const weatherType = filterWeatherType(data);
        const cityName = data.name;
        const temperatureF = Math.round(data.main.temp);
        const temperatureC = Math.round(((data.main.temp - 32) * 5) / 9);
        setWeatherData({
          temperatureF,
          temperatureC,
          weatherType,
          cityName,
        });
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
    <BrowserRouter>
      <ClothingItemsContext.Provider
        value={{ clothingItems, handleAddItemSubmit }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app">
            <div className="app__content">
              <Header
                weatherData={weatherData.cityName}
                handleAddItem={() => setActiveModal("add-item")}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      temperatureF={weatherData.temperatureF}
                      temperatureC={weatherData.temperatureC}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddItem={() => {
                        setActiveModal("add-item");
                      }}
                    />
                  }
                />
              </Routes>
              <Footer />

              {activeModal === "add-item" && (
                <AddItemModal
                  isOpen={activeModal === "add-item"}
                  onAddItem={handleAddItemSubmit}
                  onCloseModal={closeAllModals}
                />
              )}
              {activeModal === "preview" && (
                <ItemModal
                  clothingItem={selectedCard}
                  close={closeAllModals}
                  deleteItem={handleDeleteItem}
                />
              )}
            </div>
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
