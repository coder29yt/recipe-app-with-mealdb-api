import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { PuffLoader } from "react-spinners";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`
    );

    const data = await res.data;

    if (data.meals === null || data.meals === undefined) {
      console.log("error");
    } else {
      setLoading(false);
      setRecipes(data.meals);
    }
  };

  const getInitialRecipes = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    const data = await res.data;
    setLoading(false);
    setRecipes(data.meals);
  };

  useEffect(() => {
    getInitialRecipes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search the ingredient"
          onChange={(e) => {
            getRecipes(e.target.value);
          }}
          className="outline-none border px-5 py-3 rounded-xl w-[60vw] shadow-md focus:border-red-500"
        />
      </div>
      <div className="my-10 ">
        {loading ? (
          <PuffLoader color="#f56565" size={150} />
        ) : recipes === null ? (
          <h1>No recipes to show</h1>
        ) : (
          <div className="lg:w-[70vw] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                title={recipe.strMeal}
                image={recipe.strMealThumb}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
