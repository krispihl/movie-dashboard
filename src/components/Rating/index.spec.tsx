import { Rating } from "./index";
import { render } from '@testing-library/react';

describe('src/components/Rating', () => {
    it('should render 0 Rating correctly', async () => {
        const { container } = render(<Rating rating={0} />);

        const icons = Array.from(document.querySelectorAll('.material-icons'));

        icons.map(icon => {
            expect(icon).toHaveTextContent('star_outline');
        })

        expect(container).toMatchSnapshot();
    });

    it('should render 5 Rating correctly', async () => {
        const { container } = render(<Rating rating={5} />);

        const icons = document.querySelectorAll('.material-icons');

        expect(icons[0]).toHaveTextContent('star');
        expect(icons[1]).toHaveTextContent('star');
        expect(icons[2]).toHaveTextContent('star_half');
        expect(icons[3]).toHaveTextContent('star_outline');
        expect(icons[4]).toHaveTextContent('star_outline');

        expect(container).toMatchSnapshot();
    });

    it('should render 10 Rating correctly', async () => {
        const { container } = render(<Rating rating={10} />);

        const icons = Array.from(document.querySelectorAll('.material-icons'));

        icons.map(icon => {
            expect(icon).toHaveTextContent('star');
        })

        expect(container).toMatchSnapshot();
    })
});
