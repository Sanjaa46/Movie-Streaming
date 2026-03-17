// Import the assets here so all pages use the correct path
import big from '../assets/images/big.png'
import small from '../assets/images/small.png'
import tmpVideo from "../assets/videos/tmp.mp4"

// Type Definitions (optional, but good for autocomplete)
export interface Comment {
    id: number;
    username: string;
    comment: string;
    rating: number;
    createdAt: string;
}

export interface MovieDetail {
    id: number;
    title: string;
    description: string;
    genres: string[];
    productions: string[];
    countries: string[];
    casts: string[];
    releaseYear: number;
    duration: string;
    resolution: string;
    rating: string;
    imdbRating: number;
    communityRating: number;
    trailer: string;
    comments: Comment[];
    primeColor: string;
    smallImg: string;
    bigImg: string;
    videoUrl?: string;
}

export interface MovieCard {
    id: number;
    title: string;
    description?: string;
    releaseYear?: number;
    duration?: string;
    imageUrl: string;
    genres?: string[];
    rank?: number;
    rating?: number;
    resolution?: string;
}

// Data Exports

export const SLIDES = [0, 1, 2];

export const MEDIUM_CARDS: MovieCard[] = [
    { id: 101, title: "Frozen", genres: ["Хүүхдийн", "Адал явдалт"], rank: 1, imageUrl: big },
    { id: 102, title: "Inception", genres: ["Sci-Fi", "Триллер"], rank: 2, imageUrl: big },
    { id: 103, title: "The Lion King", genres: ["Хүүхдийн", "Дуурь"], rank: 3, imageUrl: big },
    { id: 104, title: "Interstellar", genres: ["Sci-Fi", "Драм"], rank: 4, imageUrl: big },
    { id: 105, title: "Avengers", genres: ["Үйлдэлт", "Адал явдалт"], rank: 5, imageUrl: big },
    { id: 106, title: "The Dark Knight", genres: ["Үйлдэлт", "Гэмт хэрэг"], rank: 6, imageUrl: big },
];

export const SMALL_CARDS: MovieCard[] = [
    { id: 1, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 2, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 3, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2023, duration: "87", imageUrl: small },
    { id: 4, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 5, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 6, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 7, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2023, duration: "87", imageUrl: small },
    { id: 8, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
    { id: 9, title: "Collapse", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2025, duration: "90", imageUrl: small },
    { id: 10, title: "Archer", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2003, duration: "120", imageUrl: small },
    { id: 11, title: "Dark Knight", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2023, duration: "87", imageUrl: small },
    { id: 12, title: "The Lion King", description: "Lorem ipsum something. This is small Description for small movie card.", releaseYear: 2010, duration: "62", imageUrl: small },
];

export const MOVIE_DETAIL: MovieDetail = {
    id: 1,
    title: "Game of Thrones",
    description: "Lorem ipsum something. This is small Description for small movie card.Lorem ipsum something. This is small Description for small movie card.Lorem ipsum something. This is small Description for small movie card.",
    genres: ["Хүүхдийн", "Адал явдалт"],
    productions: ["AGBO", "Cinestar Pictures", "Big Indie Pictures"],
    countries: ["Canada", "France", "Italy"],
    casts: ["Kanna Hashimoto", "Gordon Maeda", "Marin Honda", "Kaito Sakurai", "Seira Anzai"],
    releaseYear: 2025,
    duration: "90",
    resolution: "HD",
    rating: "R",
    imdbRating: 8.5,
    communityRating: 4,
    trailer: "https://www.youtube.com/watch?v=i6w7O1kwuBk",
    comments: [
        {
            id: 1,
            username: "John Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 5,
            createdAt: "2025-01-01"
        },
        {
            id: 2,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        },
        {
            id: 3,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        },
        {
            id: 4,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        },
        {
            id: 5,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        },
        {
            id: 6,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        },
        {
            id: 7,
            username: "Smith Doe",
            comment: "Lorem ipsum something. This is comment for movie card.",
            rating: 3,
            createdAt: "2025-01-01"
        }
    ],
    primeColor: "#1E1B1B",
    smallImg: small,
    bigImg: big,
    videoUrl: tmpVideo
};
