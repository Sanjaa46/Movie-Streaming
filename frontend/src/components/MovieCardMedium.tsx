export default function MovieCardMedium(
    { title, genres, rank, imageUrl }: { title: string, genres: string[], rank: number, imageUrl: string }
) {
    return (
        <div
            className="relative w-[260px] sm:w-[340px] md:w-[420px] h-[160px] sm:h-[200px] md:h-[240px] rounded-2xl p-5"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <p className="absolute text-3xl font-bold top-5 right-5">0{rank}</p>
            <p className="absolute bottom-12 left-10 italic">{genres.join(", ")}</p>
            <h2 className="absolute text-2xl font-bold bottom-5 left-10">{title}</h2>
        </div>
    )
}