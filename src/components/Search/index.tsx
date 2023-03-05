import { useEffect, useState } from 'react';
import cx from 'classnames';
import { useMovies } from '../../contexts/movies';
import { recursiveFetch } from '../../utils/recursive-fetch';
import styles from './index.module.scss';

export const Search = () => {
    const { allMovies, setFilteredMovies } = useMovies();
    const [query, setQuery] = useState('');

    useEffect(() => {
        let searchedMovies;

        const debouncedSearch = setTimeout(async () => {
            try {
                if (query.length) {
                    searchedMovies = await recursiveFetch(`${process.env.REACT_APP_API_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
                    setFilteredMovies(searchedMovies);
                    return;
                }

                setFilteredMovies(allMovies);
            } catch (error) {
                console.log('There was an error', error);
            }
        }, 300);
        
        return () => clearTimeout(debouncedSearch);
    }, [query, allMovies, setFilteredMovies]);

    return (
        <div className={styles.search}>
            <input
                className={styles.search__input}
                placeholder='Search for movies...'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <span
                className={cx('material-icons', styles.search__icon, query.length && styles['search__icon--clear'])}
                onClick={query.length ? () => setQuery('') : () => {}}
            >
                {query.length ? 'clear' : 'search'}
            </span>
        </div>
    )
};
