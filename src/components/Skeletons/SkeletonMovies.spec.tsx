import { SkeletonMovies } from "./SkeletonMovies";
import { render } from '@testing-library/react';

describe('src/components/SkeletonMovies', () => {
    it('should render SkeletonMovies correctly', () => {
        const { container } = render(<SkeletonMovies />);

        expect(container).toMatchSnapshot();
    })
});
