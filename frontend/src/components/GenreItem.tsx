export default function GenreItem({ genre }: { genre: string }) {
    return (
        <a href={`/movies?genre=${genre}`} className='cursor-pointer'>
            <li className='hover:text-[#FF770B] transition-colors text-[18px]'>{genre}</li>
        </a>
    )
}