import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from './Register';

test('renders Register component', () => {
  const { getByText, getByLabelText } = render(<Register />);

  expect(getByText('Register')).toBeInTheDocument();

  expect(getByLabelText('Email')).toBeInTheDocument();
  expect(getByLabelText('Username')).toBeInTheDocument();

  expect(getByText('Register')).toBeInTheDocument();
});

test('displays error message when submitting with empty fields', () => {
  const { getByText } = render(<Register />);

  fireEvent.click(getByText('Register'));

  expect(getByText('Please fill in all fields')).toBeInTheDocument();
});

test('navigates to "/movies" on successful registration', () => {
  const { getByText, getByLabelText } = render(<Register />);
  const emailInput = getByLabelText('Email');
  const usernameInput = getByLabelText('Username');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });

  fireEvent.click(getByText('Register'));

  expect(window.location.pathname).toBe('/movies');
});
