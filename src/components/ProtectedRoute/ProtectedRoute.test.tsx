import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

afterEach(() => {
  localStorage.clear();
});

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login', () => {
    localStorage.removeItem('accessToken');

    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<Outlet />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Login Page' }),
    ).toBeInTheDocument();
  });

  it('renders protected content when user is authenticated', () => {
    localStorage.setItem('accessToken', 'test-token');

    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<h1>Favorites Page</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Favorites Page' }),
    ).toBeInTheDocument();
  });
});
