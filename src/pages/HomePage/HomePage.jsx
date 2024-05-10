import { useEffect, useState } from "react";
import { fetchTrendingList } from "../../services/api";
import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendingList() {
      try {
        setLoading(true);
        setError(false);

        const initialMovies = await fetchTrendingList();
        setMovieItems(initialMovies);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendingList();
  }, []);
  console.log(movieItems);
  return (
    <section>
      <h1 className={css.title}>Trending movies</h1>
      <ul className={css.list}>
        {movieItems.map((movie) => {
          return (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} state={{ from: "/" }}>
                <div>
                  <img
                    className={css.image}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p className={css.text}>{movie.title || movie.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HomePage;
