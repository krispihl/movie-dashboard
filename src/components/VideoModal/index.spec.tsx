import { VideoModal } from "./index";
import { render } from '@testing-library/react';

jest.mock('../../contexts/movie-details', () => ({
    useMovieDetails: () => jest.fn()
}));

describe('src/components/VideoModal', () => {
    it('should render VideoModal component correctly', async () => {
        const { container } = render(<VideoModal embedId='some_youtube_vid_id' />);
        const iframeEl = document.querySelector("[title='Embedded youtube video']");

        expect(container).toMatchSnapshot();
        expect(iframeEl).toBeInTheDocument();
        expect(iframeEl).toHaveAttribute('src', 'https://www.youtube.com/embed/some_youtube_vid_id?autoplay=1');
    });
});