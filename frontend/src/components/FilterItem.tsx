
export default function FilterItem({ name, options }: { name: string, options: string[] }) {
    return (
        <select name={name.toLowerCase()} id={name} className="outline-none bg-(--background-color) grow">
            <option value="all">{name}</option>
            {options.map((option) => (
                <option key={option} value={option.toLowerCase()} className="bg-(--background-color)">{option}</option>
            ))}
        </select>
    )
}