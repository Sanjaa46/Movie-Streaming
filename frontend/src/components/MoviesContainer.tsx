import MovieCard from "./MovieCard"

export default function MoviesContainer({ movies }: { movies: any[] }) {
    return (
        <div className="grid grid-cols-6 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}