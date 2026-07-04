import type { LoginData, LoginResponse } from '../types/login';

export const loginUser = async (
  loginData: LoginData,
): Promise<LoginResponse> => {
  try {
    const data = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (!data.ok) {
      if (data.status === 400) {
        throw new Error('Invalid username or password.');
      } else {
        throw new Error('Failed to login user.');
      }
    }

    const response: LoginResponse = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong.');
  }
};
