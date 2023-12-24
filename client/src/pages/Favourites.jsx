import { useEffect } from "react";
import { getFavourites } from "../helpers";
import RecipeCard from "../components/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "../../redux/slices/authSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favourites = useSelector((state) => state.auth.favourites);

  useEffect(() => {
    getFavourites(user._id).then((res) => dispatch(setFavourites(res)));
  }, []);

  return (
    <div className="my-10">
      <div className="lg:w-[70vw] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-3">
        {favourites.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            title={recipe.strMeal}
            image={recipe.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
