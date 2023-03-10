import { createContext, useContext, useState } from 'react';
import { Movie, Genre, Config } from '../types';

export type MoviesContextProps = {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>
    allMovies: Movie[];
    setAllMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    filteredMovies: Movie[];
    setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    genres: Genre[];
    setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
    activeGenre: number;
    setActiveGenre: React.Dispatch<React.SetStateAction<number>>
};

type Props = {
    children: React.ReactNode;
};

export const MoviesContext = createContext<MoviesContextProps>({
    config: {} as Config,
    setConfig: () => null,
    allMovies: [],
    setAllMovies: () => null,
    filteredMovies: [],
    setFilteredMovies: () => null,
    genres: [],
    setGenres: () => null,
    activeGenre: 1,
    setActiveGenre: () => null,
});

export const MoviesProvider: React.FC<Props> = ({ children }) => {
    const [config, setConfig] = useState({} as Config);
    const [allMovies, setAllMovies] = useState([] as Movie[]);
    const [filteredMovies, setFilteredMovies] = useState([] as Movie[]);
    const [genres, setGenres] = useState([] as Genre[]);
    const [activeGenre, setActiveGenre] = useState(1);

    return (
        <MoviesContext.Provider value={{ config, setConfig, allMovies, setAllMovies, filteredMovies, setFilteredMovies, genres, setGenres, activeGenre, setActiveGenre }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies: () => MoviesContextProps = () => useContext(MoviesContext);