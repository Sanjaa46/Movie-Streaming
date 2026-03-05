export default function MovieCardBig(
    { title, rating, duration, genre, imageUrl, resolution }: { title: string, rating: number, duration: string, genre: string, imageUrl: string, resolution: string }
) {
    return (
        <div
            className="w-full h-[600px] bg-cover bg-center  rounded-[20px] flex items-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className='flex justify-between w-[80%] mx-auto bg-[#ffffff4d] p-3 rounded-[10px] relative top-50'>
                <div>
                    <ul className='flex justify-between gap-10'>
                        <li>⭐️{rating}</li>
                        <li>{duration}</li>
                        <li>{genre}</li>
                    </ul>
                    <p className='text-4xl font-bold'>{title}</p>
                </div>
                {resolution && (
                    <div className='flex gap-5 items-center'>
                        <p className='flex items-center justify-center w-[40px] h-[40px] bg-[#151513bf] rounded-[5px]'>{resolution}</p>
                    </div>
                )}
            </div>
        </div>
    )
}