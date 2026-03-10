
export default function FilterItem({ name, options }: { name: string, options: string[] }) {
    return (
        <select name={name.toLowerCase()} id={name} className="outline-none">
            <option value="all">{name}</option>
            {options.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
            ))}
        </select>
    )
}