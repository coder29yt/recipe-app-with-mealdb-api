import { HiHeart } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getFavourites } from "../helpers";
import { setFavourites } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, title, image }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const addToFav = async (favourite) => {
    const res = await axios.post(
      `http://localhost:5000/api/addToFavourites/${user._id}`,
      favourite,
      { withCredentials: true }
    );
    const data = res.data;
    if (data.success) {
      toast.success(data.message);
    }
  };
  const removeFromFav = async (favourite) => {
    const res = await axios.post(
      `http://localhost:5000/api/removeFromFavourites/${user._id}`,
      favourite,
      { withCredentials: true }
    );
    const data = res.data;
    if (data.success) {
      toast.success(data.message);
    }
  };

  return (
    <div className="shadow-md flex flex-col justify-between p-3 rounded-lg bg-white">
      <div className="overflow-hidden">
        <Link to={`/recipe/${id}`}>
          <img
            src={image}
            alt={title}
            className="rounded-lg hover:scale-110 transition-all duration-500 ease-in-out"
            width={250}
          />
        </Link>
      </div>
      <div className="flex mt-2 justify-between items-center ">
        <span>
          {title.slice(0, 20)} {title.length > 20 ? "..." : null}
        </span>
        {pathname === "/favourites" ? (
          <MdDelete
            className="text-red-500 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer"
            onClick={() => {
              removeFromFav({
                idMeal: id,
                strMeal: title,
                strMealThumb: image,
              });
              getFavourites(user._id).then((res) =>
                dispatch(setFavourites(res))
              );
            }}
          />
        ) : (
          <HiHeart
            className="text-red-500 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer"
            onClick={() =>
              isAuth
                ? addToFav({
                    idMeal: id,
                    strMeal: title,
                    strMealThumb: image,
                  })
                : toast.error("Please login to add to favourites")
            }
          />
        )}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default RecipeCard;
