import { Movie } from '../types';

export const recursiveFetch = async (url: string, page = 1, resonseData = [] as Movie[]): Promise<Movie[]> => {
    return await fetch(`${url}&page=${page}`)
        .then(response => response.json())
        .then(newResponse => {
            const response: Movie[] = [...resonseData, ...newResponse.results];

            // 1 page fetches 20 movies, let's fetch 10 batches = 200 most popular movies
            if (page < 10) {
                page++;

                return recursiveFetch(url, page, response);
            }

            return response;
        }
    );
};
