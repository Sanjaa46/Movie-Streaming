import logo from '../assets/logo.png'
import search from '../assets/search.png'

export default function Header() {
    return (
        <header className='flex w-full h-[60px] items-center px-4 justify-between px-[40px]'>
            <img src={logo} 
            alt="Logo" 
            className="h-12 w-12 object-contain " />
            <ul className='flex space-x-5'>
                <li>Төрөл</li>
                <li>Кино</li>
                <li>Цуврал</li>
                <li>ТВ Шоу</li>
            </ul>
            <div className='relative w-[200px] bg-black'>
                <img src={search} alt="Search" className='absolute w-6'/>
                <input type="text" placeholder="Хайх..."
                className='' />
            </div>
            <button>Нэвтрэх</button>
        </header>
    )
}