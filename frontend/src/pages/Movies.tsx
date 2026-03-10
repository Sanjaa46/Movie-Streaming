import MoviesContainer from '../components/MoviesContainer'
import FilterItem from '../components/FilterItem'
import { SMALL_CARDS } from '../data/mockData'

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
                <MoviesContainer movies={SMALL_CARDS} />
            </div>
        </section>
    )
}