import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { loginUser } from '../../api/loginApi';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/favorites');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username && !password) {
      setError('Please enter your username and password.');
      return;
    }

    if (!username) {
      setError('Please enter your username.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const response = await loginUser({ username, password });

      const accessToken = response.accessToken;

      localStorage.setItem('accessToken', accessToken);

      navigate('/favorites');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome back</h1>
        <p>Sign in to access your favorite products.</p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
          aria-describedby={error ? 'login-error' : undefined}
        >
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              aria-invalid={!!error}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                aria-invalid={!!error}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />

              {password && (
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              )}
            </div>
          </div>
          {error && (
            <span className={styles.error} id="login-error" role="alert">
              {error}
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
