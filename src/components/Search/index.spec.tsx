import { Search } from "./index";
import { render, screen, act } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const mockedMovies = [
    {
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
    }
];

jest.mock('../../utils/recursive-fetch', () => ({
    recursiveFetch: () => mockedMovies
}));

jest.mock('../../contexts/movies', () => ({
    useMovies: () => ({
        allMovies: mockedMovies,
        setFilteredMovies: jest.fn(),
    })
}));

describe('src/components/Search', () => {
    it('should render Search component correctly', async () => {
        const { container } = render(<Search />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(document.querySelector('.material-icons')).toHaveTextContent('search');
    });

    it('should render Search component correctly when user has typed searchterm', async () => {
        let container;

        await act(async () => {
            container = render(<Search />).container;
        });

        act(() => {
            userEvent.type(screen.getByRole('textbox'), 'The');
        });

        expect(container).toMatchSnapshot();
        expect(document.querySelector('.material-icons')).toHaveTextContent('clear');
    });

    it('should clear searchterm when clicked on clear icon', async () => {
        let container;

        await act(async () => {
            container = render(<Search />).container;
        });

        act(() => {
            userEvent.type(screen.getByRole('textbox'), 'The');
        });

        const clearIcon = document.querySelector('.search__icon--clear');

        await act(async () => {
            if (clearIcon) {
                userEvent.click(clearIcon);
            }
        });

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '');
    });
});
