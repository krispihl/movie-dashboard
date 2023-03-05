import { Header } from './components/Header';
import { Movies } from './components/Movies';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MoviesProvider } from './contexts/movies';
import { MovieDetailsProvider } from './contexts/movie-details';
import styles from './App.module.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <MoviesProvider>
        <MovieDetailsProvider>
          <div className={styles.app}>
              <Header />
              <Movies />
              <Footer />
          </div>
        </MovieDetailsProvider>
      </MoviesProvider>
    </ErrorBoundary>
  );
}

export default App;
