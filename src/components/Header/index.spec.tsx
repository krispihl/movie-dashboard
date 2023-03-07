import { Header } from "./index";
import { render, screen } from '@testing-library/react';

jest.mock('../../contexts/movie-details', () => ({
    useMovieDetails: () => jest.fn(),
}));

jest.mock('../Search', () => ({
    Search: () => {
        return <div className='mocked-search' />
    }
}));

jest.mock('../Filter', () => ({
    Filter: () => {
        return <div className='mocked-filters' />
    }
}));

describe('src/components/Header', () => {
    it('should render Header correctly', async () => {
        const { container } = render(<Header />);

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Popular movies')).toBeInTheDocument();
    });
});
