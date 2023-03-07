import { Movies } from "./index";
import { render, screen, act } from '@testing-library/react';
import { Movie } from "../../types";

const mockedMovies = [{}, {}] as Movie[];

jest.mock('../Movie', () => ({
    Movie: () => {
        return <div className='mocked-movie' />
    }
}));

jest.mock('../../utils/recursive-fetch', () => ({
    recursiveFetch: () => mockedMovies
}));

jest.mock('../../contexts/movie-details', () => ({
    useMovieDetails: () => jest.fn()
}));

jest.mock('../../contexts/movies', () => ({
    useMovies: () => ({
        setConfig: jest.fn(),
        allMovies: mockedMovies,
        setAllMovies: jest.fn(),
        filteredMovies: mockedMovies,
        setFilteredMovies: jest.fn(),
    })
}));

describe('src/components/Movies', () => {
    it('should render Movies component correctly', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => {return { images: {} }}
            })
        ) as jest.Mock;

        let container;

        await act(async () => {
            container = render(<Movies />).container;
        });

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(document.querySelectorAll('.mocked-movie')).toHaveLength(2);
    });
});
