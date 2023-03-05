import { useCallback, useEffect, useState } from 'react';
import { Movie, Config } from '../../types';
import { Rating } from '../Rating';
import { useMovies } from '../../contexts/movies';
import { useMovieDetails } from '../../contexts/movie-details';
import styles from './index.module.scss';

type Props = {
    data: Movie;
    config: Config;
};

export const MovieDetails = ({ data, config }: Props) => {
    const { genres } = useMovies();
    const { showMovieDetails, setBackDropSpacing } = useMovieDetails();
    const [leftPosition, setLeftPosition] = useState('');
    const [imageHeight, setImageHeight] = useState('');
    const backdropUrl = data.backdrop_path ? `${config.base_url}w780${data.backdrop_path}` : '';
    const movieGenres = data.genre_ids.map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre?.name;
    });
    
    const getHeight = useCallback(() => {
        const detailsHeight = document?.getElementById(`back-${data.id}`)?.getBoundingClientRect();
        const backDropSpacing = detailsHeight ? `${detailsHeight?.height + 30}` : '0';
        const backDropImageHeight = detailsHeight ? `${detailsHeight?.height}` : '0';
        setBackDropSpacing(backDropSpacing);
        setImageHeight(backDropImageHeight);
    }, [data.id, setBackDropSpacing, setImageHeight]);

    useEffect(() => {
        getHeight();
    }, [showMovieDetails, getHeight]);

    useEffect(() => {
        if (typeof window === 'undefined' || !window) {
            return () => null;
        }

        const handleResize = () => {
            const posterPosition = document?.getElementById(`${data.id}`)?.getBoundingClientRect();
            const left = posterPosition ? `${-posterPosition?.left}` : '0';
            setLeftPosition(left);

            getHeight();
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [data.id, getHeight]);

    return (
        <>
            <div className={styles.details__pointer}></div>
            <div className={styles['details__pointer--border']}></div>
            <div className={styles.details} style={{ left: `${leftPosition}px`}}>
                <div id={`back-${data.id}`} className={styles.details__data}>
                    <h2 className={styles['details__data--title']}>{data.original_title}</h2>
                    <Rating rating={Math.floor(data.vote_average)} />
                    <p className={styles['details__data--overview']}>{data.overview}</p>
                    <ul className={styles['details__data--genres']}>
                        {movieGenres.map((genre, i) => <li key={i}>{`#${genre}`}</li>)}
                    </ul>
                </div>
                {backdropUrl && 
                    (
                        <div className={styles['details__image-wrapper']}>
                            <img style={{ height: `${imageHeight}px` }} src={backdropUrl} alt={data.original_title} />
                        </div>
                    )
                }
            </div>
        </>
    )
};
