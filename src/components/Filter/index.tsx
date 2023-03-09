import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Genre, PopularGenres } from '../../types';
import { useMovies } from '../../contexts/movies';
import styles from './index.module.scss';

const POPULAR_CATEGORIES = [PopularGenres.Comedy, PopularGenres.Drama, PopularGenres.Action, PopularGenres.Horror, PopularGenres.Documentary];

export const Filter = () => {
    const { allMovies, setFilteredMovies, genres, setGenres, activeGenre, setActiveGenre } = useMovies();
    const [showOnlyPopular, setShowOnlyPopular] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            let allGenres;
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
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

    const handleClick = (id: number) => {
        setActiveGenre(id);

        if (id === 1) {
            setFilteredMovies(allMovies);
            return;
        };

        const filteredMovies = allMovies.filter(movie => movie.genre_ids.includes(id));

        setFilteredMovies(filteredMovies);
    };

    const getFilters = (onlyPopular: boolean) => {
        let genreList = genres;

        if (onlyPopular) {
            genreList = genres.filter(genre => genre.popular === onlyPopular);
        }

        return genreList.map(genre => {
            return (
                <button
                    key={genre.id}
                    className={cx(styles.genres__item, (activeGenre === genre.id) && styles[`genres__item--active`])}
                    onClick={() => handleClick(genre.id)}
                >
                    {genre.name}
                </button>
            );
        });
    };

    return (
        <ul className={styles.genres} aria-label='Filter movies' role='row' aria-expanded={!showOnlyPopular}>
            {getFilters(showOnlyPopular)}
            {getFilters(showOnlyPopular).length > 1 &&
                <button
                    className={styles.genres__item}
                    onClick={() => setShowOnlyPopular(prevState => !prevState)}
                >
                    {showOnlyPopular ? 'More' : 'Less'}
                </button>
            }
        </ul>
    )
};
