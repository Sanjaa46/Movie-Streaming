import SectionHeader from '../components/SectionHeader'
import MoviesContainer from '../components/MoviesContainer'
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
]

const MOVIE_DETAIL = {
    id: 1,
    title: "Collapse",
    description: "Lorem ipsum something. This is small Description for small movie card.",
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
                <div>
                    <div className="flex flex-col items-center w-[30%] h-full gap-2">
                        <img src={MOVIE_DETAIL.smallImg} alt="poster" className='w-full  object-cover border rounded-2xl' />
                        <div className="flex w-full gap-2 ">
                            {MOVIE_DETAIL.casts.map((cast, index) => (
                                <p key={index} className='text-[8px]'>{cast} |</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Санал болгох кинонууд */}
            <section>
                <SectionHeader title="Санал болгох кинонууд" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section>
        </div>
    )
}