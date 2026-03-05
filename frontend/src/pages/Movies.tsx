import MoviesContainer from '../components/MoviesContainer'
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
    { id: 11, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 20023, duration: "87", imageUrl: small },
    { id: 12, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 13, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 14, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 15, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 16, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 17, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 18, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 19, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 20, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
]

export default function Movies() {
    return (
        <section className="mt-10">
            <div className="">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Movies</h1>
                    <p className="text-gray-400">12 Movies</p>
                </div>
                {/* Line */}
                <div className="w-full h-1 bg-gray-200"></div>
            </div>
            <div className="mt-10">
                <MoviesContainer movies={SMALL_CARDS} />
            </div>
        </section>
    )
}