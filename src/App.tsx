import { Header } from './components/Header';
import { Movies } from './components/Movies';
import { Footer } from './components/Footer';
import { MoviesProvider } from './contexts/movies';
import { MovieDetailsProvider } from './contexts/movie-details';
import styles from './App.module.scss';

const App = () => {
  return (
    <MoviesProvider>
      <MovieDetailsProvider>
        <div className={styles.app}>
            <Header />
            <Movies />
            <Footer />
        </div>
      </MovieDetailsProvider>
    </MoviesProvider>
  );
}

export default App;
