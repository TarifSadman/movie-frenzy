import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';

test('renders user profile information', () => {
  const { getByText } = render(<Profile />);
  
  expect(getByText('Demo User')).toBeInTheDocument();
  expect(getByText('Aliquam ornare augue ac nulla')).toBeInTheDocument();
});

test('renders favorite movies', () => {
  const { getByText } = render(<Profile />);
  
  expect(getByText('Inception')).toBeInTheDocument();
  expect(getByText('The Shawshank Redemption')).toBeInTheDocument();
  expect(getByText('The Dark Knight')).toBeInTheDocument();
});

test('clicking on the back button navigates to "/movies"', () => {
  const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
  
  const { getByTestId } = render(
    <MemoryRouter>
      <Profile history={historyMock} />
    </MemoryRouter>
  );

  fireEvent.click(getByTestId('back-button'));
  
  expect(historyMock.push).toHaveBeenCalledWith('/movies');
});
