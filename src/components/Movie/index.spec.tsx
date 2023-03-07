import { Movie } from "./index";
import { render, screen, act } from '@testing-library/react';

jest.mock('../../contexts/movie-details', () => ({
    useMovieDetails: () => jest.fn(),
}));

jest.mock('../../contexts/movies', () => ({
    useMovies: () => ({
        config: {
            base_url: 'http://image.tmdb.org/t/p/',
        }
    })
}));

const mockedMovie = {
    adult: false,
    backdrop_path: '/backdrop.jpg',
    genre_ids: [16, 28],
    id: 123456,
    original_language: 'en',
    original_title: 'The Movie',
    overview: 'Story about writing tests',
    popularity: 500,
    poster_path: '/poster.jpg',
    release_date: '2023-03-07',
    title: 'The Movie',
    video: false,
    vote_average: 8.0,
    vote_count: 666,
    rowPosition: 0,
};

describe('src/components/Movie', () => {
    it('should render Movie correctly with poster image', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => {return { results: [] }}
            })
        ) as jest.Mock;

        let container;

        await act(async () => {
            container = render(<Movie data={mockedMovie} backDropSpacing='' />).container;
        });

        const imageEl = screen.getByRole('img');

        expect(container).toMatchSnapshot();
        expect(imageEl).toHaveClass('movie__poster');
        expect(imageEl).toHaveAttribute('src', 'http://image.tmdb.org/t/p/w154/poster.jpg');
    });

    it('should render Movie correctly without poster image', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => {return { results: [] }}
            })
        ) as jest.Mock;

        let container;

        const movieWithoutPoster = {...mockedMovie, poster_path: ''};

        await act(async () => {
            container = render(<Movie data={movieWithoutPoster} backDropSpacing='' />).container;
        });

        expect(container).toMatchSnapshot();
        expect(screen.getByText('photo_camera')).toBeInTheDocument();
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
});
