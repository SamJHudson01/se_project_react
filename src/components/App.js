import "../Vendor/normalize.css";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { ClothingItemsContext } from "../contexts/ClothingItemsContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getWeatherData, filterWeatherType } from "../utils/weatherAPI";
import { longitude, latitude, APIkey } from "../utils/constants";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import Profile from "./Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import { register, authorize, checkToken } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { testUser } from "../utils/TestUser";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  function handleToggleSwitchChange(event) {
    setCurrentTemperatureUnit(event.target.checked ? "C" : "F");
  }

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = (userData) => {
    if (token) {
      updateUserProfile(userData, token)
        .then((data) => {
          setCurrentUser(data);
          closeAllModals();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      console.log("No token found. Please log in.");
    }
  };

  const handleAddItemSubmit = (item) => {
    if (token) {
      addItem(item, token)
        .then((data) => {
          closeAllModals();
          setClothingItems([data, ...clothingItems]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No token found. Please log in.");
    }
  };

  const handleDeleteItem = (id) => {
    if (token) {
      deleteItem(id, token)
        .then(() => {
          const updatedItems = clothingItems.filter((item) => item.id !== id);
          setClothingItems(updatedItems);
          closeAllModals();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No token found. Please log in.");
    }
  };

  const handleLikeClick = (id, isLiked, user) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike({ id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike({ id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    console.log("Token from local storage:", token); // Debug line

    if (token) {
      checkToken(token).then((response) => {
        if (response.error) {
          console.error("Error validating token:", response.error);
        } else {
          setToken(token);
          setIsLoggedIn(true);
          setCurrentUser(response);
        }
      });
    }
  }, []);

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
    console.log(isLoggedIn);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((res) => {
        if (res.userId) {
          console.log("Registration successful");
          return authorize({ email, password });
          console.log(res);
        } else {
          console.error("Registration failed");
          // display error to user
        }
      })
      .then((res) => {
        if (res.token) {
          console.log("Login successful");
          localStorage.setItem("jwt", res.token);
          console.log(res);
          setIsLoggedIn(true);
          closeAllModals();
        } else {
          console.error("Login failed");
          // display error to user
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password }) // add return here
      .then((res) => {
        if (res.token) {
          console.log("Login successful");
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          closeAllModals();
        } else {
          console.error("Login failed");
          // display error to user
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
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
                  handleSignUp={() => setActiveModal("register")}
                  handleLogin={() => setActiveModal("login")}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        temperatureC={weatherData.temperatureC}
                        temperatureF={weatherData.temperatureF}
                        handleLikeClick={handleLikeClick}
                        handleCardClick={handleCardClick}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute loggedIn={isLoggedIn}>
                        <Profile
                          onOpenEditProfileModal={handleOpenEditProfileModal}
                          handleLikeClick={handleLikeClick}
                          handleCardClick={handleCardClick}
                          onSignOut={handleSignOut}
                          onEditProfile={() => setActiveModal("edit-profile")}
                        />
                      </ProtectedRoute>
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
                {activeModal === "login" && (
                  <LoginModal
                    isOpen={activeModal === "login"}
                    onClose={closeAllModals}
                    onLogin={handleLogin}
                  />
                )}
                {activeModal === "register" && (
                  <RegisterModal
                    isOpen={activeModal === "register"}
                    handleRegister={handleRegister}
                    onClose={closeAllModals}
                  />
                )}
                {activeModal === "edit-profile" && (
                  <EditProfileModal
                    isOpen={activeModal === "edit-profile"}
                    onCloseModal={closeAllModals}
                    onEditProfile={handleEditProfile}
                  />
                )}
              </div>
            </div>
          </CurrentTemperatureUnitContext.Provider>
        </ClothingItemsContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
