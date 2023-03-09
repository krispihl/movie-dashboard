import cx from 'classnames';
import styles from './index.module.scss';

type RatingMap = {
    [key: number]: string[];
};

const RATING_MAP: RatingMap = {
    0: ['star_outline', 'star_outline', 'star_outline', 'star_outline', 'star_outline'],
    1: ['star_half', 'star_outline', 'star_outline', 'star_outline', 'star_outline'],
    2: ['star', 'star_outline', 'star_outline', 'star_outline', 'star_outline'],
    3: ['star', 'star_half', 'star_outline', 'star_outline', 'star_outline'],
    4: ['star', 'star', 'star_outline', 'star_outline', 'star_outline'],
    5: ['star', 'star', 'star_half', 'star_outline', 'star_outline'],
    6: ['star', 'star', 'star', 'star_outline', 'star_outline'],
    7: ['star', 'star', 'star', 'star_half', 'star_outline'],
    8: ['star', 'star', 'star', 'star', 'star_outline'],
    9: ['star', 'star', 'star', 'star', 'star_half'],
    10: ['star', 'star', 'star', 'star', 'star'],
};

type Props = {
    rating: number;
}

export const Rating = ({ rating }: Props) => {
    const icons = RATING_MAP[rating];

    return (
        <ul aria-label={`Movie rating is ${rating}`}>
            {icons.map((icon, i) => {
                return <span key={i} className={cx('material-icons', styles.icon)}>{icon}</span>
            })}
        </ul>
    )
};
