import { Link, useLocation } from "react-router-dom";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ movies, isLoading}) => {
    // console.log(images);
    const location = useLocation();
    console.log(movies);
    return <ul className={css.gallery}>
        {isLoading && <Loader />}
        {Array.isArray(movies) && movies.map(movie => { 
        return (
        <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }} >
            <ImageCard src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} isLoading={isLoading} />
            </Link>
		</li>)
    })}
	</ul>
};
export default ImageGallery;