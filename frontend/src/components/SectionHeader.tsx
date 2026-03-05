export default function SectionHeader({ title }: { title: string }) {
    return (
        <div className="relative flex w-[80%] items-center justify-between mb-2">
            <h1 className="text-2xl font-bold ml-5">{title}</h1>
            <div className="absolute w-1 h-full bg-(--primary-color) top-1/2 -translate-y-1/2"></div>
        </div>
    )
}