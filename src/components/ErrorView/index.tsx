import styles from './index.module.scss';

export const ErrorView = () => {
    return (
        <div className={styles.errorView}>
            <p className={styles.errorView__notice}>Now this is unfortunate <span className="material-icons">sentiment_very_dissatisfied</span></p>
            <p>Seems that something went wrong. Please try to reload.</p>
            <p>If the problem persists please reach out to our support popular[at]movies.com</p>
        </div>
    )
};
