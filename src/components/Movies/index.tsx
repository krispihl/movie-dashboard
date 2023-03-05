import { useCallback, useEffect, useState } from 'react';
import { MovieWithCustomProps, Config } from '../../types';
import { Movie } from '../Movie';
import { VideoModal } from '../VideoModal';
import { SkeletonMovies } from '../Skeletons/SkeletonMovies';
import { useMovies } from '../../contexts/movies';
import { useMovieDetails } from '../../contexts/movie-details';
import { recursiveFetch } from '../../utils/recursive-fetch';
import styles from './index.module.scss';

type Props = {
    config: Config;
};

export const Movies = ({ config }: Props) => {
    const [loading, setLoading] = useState(true);
    const { allMovies, setAllMovies, filteredMovies, setFilteredMovies } = useMovies();
    const { videoEmbedId, backDropSpacing, activeRow } = useMovieDetails();
    const [moviesWithRowData, setMoviesWithRowData] = useState([] as MovieWithCustomProps[]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await recursiveFetch(`${process.env.REACT_APP_API_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                setAllMovies(fetchedMovies);
                setFilteredMovies(fetchedMovies);
                setLoading(false);
            } catch (error) {
                console.log('There was an error', error);
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
        <main className={styles.movies} id='movies-grid'>
            {moviesWithRowData.map((movie, i) => <Movie key={`${movie.id}-${i}`} data={movie} config={config} backDropSpacing={movie.rowPosition  === activeRow ? backDropSpacing : ''} />)}
            {videoEmbedId && <VideoModal embedId={videoEmbedId} />}
        </main>
    )
};
