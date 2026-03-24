import logo from '../assets/images/logo.png'
import { useAuth } from '../context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GenreItem from './GenreItem'
import { CiSearch } from "react-icons/ci"
import { HiMenu, HiX } from "react-icons/hi"

export default function Header() {
    const { isAuthenticated, user, logout, openLogin } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
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
        <header className='w-full max-w-360 mx-auto px-4 pt-4 mb-6'>
            {/* Main row */}
            <div className='flex h-15 items-center justify-between'>
                {/* Logo */}
                <a href="/"><img src={logo} alt="Logo" className="h-12 w-12 object-contain" /></a>

                {/* Desktop nav */}
                <ul className='hidden md:flex space-x-5'>
                    <li id='genre' className='relative cursor-pointer transition-colors text-[18px] group'>Төрөл
                        <ul className='hidden group-hover:flex flex-col absolute top-7 -left-12.5 w-38 bg-white/20 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden z-50'>
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

                {/* Desktop search */}
                <form className='hidden md:flex relative w-50 bg-[#6C6C6C] items-center rounded-full px-2' action={`/movies`} method="GET">
                    <CiSearch className='text-[24px]' />
                    <input type="text" name="q" placeholder="Хайх..."
                        className='outline-none bg-transparent ml-2 w-[90%] text-white text-[18px]' />
                </form>

                {/* Right: auth + mobile hamburger */}
                <div className='flex items-center gap-3'>
                    {/* Auth area */}
                    {isAuthenticated ? (
                        <div className="relative" ref={menuRef}>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <div className="w-9 h-9 rounded-full bg-[#FF770B] flex items-center justify-center font-bold text-white text-sm select-none">
                                    {user!.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block text-sm text-white/80 max-w-25 truncate">{user!.username}</span>
                            </div>
                            {isMenuOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-[#141414] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 flex flex-col">
                                    <Link to="/user/continue" onClick={() => setIsMenuOpen(false)} className="block text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Continue watch</Link>
                                    <Link to="/user/bookmarked" onClick={() => setIsMenuOpen(false)} className="block text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Bookmarked</Link>
                                    <Link to="/user/watched" onClick={() => setIsMenuOpen(false)} className="block text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Watched</Link>
                                    <div className="h-px bg-white/10 w-full" />
                                    <button onClick={() => { setIsMenuOpen(false); logout(); }}
                                        className="text-left px-4 py-3 text-sm text-[#FF770B] hover:bg-[#FF770B]/10 transition-colors bg-transparent rounded-none cursor-pointer">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={openLogin}
                            className="bg-[#FF770B] hover:bg-[#e06800] text-white text-sm px-4 py-2 rounded-lg transition-colors font-semibold">
                            Нэвтрэх
                        </button>
                    )}

                    {/* Hamburger — mobile only */}
                    <button className='md:hidden text-white text-2xl' onClick={() => setIsMobileNavOpen(v => !v)}>
                        {isMobileNavOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile nav drawer */}
            {isMobileNavOpen && (
                <div className='md:hidden flex flex-col gap-3 py-4 border-t border-white/10 mt-2'>
                    {/* Mobile search */}
                    <form className='flex items-center bg-[#6C6C6C] rounded-full px-3 py-1' action={`/movies`} method="GET">
                        <CiSearch className='text-[20px]' />
                        <input type="text" name="q" placeholder="Хайх..."
                            className='outline-none bg-transparent ml-2 flex-1 text-white text-[16px]' />
                    </form>
                    <a href="/movies?type=movie" onClick={() => setIsMobileNavOpen(false)} className='text-[18px] hover:text-[#FF770B] transition-colors py-1'>Кино</a>
                    <a href="/movies?type=series" onClick={() => setIsMobileNavOpen(false)} className='text-[18px] hover:text-[#FF770B] transition-colors py-1'>Цуврал</a>
                    <a href="/movies?type=tv-show" onClick={() => setIsMobileNavOpen(false)} className='text-[18px] hover:text-[#FF770B] transition-colors py-1'>ТВ Шоу</a>
                    <details className='py-1'>
                        <summary className='text-[18px] cursor-pointer list-none hover:text-[#FF770B] transition-colors'>Төрөл</summary>
                        <div className='mt-2 flex flex-wrap gap-2 pl-2'>
                            {["Action","Comedy","Drama","Thriller","Horror","Romance","Animation","Adventure","Fantasy","Sci-Fi","Mystery","Crime","Biography","History","Family","Musical"].map(g => (
                                <a key={g} href={`/movies?genre=${g}`} onClick={() => setIsMobileNavOpen(false)}
                                    className='text-sm bg-white/10 hover:bg-[#FF770B] px-3 py-1 rounded-full transition-colors'>
                                    {g}
                                </a>
                            ))}
                        </div>
                    </details>
                </div>
            )}
        </header>
    )
}