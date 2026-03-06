import SectionHeader from '../components/SectionHeader'
import MoviesContainer from '../components/MoviesContainer'
import { CiBookmark } from "react-icons/ci";
import { CgPlayButton } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";



import big from '../assets/images/big.png'
import small from '../assets/images/small.png'

const SMALL_CARDS = [
    { id: 1, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 2, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 3, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 20023, duration: "87", imageUrl: small },
    { id: 4, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 5, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 6, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 7, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 20023, duration: "87", imageUrl: small },
    { id: 8, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 9, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 10, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 11, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 12, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
]

const MOVIE_DETAIL = {
    id: 1,
    title: "Game of Thrones",
    description: "Lorem ipsum something. This is small Description for small movie card.Lorem ipsum something. This is small Description for small movie card.Lorem ipsum something. This is small Description for small movie card.",
    genres: ["Хүүхдийн", "Адал явдалт"],
    productions: ["AGBO", "Cinestar Pictures", "Big Indie Pictures"],
    countries: ["Canada", "France", "Italy"],
    casts: ["Kanna Hashimoto", "Gordon Maeda", "Marin Honda", "Kaito Sakurai", "Seira Anzai"],
    releaseYear: 2025,
    duration: "90",
    resolution: "HD",
    rating: "R",
    imdbRating: 8.5,
    communityRating: 4,
    trailer: "https://www.youtube.com/watch?v=i6w7O1kwuBk",
    comments: [
        {
            id: 1,
            username: "John Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 5,
            createdAt: "2025-01-01"
        },
        {
            id: 2,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        }
    ],
    primeColor: "blue",
    smallImg: small,
    bigImg: big
}

export default function MovieDetails() {
    return (
        <div>
            {/* Киноны дэлгэрэнгүй мэдээлэл */}
            <section className='flex w-full h-[500px] justify-center items-center gap-2'>
                <div
                    className="absolute w-screen h-[500px] z-[-1] right-0 overflow-hidden"
                    style={{ backgroundColor: MOVIE_DETAIL.primeColor }}
                >
                    <img
                        src={MOVIE_DETAIL.bigImg}
                        alt="banner"
                        className="absolute w-[70%] right-0 top-0 object-cover"
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse at 110% 0% , transparent 20%, ${MOVIE_DETAIL.primeColor} 50%)`,
                        }}
                    />
                </div>
                <div className='flex gap-10'>
                    <div className="flex flex-col items-center justify-center w-[20%] h-full gap-2">
                        <img src={MOVIE_DETAIL.smallImg} alt="poster" className='w-full  object-cover border rounded-2xl' />
                        <div className="flex w-full items-center justify-center flex-wrap gap-2">
                            {MOVIE_DETAIL.casts.map((cast, index) => (
                                <p key={index} className="text-[8px]">
                                    {cast}
                                    {index !== MOVIE_DETAIL.casts.length - 1 && " |"}
                                </p>
                            ))}
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>{MOVIE_DETAIL.communityRating}</span> <span>⭐️</span>
                        </div>
                    </div>
                    <article className='w-[80%] flex flex-col gap-2 justify-center'>
                        <h1 className='mb-10 text-5xl'>{MOVIE_DETAIL.title}</h1>
                        <ul className='flex gap-10'>
                            <li>{MOVIE_DETAIL.resolution}</li>
                            <li>{MOVIE_DETAIL.rating}</li>
                            <li>{MOVIE_DETAIL.releaseYear}</li>
                            <li>{MOVIE_DETAIL.duration} min</li>
                            <li>IMDB {MOVIE_DETAIL.imdbRating}</li>
                        </ul>
                        <div>
                            <ul className='flex gap-2'>
                                {MOVIE_DETAIL.genres.map((genre, index) => (
                                    <li key={index} className='text-[12px] text-white/50'>{genre}
                                        {index !== MOVIE_DETAIL.genres.length - 1 && " / "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p>{MOVIE_DETAIL.description}</p>
                        <div className='flex gap-5 items-center mt-5'>
                            <button className='flex items-center gap-2'>
                                <CgPlayButton className='text-2xl' />
                                PLAY
                            </button>
                            <CiBookmark className='text-2xl cursor-pointer hover:text-white/50' />
                            <FaRegComment className='text-2xl cursor-pointer hover:text-white/50' />
                            <a href={`${MOVIE_DETAIL.trailer}`} target="_blank" rel="noopener noreferrer">
                                <MdLocalMovies className='text-2xl cursor-pointer hover:text-white/50' />
                            </a>
                        </div>
                    </article>
                </div>
            </section >
            {/* Санал болгох кинонууд */}
            < section className='mt-10' >
                <SectionHeader title="Санал болгох кинонууд" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section >
        </div >
    )
}