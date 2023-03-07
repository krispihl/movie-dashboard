import { MovieDetails } from "./index";
import { render, screen } from '@testing-library/react';

jest.mock('../../contexts/movie-details', () => ({
    useMovieDetails: () => ({
        showMovieDetails: true,
        setBackDropSpacing: jest.fn(),
    })
}));

jest.mock('../../contexts/movies', () => ({
    useMovies: () => ({
        genres: [
            {
                id: 28,
                name: 'Action',
                popular: false,
            },
            {
                id: 12,
                name: 'Adventure',
                popular: false,
            },
            {
                id: 16,
                name: 'Animation',
                popular: true,
            },
        ],
    })
}));

jest.mock('../Rating', () => ({
    Rating: () => {
        return <div className='mocked-rating' />
    }
}));

const mockedData = {
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

const mockedConfig = {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: [],
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    still_sizes: [],
};

describe('src/components/MovieDetails', () => {
    it('should render MovieDetails correctly', async () => {
        const { container } = render(<MovieDetails data={mockedData} config={mockedConfig} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('heading')).toHaveTextContent('The Movie');
        expect(document.querySelectorAll('li')).toHaveLength(2);
        expect(document.querySelector("[alt='The Movie']")).toBeInTheDocument();
    });
});
