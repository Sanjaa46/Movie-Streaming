import logo from '../assets/images/logo.png'
import search from '../assets/images/search.png'
import { useAuth } from '../context/AuthContext'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
    const { isAuthenticated, user, logout, openLogin } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className='flex min-w-[1140px] max-w-[1440px] h-[60px] items-center px-4 justify-between mx-auto mb-10'>
            <a href="/"><img src={logo}
                alt="Logo"
                className="h-12 w-12 object-contain " />
            </a>
            <ul className='flex space-x-5 '>
                <li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>Төрөл</li>
                <li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>Кино</li>
                <li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>Цуврал</li>
                <li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>ТВ Шоу</li>
            </ul>
            <div className='relative w-[200px] bg-[#6C6C6C] flex items-center rounded-full px-2'>
                <img src={search} alt="Search" className='w-[10%]' />
                <input type="text" placeholder="Хайх..."
                    className=' outline-none bg-transparent ml-2 w-[90%] text-white text-[18px]' />
            </div>

            {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="w-9 h-9 rounded-full bg-[#FF770B] flex items-center justify-center font-bold text-white text-sm select-none">
                            {user!.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-white/80 max-w-[100px] truncate">{user!.username}</span>
                    </div>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-12 w-48 bg-[#141414] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col">
                            <div className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Continue watch</div>
                            <div className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Bookmarked</div>
                            <div className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Watched</div>
                            <div className="h-px bg-white/10 w-full" />
                            <div
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    logout();
                                }}
                                className="text-left px-4 py-3 text-sm text-[#FF770B] hover:bg-[#FF770B]/10 hover:text-[#e06800] transition-colors bg-transparent rounded-none cursor-pointer"
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <button
                        onClick={openLogin}
                        className="bg-[#FF770B] hover:bg-[#e06800] text-white text-sm px-6 py-2 rounded-lg transition-colors font-semibold"
                    >
                        Нэвтрэх
                    </button>
                </div>
            )}
        </header>
    )
}