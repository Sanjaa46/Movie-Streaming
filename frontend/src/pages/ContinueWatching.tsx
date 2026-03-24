import { useUserData } from "../context/UserDataContext";
import { Link } from "react-router-dom";
import { CgPlayButton } from "react-icons/cg";

export default function ContinueWatching() {
    const { getContinue } = useUserData();
    const entry = getContinue();

    function formatTime(secs: number) {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return h > 0
            ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
            : `${m}:${String(s).padStart(2, "0")}`;
    }

    return (
        <div className="min-h-[60vh] max-w-360 mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-white">Continue Watching</h1>

            {!entry ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-white/40 gap-4">
                    <CgPlayButton className="text-7xl" />
                    <p className="text-lg">You haven't started watching anything yet.</p>
                    <Link
                        to="/movies"
                        className="mt-2 px-6 py-2 bg-[#FF770B] hover:bg-[#e06800] text-white rounded-lg font-semibold transition-colors"
                    >
                        Browse movies
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-8 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl">
                    {/* Poster */}
                    <div className="relative w-full sm:w-52 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={entry.movie.imageUrl}
                            alt={entry.movie.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Progress overlay at bottom of poster */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                            <div
                                className="h-full bg-[#FF770B] transition-all"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        Math.round((entry.secondsWatched / entry.durationSeconds) * 100)
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center gap-4 flex-1">
                        <h2 className="text-2xl font-bold text-white">{entry.movie.title}</h2>

                        {entry.movie.description && (
                            <p className="text-white/50 text-sm line-clamp-2">{entry.movie.description}</p>
                        )}

                        {/* Progress bar */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-white/40 mb-1">
                                <span>{formatTime(entry.secondsWatched)}</span>
                                <span>{formatTime(entry.durationSeconds)}</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#FF770B] rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            Math.round((entry.secondsWatched / entry.durationSeconds) * 100)
                                        )}%`,
                                    }}
                                />
                            </div>
                            <p className="text-xs text-white/40 mt-1">
                                {Math.round((entry.secondsWatched / entry.durationSeconds) * 100)}% completed
                            </p>
                        </div>

                        <Link
                            to={`/movies/${entry.movie.id}`}
                            className="flex items-center gap-2 self-start px-6 py-2 bg-[#FF770B] hover:bg-[#e06800] text-white rounded-lg font-semibold transition-colors"
                        >
                            <CgPlayButton className="text-xl" />
                            Resume
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
