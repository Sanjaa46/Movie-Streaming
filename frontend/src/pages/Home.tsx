import { useRef, useState } from "react"
import MovieCardBig from "../components/MovieCardBig"
import MovieCardMedium from "../components/MovieCardMedium"
import MoviesContainer from "../components/MoviesContainer"
import SectionHeader from "../components/SectionHeader"
import { SLIDES, MEDIUM_CARDS, SMALL_CARDS } from "../data/mockData"
import big from '../assets/images/big.png'

export default function Home() {
    const [current, setCurrent] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        startX.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0)
        scrollLeft.current = sliderRef.current?.scrollLeft ?? 0
        if (sliderRef.current) sliderRef.current.style.cursor = "grabbing"
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        e.preventDefault()
        const x = e.pageX - (sliderRef.current?.offsetLeft ?? 0)
        const walk = x - startX.current
        if (sliderRef.current) sliderRef.current.scrollLeft = scrollLeft.current - walk
    }

    const onMouseUp = () => {
        isDragging.current = false
        if (sliderRef.current) sliderRef.current.style.cursor = "grab"
    }

    return (
        <div className="flex flex-col gap-15">
            {/* Movie big item Section */}
            <section className="relative w-full overflow-hidden">
                {/* Slides track */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {SLIDES.map((_, i) => (
                        <div key={i} className="min-w-full">
                            <MovieCardBig title="Frozen" rating={7} duration="120 min" genre="Хүүхдийн" imageUrl={big} resolution="HD" />
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {SLIDES.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
                        />
                    ))}
                </div>
            </section>

            {/* Most Viewed Movies section */}
            <section>
                <SectionHeader title="Их үзэлттэй" />

                {/* Horizontally scrollable slider — drag with cursor */}
                <div
                    ref={sliderRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    className="flex gap-4 overflow-x-auto px-5 pb-2 select-none"
                    style={{ scrollbarWidth: "none", cursor: "grab" }}
                >
                    {MEDIUM_CARDS.map((card) => (
                        <div key={card.rank} className="shrink-0">
                            <MovieCardMedium
                                title={card.title}
                                genres={card.genres || []}
                                rank={card.rank || 0}
                                imageUrl={card.imageUrl}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Movie Small Items */}
            <section>
                <SectionHeader title="Шинээр нэмэгдсэн кинонууд" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section>
            <section>
                <SectionHeader title="Шинээр нэмэгдсэн цувралууд" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section>
            <section>
                <SectionHeader title="Шинээр нэмэгдсэн ТВ шоу" />
                <MoviesContainer movies={SMALL_CARDS} />
            </section>

        </div>
    )
}