import { createContext, useContext, useState } from 'react';
import { Movie, Genre } from '../types';

export type MoviesContextProps = {
    allMovies: Movie[];
    setAllMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    filteredMovies: Movie[];
    setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    genres: Genre[];
    setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
};

type Props = {
    children: React.ReactNode;
};

export const MoviesContext = createContext<MoviesContextProps>({
    allMovies: [],
    setAllMovies: () => null,
    filteredMovies: [],
    setFilteredMovies: () => null,
    genres: [],
    setGenres: () => null,
});

export const MoviesProvider: React.FC<Props> = ({ children }) => {
    const [allMovies, setAllMovies] = useState([] as Movie[]);
    const [filteredMovies, setFilteredMovies] = useState([] as Movie[]);
    const [genres, setGenres] = useState([] as Genre[]);

    return (
        <MoviesContext.Provider value={{ allMovies, setAllMovies, filteredMovies, setFilteredMovies, genres, setGenres }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies: () => MoviesContextProps = () => useContext(MoviesContext);