import styles from './index.module.scss';

export const Shimmer = () => {
    return (
        <div className={styles.shimmerWrapper}>
            <div className={styles.shimmer}></div>
        </div>
    )
};
