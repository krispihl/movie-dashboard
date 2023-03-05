import { useCallback, useEffect } from 'react';
import { useMovieDetails } from '../../contexts/movie-details';
import styles from './index.module.scss';

type Props ={
    embedId: string;
};

export const VideoModal = ({ embedId }: Props) => {
    const { setVideoEmbedId } = useMovieDetails();

    const handleEsc = useCallback((event: any) => {
        if (event.key === 'Escape') {
            setVideoEmbedId('');
        }
    }, [setVideoEmbedId]);
    
    useEffect(() => {
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [handleEsc]);

    return (
        <div className={styles.video} onClick={() => setVideoEmbedId('')}>
            <div className={styles.video__container}>
                <iframe
                    src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube video"
                />
            </div>
        </div>
      )
};
