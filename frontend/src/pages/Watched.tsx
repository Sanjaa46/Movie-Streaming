import { useState } from "react";
import { useUserData } from "../context/UserDataContext";
import { Link } from "react-router-dom";
import { MdOutlineLocalMovies } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import type { MovieCard } from "../data/mockData";

export default function Watched() {
    const { getWatched, removeWatched } = useUserData();
    const [movies, setMovies] = useState<MovieCard[]>(() => getWatched());

    function handleRemove(movieId: number) {
        removeWatched(movieId);
        setMovies((prev) => prev.filter((m) => m.id !== movieId));
    }

    return (
        <div className="min-h-[60vh] max-w-360 mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-white">Watched</h1>

            {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-white/40 gap-4">
                    <MdOutlineLocalMovies className="text-7xl" />
                    <p className="text-lg">You haven't marked any movies as watched yet.</p>
                    <Link
                        to="/movies"
                        className="mt-2 px-6 py-2 bg-[#FF770B] hover:bg-[#e06800] text-white rounded-lg font-semibold transition-colors"
                    >
                        Browse movies
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative group">
                            <a href={`/movies/${movie.id}`}>
                                <article className="relative rounded-[10px] overflow-hidden shadow-[0_5px_10px_rgba(255,255,255,0.15)] group cursor-pointer">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={movie.imageUrl}
                                            alt={movie.title}
                                            className="w-full transition-all duration-500 group-hover:-translate-y-10 group-hover:blur-[3px]"
                                        />
                                        {/* Watched checkmark overlay */}
                                        <div className="absolute top-2 left-2 z-20 bg-[#FF770B] rounded-full w-6 h-6 flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">✓</span>
                                        </div>
                                        <div className="absolute -bottom-20 left-0 w-full h-full bg-gradient-to-t from-[#0e0d0d] to-transparent transition-all duration-500 z-10 group-hover:bottom-0" />
                                    </div>
                                    <div className="absolute left-0 -bottom-10 p-3 w-full z-20 transition-all duration-500 group-hover:bottom-6">
                                        <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                                        {movie.releaseYear && (
                                            <p className="text-white/50 text-xs mt-1">{movie.releaseYear}</p>
                                        )}
                                    </div>
                                </article>
                            </a>
                            {/* Remove from watched button */}
                            <button
                                onClick={() => handleRemove(movie.id)}
                                title="Remove from watched"
                                className="absolute top-2 right-2 z-30 p-1.5 bg-black/60 hover:bg-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                                <IoClose className="text-white text-base" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
