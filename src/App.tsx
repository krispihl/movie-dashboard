import { useEffect, useState } from 'react';
import { Config } from './types';
import { Header } from './components/Header';
import { Movies } from './components/Movies';
import { Footer } from './components/Footer';
import { MoviesProvider } from './contexts/movies';
import { MovieDetailsProvider } from './contexts/movie-details';
import styles from './App.module.scss';

const App = () => {
  const [config, setConfig] = useState({} as Config);

  useEffect(() => {
      const fetchConfig = async () => {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`);
              const json = await response.json();
              setConfig(json.images);
          } catch (error) {
              console.log('There was an error', error);
          }
      }
      fetchConfig();
  }, []);

  return (
    <MoviesProvider>
      <MovieDetailsProvider>
        <div className={styles.app}>
            <Header />
            <Movies config={config} />
            <Footer />
        </div>
      </MovieDetailsProvider>
    </MoviesProvider>
  );
}

export default App;
