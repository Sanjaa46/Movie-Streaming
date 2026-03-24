import SectionHeader from '../components/SectionHeader'
import MoviesContainer from '../components/MoviesContainer'
import Comments from '../components/Comments';
import { useState } from 'react';
import { CiBookmark } from "react-icons/ci";
import { CgPlayButton } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import VideoPlayer from '../components/VideoPlayer'
import { SMALL_CARDS, MOVIE_DETAIL } from '../data/mockData'

export default function MovieDetails() {
    const [showComments, setShowComments] = useState(false);
    const [descExpanded, setDescExpanded] = useState(false);

    // Default to the first season and first episode if it's a series
    const [selectedSeason, setSelectedSeason] = useState(MOVIE_DETAIL.seasons?.[0]);
    const [selectedEpisode, setSelectedEpisode] = useState(MOVIE_DETAIL.seasons?.[0]?.episodes[0]);

    function watchMovie() {
        const player = document.getElementById("movie-player")
        player?.classList.remove("hidden")
        player?.classList.add("flex")
        player?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <div>
            <div id='movie-player' className='hidden justify-center w-full my-6 px-4'>
                <VideoPlayer src={(MOVIE_DETAIL.isSeries ? selectedEpisode?.videoUrl : MOVIE_DETAIL.videoUrl) || ""} />
            </div>

            {/* Киноны дэлгэрэнгүй мэдээлэл */}
            <section className='relative flex w-full min-h-[500px] justify-center items-center py-8 px-4 gap-2 rounded-2xl overflow-hidden'>
                {/* Background layer */}
                <div
                    className="absolute inset-0 z-[-1] overflow-hidden"
                    style={{ backgroundColor: MOVIE_DETAIL.primeColor }}
                >
                    <img
                        src={MOVIE_DETAIL.bigImg}
                        alt="banner"
                        className="absolute w-[70%] right-0 top-0 h-full object-cover max-[950px]:hidden"
                    />
                    <div
                        className="absolute inset-0 max-[650px]:hidden"
                        style={{
                            background: `radial-gradient(ellipse at 110% 0% , transparent 20%, ${MOVIE_DETAIL.primeColor} 50%)`,
                        }}
                    />
                </div>

                {/* Content */}
                <div className='flex flex-col min-[650px]:flex-row gap-6 min-[650px]:gap-10 w-full max-w-360 mx-auto'>
                    {/* Poster column */}
                    <div className="flex flex-col items-center gap-2 min-[650px]:w-[20%] min-[650px]:justify-center">
                        <img
                            src={MOVIE_DETAIL.smallImg}
                            alt="poster"
                            className='w-28 sm:w-36 min-[950px]:w-full object-cover border rounded-2xl flex-shrink-0'
                        />
                        {/* Rating — always visible below poster */}
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>{MOVIE_DETAIL.communityRating}</span> <span>⭐️</span>
                        </div>
                        {/* Casts — only visible at 1250px+ */}
                        <div className="hidden min-[650px]:flex w-full items-center justify-center flex-wrap gap-2">
                            {MOVIE_DETAIL.casts.map((cast, index) => (
                                <p key={index} className="text-[8px]">
                                    {cast}
                                    {index !== MOVIE_DETAIL.casts.length - 1 && " |"}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Info column */}
                    <article className='flex-1 flex flex-col gap-2 justify-center'>
                        <h1 className='mb-4 min-[1250px]:mb-10 text-3xl sm:text-4xl min-[1250px]:text-5xl font-bold'>{MOVIE_DETAIL.title}</h1>
                        <ul className='flex flex-wrap gap-4 min-[1250px]:gap-10 text-sm min-[1250px]:text-base'>
                            <li>{MOVIE_DETAIL.resolution}</li>
                            <li>{MOVIE_DETAIL.rating}</li>
                            <li>{MOVIE_DETAIL.releaseYear}</li>
                            <li>{MOVIE_DETAIL.duration} min</li>
                            <li>IMDB {MOVIE_DETAIL.imdbRating}</li>
                        </ul>
                        <div>
                            <ul className='flex gap-2 flex-wrap'>
                                {MOVIE_DETAIL.genres.map((genre, index) => (
                                    <li key={index} className='text-[12px] text-white/50'>{genre}
                                        {index !== MOVIE_DETAIL.genres.length - 1 && " / "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={descExpanded ? '' : 'max-[950px]:line-clamp-3'}>
                                {MOVIE_DETAIL.description}
                            </p>
                            <a
                                onClick={() => setDescExpanded(v => !v)}
                                className="hidden max-[950px]:block text-[#FF770B] text-sm mt-1 hover:underline cursor-pointer"
                            >
                                {descExpanded ? 'Less' : '...more'}
                            </a>
                        </div>
                        <div className='flex flex-wrap gap-4 items-center mt-4'>
                            <button className='flex items-center gap-2' onClick={watchMovie}>
                                <CgPlayButton className='text-2xl' />
                                PLAY
                            </button>
                            <CiBookmark className='text-2xl cursor-pointer hover:text-white/50' />
                            <FaRegComment className='text-2xl cursor-pointer hover:text-white/50' onClick={() => setShowComments(true)} />
                            {showComments && <Comments comments={MOVIE_DETAIL.comments} onClose={() => setShowComments(false)} />}
                            <a href={`${MOVIE_DETAIL.trailer}`} target="_blank" rel="noopener noreferrer">
                                <MdLocalMovies className='text-2xl cursor-pointer hover:text-white/50' />
                            </a>
                        </div>
                    </article>
                </div>
            </section>

            {/* Эпизодууд / Episodes (Only visible for series) */}
            {MOVIE_DETAIL.isSeries && MOVIE_DETAIL.seasons && (
                <section className='mt-10 px-4 max-w-5xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl sm:text-2xl font-bold'>Ангиуд</h2>
                        <select 
                            className='bg-[#1E1B1B] border border-white/20 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 outline-none text-white cursor-pointer'
                            value={selectedSeason?.id}
                            onChange={(e) => {
                                const season = MOVIE_DETAIL.seasons?.find(s => s.id === Number(e.target.value));
                                setSelectedSeason(season);
                                setSelectedEpisode(season?.episodes[0]);
                            }}
                        >
                            {MOVIE_DETAIL.seasons.map(season => (
                                <option key={season.id} value={season.id}>
                                    Улирал {season.seasonNumber}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {selectedSeason?.episodes.map(episode => (
                            <div 
                                key={episode.id}
                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${selectedEpisode?.id === episode.id ? 'bg-[#FF770B]/20 border border-[#FF770B]/50' : 'bg-white/5 hover:bg-white/10'}`}
                                onClick={() => {
                                    setSelectedEpisode(episode);
                                    watchMovie();
                                }}
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='text-3xl font-bold text-white/20 w-10 text-center'>{episode.episodeNumber}</div>
                                    <div className='flex flex-col'>
                                        <h3 className={`text-sm sm:text-base font-medium ${selectedEpisode?.id === episode.id ? 'text-[#FF770B]' : 'text-white'}`}>{episode.title}</h3>
                                        <span className='text-xs text-white/50'>{episode.duration}</span>
                                    </div>
                                </div>
                                <CgPlayButton className={`text-3xl ${selectedEpisode?.id === episode.id ? 'text-[#FF770B]' : 'text-white/30'}`} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Санал болгох кинонууд */}
            <section className='mt-10 px-4'>
                <SectionHeader title="Санал болгох кинонууд" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section>
        </div>
    )
}
