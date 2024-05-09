import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MainPage from './MainPage';

describe('MainPage Component', () => {
  test('renders without crashing', () => {
    render(<MainPage />);
  });

  test('initial state is set correctly', () => {
    render(<MainPage />);
    expect(screen.queryByTestId('search-input').value).toBe('');
    expect(screen.queryByTestId('search-results')).toBeNull();
    expect(screen.queryByTestId('loading-indicator')).toBeNull();
  });

  test('typing in search input updates search value state', () => {
    render(<MainPage />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });
    expect(screen.queryByTestId('search-input').value).toBe('test');
  });

  test('typing in search input triggers search request', async () => {
    render(<MainPage />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });
    await waitFor(() => expect(screen.queryByTestId('search-results')).not.toBeNull());
  });

  test('genre picker function returns correct genre list', () => {
    const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];
    const genre_ids = [1, 2];
    const mainPage = render(<MainPage />);
    const { result } = mainPage;
    const genreList = result.current.pickGenre(genre_ids);
    expect(genreList).toEqual(['Action', 'Comedy']);
  });
});
