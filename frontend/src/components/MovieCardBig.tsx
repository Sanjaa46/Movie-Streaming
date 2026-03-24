export default function MovieCardBig(
    { title, rating, duration, genre, imageUrl, resolution }: { title: string, rating: number, duration: string, genre: string, imageUrl: string, resolution: string }
) {
    return (
        <div
            className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center rounded-[20px] flex items-end pb-6"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center w-[90%] mx-auto bg-[#ffffff4d] p-3 rounded-[10px] gap-2'>
                <div>
                    <ul className='flex gap-4 text-sm sm:text-base flex-wrap'>
                        <li>⭐️{rating}</li>
                        <li>{duration}</li>
                        <li>{genre}</li>
                    </ul>
                    <p className='text-2xl sm:text-3xl lg:text-4xl font-bold mt-1'>{title}</p>
                </div>
                {resolution && (
                    <div className='flex gap-5 items-center self-start sm:self-auto'>
                        <p className='flex items-center justify-center w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-[#151513bf] rounded-[5px] text-sm'>{resolution}</p>
                    </div>
                )}
            </div>
        </div>
    )
}