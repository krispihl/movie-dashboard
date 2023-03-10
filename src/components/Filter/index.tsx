import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { Genre, PopularGenres } from '../../types';
import { useMovies } from '../../contexts/movies';
import { BASE_URL, DEFAULT_LANG } from '../../constants/fetch';
import styles from './index.module.scss';

const POPULAR_CATEGORIES = [PopularGenres.Comedy, PopularGenres.Drama, PopularGenres.Action, PopularGenres.Horror, PopularGenres.Documentary];

export const Filter = () => {
    const { allMovies, setFilteredMovies, genres, setGenres, activeGenre, setActiveGenre } = useMovies();
    const [showOnlyPopular, setShowOnlyPopular] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            let allGenres;
            try {
                const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=${DEFAULT_LANG}`);
                const json = await response.json();
                const modifiedGenres = json.genres.map(((genre: Genre) => {
                    const isPopular = POPULAR_CATEGORIES.includes(genre.id);
                    return {
                        ...genre,
                        popular: isPopular,
                    }
                }));
                allGenres = [{ id: 1, name: 'All movies', popular: true }, ...modifiedGenres];

                setGenres(allGenres);
            } catch (error) {
                allGenres = [{ id: 1, name: 'All movies', popular: true }];
                setGenres(allGenres);

                // In live app should send a message to some logger service
                console.log('There was an error fetching genres', error);
            }
        }

        fetchGenres();
    }, [setGenres]);

    const handleClick = useCallback((id: number) => {
        setActiveGenre(id);

        if (id === 1) {
            setFilteredMovies(allMovies);
            return;
        };

        const filteredMovies = allMovies.filter(movie => movie.genre_ids.includes(id));

        setFilteredMovies(filteredMovies);
    }, [allMovies, setActiveGenre, setFilteredMovies]);

    const getFilters = useCallback((onlyPopular: boolean) => {
        let genreList = genres;

        if (onlyPopular) {
            genreList = genres.filter(genre => genre.popular === onlyPopular);
        }

        return genreList.map(genre => {
            return (
                <button
                    key={genre.id}
                    className={cx(styles.filter__item, (activeGenre === genre.id) && styles[`filter__item--active`])}
                    onClick={() => handleClick(genre.id)}
                >
                    {genre.name}
                </button>
            );
        });
    }, [activeGenre, genres, handleClick]);

    return (
        <ul className={styles.filter} aria-label='Filter movies' role='row' aria-expanded={!showOnlyPopular}>
            {getFilters(showOnlyPopular)}
            {getFilters(showOnlyPopular).length > 1 &&
                <button
                    className={styles.filter__item}
                    onClick={() => setShowOnlyPopular(prevState => !prevState)}
                >
                    {showOnlyPopular ? 'More' : 'Less'}
                </button>
            }
        </ul>
    )
};
