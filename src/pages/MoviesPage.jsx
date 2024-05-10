import { useEffect, useState } from "react";
import "../App.module.css";
import { SearchBar } from "../components/SearchBar/SearchBar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
// import { requestImages, requestImagesByQuery } from "../services/api";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import { fetchMoviesBySearch } from "../services/api";
// import Loader from "../components/Loader/Loader";
function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Iserror, setError] = useState(false);
  const [query, setQuerry] = useState("");
//   const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const onSetQuery = (query) => {
    setQuerry(query);
  };
  useEffect(() => {
    if (query.length === 0) return;
    console.log("hi");
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await fetchMoviesBySearch(query);
        console.log(data.results);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query]);
//   const openModal = (img) => {
//     console.dir(img);
//     setModalImg(img);
//     setModalIsOpen(true);
//   }
  // console.log("images: ", images);

  return (
    
    <>
      <SearchBar onSetQuery={onSetQuery} />
      {Iserror && <ErrorMessage />}
      {movies && <ImageGallery movies={movies} isLoading={isLoading}/>}
      {/* {movies && <LoadMoreBtn setPage={setPage} />} */}
      <ImageModal modalImg={modalImg} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default MoviesPage;