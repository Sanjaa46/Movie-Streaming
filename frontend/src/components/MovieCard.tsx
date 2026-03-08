import movieIcon from '../assets/images/movie-icon.png'


export default function MovieCard(
    { movie }: { movie: any }
) {
    return (
        <article className="relative w-full h-full rounded-[10px] overflow-hidden shadow-[0_5px_10px_rgba(255,255,255,0.25)] group">
            <a href={`/movies/${movie.id}`}>
                <div className="poster relative overflow-hidden">
                    <img src={movie.imageUrl} alt={movie.title}
                        className="w-full transition-all duration-500 group-hover:-translate-y-12.5 group-hover:blur-[5px]" />

                    <div className="absolute -bottom-20 left-0 w-full h-full bg-linear-to-t from-[#0e0d0d] to-transparent transition-all duration-500 z-1 group-hover:bottom-0"></div>
                </div>

                <div
                    className="details absolute left-0 -bottom-10 p-5 w-full z-2 transition-all duration-500 group-hover:bottom-10">
                    <h3 className="text-white font-bold text-[19px]">{movie.title}</h3>

                    <div className="info text-[12px]">
                        <div className="flex items-center gap-2">
                            <img src={movieIcon} alt="mov_icon" />
                            <p>{movie.releaseYear}-{movie.duration} min</p>
                        </div>
                        <p className="h-7.5 -mb-2.5 text-white text-[10px]">{movie.description}</p>
                    </div>
                </div>
            </a>
        </article >
    )
}