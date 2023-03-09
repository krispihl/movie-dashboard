import cx from 'classnames';
import styles from './index.module.scss';

type Props = {
    fullHeight?: boolean;
}

export const ErrorView = ({ fullHeight = false }: Props) => {
    return (
        <div className={cx(styles.errorView, fullHeight && styles['errorView--full'])} data-testid="errorview">
            <p className={styles.errorView__notice}>Now this is unfortunate <span className="material-icons" aria-label='Sad face'>sentiment_very_dissatisfied</span></p>
            <p>Seems that something went wrong. Please try to reload.</p>
            <p>If the problem persists please reach out to our support popular[at]movies.com</p>
        </div>
    )
};
