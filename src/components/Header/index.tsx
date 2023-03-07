import cx from 'classnames';
import { Search } from '../Search';
import { Filter } from '../Filter';
import { useMovieDetails } from '../../contexts/movie-details';
import styles from './index.module.scss';

export const Header = () => {
    const { setShowMovieDetails, setBackDropSpacing } = useMovieDetails();

    return (
        <header
            className={styles.header}
            onClick={() => {
                setShowMovieDetails(0);
                setBackDropSpacing('0');
            }}
        >
            <div className={cx(styles.header__row, styles['header__row--top'])}>
                <h1 className={styles.header__title}>Popular movies</h1>
                <Search />
            </div>
            <div className={cx(styles.header__row, styles['header__row--bottom'])}>
                <Filter />
            </div>
        </header>
    )
};
