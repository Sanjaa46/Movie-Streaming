import logo from '../assets/images/logo.png'
import { useAuth } from '../context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import GenreItem from './GenreItem'

import { CiSearch } from "react-icons/ci";

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
        <header className='flex min-w-285 max-w-360 h-15 items-center px-4 pt-4 justify-between mx-auto mb-10'>
            <a href="/"><img src={logo}
                alt="Logo"
                className="h-12 w-12 object-contain " />
            </a>
            <ul className='flex space-x-5 '>
                <li id='genre' className='relative cursor-pointer transition-colors text-[18px]'>Төрөл
                    <ul className='hidden absolute top-7 -left-12.5 w-38 items-center justify-center bg-white/20 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden z-50'>
                        <GenreItem genre="Action" />
                        <GenreItem genre="Comedy" />
                        <GenreItem genre="Drama" />
                        <GenreItem genre="Thriller" />
                        <GenreItem genre="Horror" />
                        <GenreItem genre="Romance" />
                        <GenreItem genre="Animation" />
                        <GenreItem genre="Adventure" />
                        <GenreItem genre="Fantasy" />
                        <GenreItem genre="Sci-Fi" />
                        <GenreItem genre="Mystery" />
                        <GenreItem genre="Crime" />
                        <GenreItem genre="Biography" />
                        <GenreItem genre="History" />
                        <GenreItem genre="Family" />
                        <GenreItem genre="Musical" />
                    </ul>
                </li>
                <a href="/movies?type=movie"><li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>Кино</li></a>
                <a href="/movies?type=series"><li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>Цуврал</li></a>
                <a href="/movies?type=tv-show"><li className='cursor-pointer hover:text-[#FF770B] transition-colors text-[18px]'>ТВ Шоу</li></a>
            </ul>
            <form className='relative w-50 bg-[#6C6C6C] flex items-center rounded-full px-2' action={`/movies`} method="GET">
                <CiSearch className='text-[24px]' />
                <input type="text" name="q" placeholder="Хайх..."
                    className=' outline-none bg-transparent ml-2 w-[90%] text-white text-[18px]' />
            </form>

            {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="w-9 h-9 rounded-full bg-[#FF770B] flex items-center justify-center font-bold text-white text-sm select-none">
                            {user!.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-white/80 max-w-25 truncate">{user!.username}</span>
                    </div>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-12 w-48 bg-[#141414] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col">
                            <button className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Continue watch</button>
                            <button className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Bookmarked</button>
                            <button className="text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors bg-transparent rounded-none cursor-pointer">Watched</button>
                            <div className="h-px bg-white/10 w-full" />
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    logout();
                                }}
                                className="text-left px-4 py-3 text-sm text-[#FF770B] hover:bg-[#FF770B]/10 hover:text-[#e06800] transition-colors bg-transparent rounded-none cursor-pointer"
                            >
                                Logout
                            </button>
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
            )
            }
        </header >
    )
}