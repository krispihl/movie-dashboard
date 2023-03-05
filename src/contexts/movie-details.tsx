import { createContext, useContext, useState } from 'react';

export type MovieDetailsContextProps = {
    showMovieDetails: number;
    setShowMovieDetails: React.Dispatch<React.SetStateAction<number>>;
    activeRow: number;
    setActiveRow: React.Dispatch<React.SetStateAction<number>>;
    backDropSpacing: string,
    setBackDropSpacing: React.Dispatch<React.SetStateAction<string>>;
    videoEmbedId: string;
    setVideoEmbedId: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
    children: React.ReactNode;
};

export const MovieDetailsContext = createContext<MovieDetailsContextProps>({
    showMovieDetails: 0,
    setShowMovieDetails: () => 0,
    activeRow: 0,
    setActiveRow: () => 0,
    backDropSpacing: '',
    setBackDropSpacing: () => '',
    videoEmbedId: '',
    setVideoEmbedId: () => '',
});

export const MovieDetailsProvider: React.FC<Props> = ({ children }) => {
    const [showMovieDetails, setShowMovieDetails] = useState(0);
    const [activeRow, setActiveRow] = useState(0);
    const [backDropSpacing, setBackDropSpacing] = useState('');
    const [videoEmbedId, setVideoEmbedId] = useState('');

    return (
        <MovieDetailsContext.Provider value={{ showMovieDetails, setShowMovieDetails, activeRow, setActiveRow, backDropSpacing, setBackDropSpacing, videoEmbedId, setVideoEmbedId }}>
            {children}
        </MovieDetailsContext.Provider>
    );
};

export const useMovieDetails: () => MovieDetailsContextProps = () => useContext(MovieDetailsContext);