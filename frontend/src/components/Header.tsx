import logo from '../assets/images/logo.png'
import search from '../assets/images/search.png'

export default function Header() {
    return (
        <header className='flex min-w-[1140px] max-w-[1440px] h-[60px] items-center px-4 justify-between mx-auto mb-10'>
            <a href="/"><img src={logo}
                alt="Logo"
                className="h-12 w-12 object-contain " />
            </a>
            <ul className='flex space-x-5 '>
                <li>Төрөл</li>
                <li>Кино</li>
                <li>Цуврал</li>
                <li>ТВ Шоу</li>
            </ul>
            <div className='relative w-[200px] bg-[#6C6C6C] flex items-center rounded-full px-2'>
                <img src={search} alt="Search" className='w-[10%]' />
                <input type="text" placeholder="Хайх..."
                    className=' outline-none bg-transparent ml-2 w-[90%] text-white' />
            </div>
            <button>Нэвтрэх</button>
        </header>
    )
}