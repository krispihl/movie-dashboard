import { useCallback, useEffect, useState } from 'react';
import { MovieWithCustomProps } from '../../types';
import { Movie } from '../Movie';
import { VideoModal } from '../VideoModal';
import { ErrorView } from '../ErrorView';
import { SkeletonMovies } from '../Skeletons/SkeletonMovies';
import { useMovies } from '../../contexts/movies';
import { useMovieDetails } from '../../contexts/movie-details';
import { recursiveFetch } from '../../utils/recursive-fetch';
import styles from './index.module.scss';

export const Movies = () => {
    const [loading, setLoading] = useState(true);
    const [moviesWithRowData, setMoviesWithRowData] = useState([] as MovieWithCustomProps[]);
    const [errorView, setErrorView] = useState(false);
    const { setConfig, allMovies, setAllMovies, filteredMovies, setFilteredMovies } = useMovies();
    const { videoEmbedId, backDropSpacing, activeRow } = useMovieDetails();

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`);
                const json = await response.json();
                setConfig(json.images);
            } catch (e) {
                // In live app should send a message to some logger service
                console.log('There was an error fetching config', e);
            }
        }
        fetchConfig();
    }, [setConfig]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await recursiveFetch(`${process.env.REACT_APP_API_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                setAllMovies(fetchedMovies);
                setFilteredMovies(fetchedMovies);
                setLoading(false);
                setErrorView(false);
            } catch (e) {
                // In live app should send a message to some logger service
                console.log('There was an error fetching movies', e);
                setErrorView(true);
            }
        }
        fetchMovies();
    }, [setAllMovies, setFilteredMovies]);

    const handleResize = useCallback(() => {
        const gridEl = document.getElementById('movies-grid');
        const colCount = gridEl && window.getComputedStyle(gridEl).gridTemplateColumns.split(" ").length;         
        const moviesWithRow = filteredMovies.map((movie, index) => {
            if (colCount) {
                return {...movie, rowPosition: Math.floor(index / colCount)}
            }

            return {...movie, rowPosition: 0}
        });

        // Get scrollbar width value and set as variable
        document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px');

        setMoviesWithRowData(moviesWithRow);
    }, [filteredMovies]);

    useEffect(() => {
        if (typeof window === 'undefined' || !window) {
            return () => null;
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [allMovies, handleResize]);

    return (
        loading ? <SkeletonMovies /> :
        errorView ? <ErrorView /> :
        <main className={styles.movies} id='movies-grid'>
            {moviesWithRowData.map((movie, i) => <Movie key={`${movie.id}-${i}`} data={movie} backDropSpacing={movie.rowPosition  === activeRow ? backDropSpacing : ''} />)}
            {videoEmbedId && <VideoModal embedId={videoEmbedId} />}
        </main>
    )
};
