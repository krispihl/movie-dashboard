import { Filter } from "./index";
import { render, screen, act } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

jest.mock('../../contexts/movies', () => ({
    useMovies: () => ({
        genres: [
            { id: 1, name: 'All movies', popular: true },
            { id: 35, name: 'Comedy', popular: true },
            { id: 18, name: 'Drama', popular: true },
            { id: 80, name: 'Crime', popular: false },
            { id: 36, name: 'History', popular: false },
        ],
        setGenres: jest.fn(),
        activeGenre: 1,
        setActiveGenre: jest.fn(),
    })
}));

describe('src/components/Filter', () => {
    it('should render Filter correctly with popular genres', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => {return { genres: [] }}
            })
        ) as jest.Mock;

        const { container } = render(<Filter />);

        expect(container).toMatchSnapshot();
        expect(screen.getByText('More')).toBeInTheDocument();
        expect(screen.queryByText('History')).not.toBeInTheDocument();
    });

    it('should render Filter correctly with all genres', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => {return { genres: [] }}
            })
        ) as jest.Mock;

        let container;

        await act(async () => {
            container = render(<Filter />).container;
        });

        const moreButton = screen.getByText('More');

        await act(async () => {
            userEvent.click(moreButton);
        });

        expect(container).toMatchSnapshot();
        expect(screen.queryByText('More')).not.toBeInTheDocument();
        expect(screen.getByText('Less')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();

        const allFilterButtons = document.querySelectorAll('.filter__item');

        expect(allFilterButtons).toHaveLength(6);
    });
});
