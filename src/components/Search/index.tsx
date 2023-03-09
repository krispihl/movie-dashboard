import { useEffect, useState } from 'react';
import cx from 'classnames';
import { useMovies } from '../../contexts/movies';
import { recursiveFetch } from '../../utils/recursive-fetch';
import { BASE_URL, DEFAULT_LANG } from '../../constants/fetch';
import styles from './index.module.scss';

export const Search = () => {
    const { allMovies, setFilteredMovies, setActiveGenre } = useMovies();
    const [query, setQuery] = useState('');

    useEffect(() => {
        let searchedMovies;

        const debouncedSearch = setTimeout(async () => {
            try {
                setActiveGenre(1);
                if (query.length) {
                    searchedMovies = await recursiveFetch(`${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${DEFAULT_LANG}&query=${query}&include_adult=false`);
                    setFilteredMovies(searchedMovies);
                    return;
                }

                setFilteredMovies(allMovies);
            } catch (e) {
                // In live app should send a message to some logger service
                console.log('There was an error searching for movies', e);
            }
        }, 300);
        
        return () => clearTimeout(debouncedSearch);
    }, [query, allMovies, setFilteredMovies, setActiveGenre]);

    return (
        <div className={styles.search} aria-label='Search for movies'>
            <input
                className={styles.search__input}
                placeholder='Search for movies...'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <span
                className={cx('material-icons', styles.search__icon, query.length && styles['search__icon--clear'])}
                onClick={query.length ? () => setQuery('') : () => {}}
                aria-label={query.length ? 'Clear search' : 'Search icon'}
            >
                {query.length ? 'clear' : 'search'}
            </span>
        </div>
    )
};
