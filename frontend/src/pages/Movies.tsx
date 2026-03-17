import { useState } from 'react'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import MoviesContainer from '../components/MoviesContainer'
import FilterItem from '../components/FilterItem'
import { SMALL_CARDS } from '../data/mockData'

// Generate more items for pagination demonstration
const ALL_MOVIES = Array.from({ length: 36 }).map((_, index) => ({
    ...SMALL_CARDS[index % SMALL_CARDS.length],
    id: index + 1 // Ensure unique IDs
}))

export default function Movies() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const totalPages = Math.ceil(ALL_MOVIES.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentMovies = ALL_MOVIES.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <section className="mt-10">
            <div className="">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Movies</h1>
                    <p className="text-gray-400">{ALL_MOVIES.length} Movies</p>
                </div>
                {/* Line */}
                <div className="w-full h-1 bg-gray-200 mt-2"></div>
            </div>
            {/* Filters */}
            <div className='w-full h-10 mt-3'>
                <form action="" className="flex items-center justify-between mx-5">
                    <FilterItem name="Type" options={["Movie", "Series", "TV Show"]} />
                    <FilterItem name='Genre' options={["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]} />
                    <FilterItem name='Country' options={["USA", "Mongolia", "Japan"]} />
                    <FilterItem name='IMDB Rating' options={["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-10"]} />
                    <FilterItem name='Movie Rating' options={["G", "PG", "PG-13", "R", "NC-17"]} />
                    <button type="submit">Хайх</button>
                </form>
            </div>
            <div className="mt-10">
                <MoviesContainer movies={currentMovies} />
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-2 pb-10">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 h-10 flex items-center justify-center rounded-md transition-colors ${currentPage === 1
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                    >
                        <GrPrevious />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${currentPage === page
                                ? 'bg-primary-color text-white'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 h-10 flex items-center justify-center rounded-md transition-colors ${currentPage === totalPages
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                    >
                        <GrNext />
                    </button>
                </div>
            )}
        </section>
    )
}