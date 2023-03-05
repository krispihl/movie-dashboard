import { useEffect, useState } from 'react';
import cx from 'classnames';
import { MovieWithCustomProps } from '../../types';
import { MovieDetails } from '../MovieDetails';
import { useMovieDetails } from '../../contexts/movie-details';
import { useMovies } from '../../contexts/movies';
import styles from './index.module.scss';

type Props = {
    data: MovieWithCustomProps;
    backDropSpacing: string;
};

export const Movie = ({ data, backDropSpacing }: Props) => {
    const { config} = useMovies();
    const { showMovieDetails, setShowMovieDetails, setVideoEmbedId, setActiveRow } = useMovieDetails();
    const [embedId, setEmbedId] = useState('');
    const posterUrl = (config.base_url && data.poster_path) ? `${config.base_url}w154${data.poster_path}` : '';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movie/${data.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                const json = await response.json();
                const officialTrailer = json.results.find((result: any) => (result.official === true && result.type === 'Trailer'))?.key;

                setEmbedId(officialTrailer);
            } catch (e) {
                // In live app should send a message to some logger service
                console.log('There was an error fetching movie trailer', e);
            }
        }

        fetchVideos();
    }, [data.id]);

    useEffect(() => {
        if (showMovieDetails === data.id) {
            setActiveRow(data.rowPosition);
        }
    }, [setActiveRow, showMovieDetails, data.id, data.rowPosition]);

    return (
        <div className={styles.wrapper} id={String(data.id)}>
            <div
                className={cx(styles.movie, (showMovieDetails === data.id) && styles['movie--with-details'])}
                style={backDropSpacing ? { marginBottom: `${backDropSpacing}px` } : {}}
                onClick={() => {
                    setShowMovieDetails(data.id);
                    setActiveRow(data.rowPosition);
                }}
            >
                {posterUrl ?
                    <img className={styles.movie__poster} src={posterUrl} alt={data.original_title} /> :
                    (<div className={cx(styles.movie__poster, styles['movie__poster--missing'])}>
                        <span className="material-icons">photo_camera</span>
                        <h2>{data.title}</h2>
                    </div>)
                }
                {(showMovieDetails === data.id && embedId) && (
                    <div className={styles.playButton} onClick={() => setVideoEmbedId(embedId)}>
                        <span className={cx('material-icons', styles.playButton__icon)}>play_circle</span>
                    </div>
                )} 
            </div>
            {(showMovieDetails === data.id) &&
                <MovieDetails data={data} config={config} />
            }
        </div>
    )
};
