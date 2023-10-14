import { render, screen } from '@testing-library/react-native';

import Game from './Game';

describe('App component', () => {
  describe('Render method', () => {
    it('should render the default text', () => {
      render(<Game />);

      const text = screen.queryByText(/Open up App\//);
      expect(text).toBeVisible();
    });
  });
});
