import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeDetails from "./pages/RecipeDetails";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
