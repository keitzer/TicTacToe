import { render, screen } from '@testing-library/react-native';

import GameBoard from './GameBoard';

describe('App component', () => {
  describe('Render method', () => {
    it('should render the default text', () => {
      render(<GameBoard />);

      const text = screen.queryByText(/Open up App\//);
      expect(text).toBeVisible();
    });
  });
});
