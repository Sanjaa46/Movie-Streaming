import facebook from '../assets/images/facebook.png'
import instagram from '../assets/images/instagram.png'
import youtube from '../assets/images/youtube.png'

export default function Footer() {
    return (
        <footer className='flex flex-col w-full min-h-[200px] items-center justify-center gap-6 px-4 mt-14 py-8'>
            <ul className='flex space-x-8'>
                <li><img src={facebook} alt="Facebook" className='w-8 h-8 object-contain' /></li>
                <li><img src={instagram} alt="Instagram" className='w-8 h-8 object-contain' /></li>
                <li><img src={youtube} alt="YouTube" className='w-8 h-8 object-contain' /></li>
            </ul>
            <ul className='flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/70'>
                <li className='hover:text-white transition-colors cursor-pointer'>Нууцлалын бодлого</li>
                <li className='hover:text-white transition-colors cursor-pointer'>Үйлчилгээний нөхцөл</li>
                <li className='hover:text-white transition-colors cursor-pointer'>Тусламж</li>
            </ul>
            <p className='text-xs text-white/40 text-center'>© 2026 Movie Streaming. All rights reserved.</p>
        </footer>
    )
}