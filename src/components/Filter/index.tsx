import { useEffect, useState } from 'react';
import cx from 'classnames';
import { Genre } from '../../types';
import { useMovies } from '../../contexts/movies';
import styles from './index.module.scss';

const POPULAR_CATEGORIES = [35, 18, 28, 27, 99];

export const Filter = () => {
    const [activeGenre, setActiveGenre] = useState(1);
    const { allMovies, setFilteredMovies, genres, setGenres } = useMovies();
    const [showOnlyPopular, setShowOnlyPopular] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
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
                const allGenres = [{ id: 1, name: 'All movies', popular: true }, ...modifiedGenres];

                setGenres(allGenres);
            } catch (error) {
                console.log('There was an error', error);
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
        <ul className={styles.genres}>
            {getFilters(showOnlyPopular)}
            <button
                className={styles.genres__item}
                onClick={() => setShowOnlyPopular(prevState => !prevState)}
            >
                {showOnlyPopular ? 'More' : 'Less'}
            </button>
        </ul>
    )
};
