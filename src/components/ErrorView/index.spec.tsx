import { ErrorView } from "./index";
import { render, screen } from '@testing-library/react';

describe('src/components/ErrorView', () => {
    it('should render Errorview correctly', () => {
        const { container } = render(<ErrorView />);

        expect(container).toMatchSnapshot();
    });

    it('should render Errorview correctly with full height', () => {
        const { container } = render(<ErrorView fullHeight />);

        expect(container).toMatchSnapshot();
        expect(screen.getByTestId('errorview')).toHaveClass('errorView--full');
    });
});
