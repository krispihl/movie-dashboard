import { Shimmer } from "./Shimmer";
import styles from './index.module.scss';

export const SkeletonMovies = () => {
    return (
        <div className={styles.skeletonMovies}>
            {Array.from(Array(100), () => 0)
                .map((_, i) => {
                    return (
                        <div className={styles.skeletonMovie} key={i}>
                            <Shimmer />
                        </div>
                    )
                })}
        </div>
    )
};
