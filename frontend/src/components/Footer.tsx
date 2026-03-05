import facebook from '../assets/images/facebook.png'
import instagram from '../assets/images/instagram.png'
import youtube from '../assets/images/youtube.png'

export default function Footer() {
    return (
        <footer className='flex flex-col w-full h-[270px] items-center justify-center gap-10 px-4 mt-14 '>
            <ul className='flex space-x-10'>
                <li><img src={facebook} alt="" /></li>
                <li><img src={instagram} alt="" /></li>
                <li><img src={youtube} alt="" /></li>
            </ul>
            <ul className='flex space-x-5'>
                <li>Нууцлалын бодлого</li>
                <li>Үйлчилгээний нөхцөл</li>
                <li>Тусламж</li>
            </ul>
            <p>© 2026 Movie Streaming. All rights reserved.</p>
        </footer>
    )
}