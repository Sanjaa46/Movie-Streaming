import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, FaCog } from 'react-icons/fa';

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [resolution, setResolution] = useState("1080p");

    let hideControlsTimeout: ReturnType<typeof setTimeout>;

    // Format time helpers
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Play/Pause
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Progress bar
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
        setProgress((videoRef.current.currentTime / duration) * 100);
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const newTime = (Number(e.target.value) / 100) * duration;
        videoRef.current.currentTime = newTime;
        setProgress(Number(e.target.value));
    };

    // Volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setVolume(val);
        if (videoRef.current) videoRef.current.volume = val;
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        if (isMuted) {
            videoRef.current.volume = volume || 0.5; // restore to previous volume or 50%
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    // Fullscreen
    const toggleFullscreen = () => {
        if (!playerRef.current) return;
        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Listen to fullscreen changes to update icon
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    // Show/hide controls on hover
    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(hideControlsTimeout);
        if (isPlaying) {
            hideControlsTimeout = setTimeout(() => setShowControls(false), 3000);
        }
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            setShowControls(false);
            setShowSettings(false); // Hide settings dropdown if open
        }
    };

    return (
        <div
            ref={playerRef}
            className="group relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] bg-black rounded-2xl overflow-hidden flex items-center justify-center isolate"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onContextMenu={(e) => e.preventDefault()} // Prevent right click (download protection)
        >
            {/* The Video Element */}
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                poster={poster}
                controlsList="nodownload" // Extra protection
                disablePictureInPicture // Optionally disable PiP
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Huge Play Button Overlay (when paused or initially) */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
                    onClick={togglePlay}
                >
                    <div className="bg-white/20 p-5 rounded-full backdrop-blur-md transition-transform hover:scale-110">
                        <FaPlay className="text-white text-5xl translate-x-1" />
                    </div>
                </div>
            )}

            {/* Controls Container */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => e.stopPropagation()} // Prevent toggling play when clicking controls
            >
                {/* Progress Bar */}
                <div className="flex items-center gap-3 w-full mb-3">
                    <span className="text-white text-xs font-medium min-w-[40px]">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress || 0}
                        onChange={handleProgressChange}
                        className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <span className="text-white text-xs font-medium min-w-[40px] text-right">{formatTime(duration)}</span>
                </div>

                {/* Bottom Controls row */}
                <div className="flex items-center justify-between w-full">
                    {/* Left side */}
                    <div className="flex items-center gap-5">
                        <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                            {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                        </button>

                        <div className="flex items-center gap-2 group/volume relative">
                            <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors w-full">
                                {isMuted || volume === 0 ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Settings / Resolution Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={"text-white hover:text-red-500 transition-transform duration-300 "}
                            >
                                <FaCog className="text-xl" />
                            </button>

                            {/* Settings Menu Popup */}
                            {showSettings && (
                                <div className="absolute bottom-10 right-0 bg-black/90 backdrop-blur-md rounded-lg p-2 min-w-[120px] flex flex-col gap-1 border border-white/10 z-30 shadow-2xl">
                                    <div className="text-white/60 text-xs px-2 py-1 font-semibold border-b border-white/10 mb-1">
                                        Resolution
                                    </div>
                                    {["1080p", "720p", "480p"].map(res => (
                                        <button
                                            key={res}
                                            onClick={() => {
                                                setResolution(res);
                                                setShowSettings(false);
                                                // Normally here you'd swap the video source based on resolution
                                            }}
                                            className={`text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${resolution === res ? 'bg-red-600/20 text-red-500 font-medium' : 'text-white hover:bg-white/10'}`}
                                        >
                                            {res}
                                            {resolution === res && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen Button */}
                        <button onClick={toggleFullscreen} className="text-white hover:text-red-500 transition-colors">
                            {isFullscreen ? <FaCompress className="text-xl" /> : <FaExpand className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
