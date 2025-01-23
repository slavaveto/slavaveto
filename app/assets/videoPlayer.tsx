'use client';

const VideoPlayer = ({publicId, posterTime = 0}: { publicId: string; posterTime?: number }) => {
    const videoUrl = `https://res.cloudinary.com/dgi1zdus7/video/upload/${publicId}.mp4`;
    const posterUrl = `https://res.cloudinary.com/dgi1zdus7/video/upload/so_${posterTime}/${publicId}.jpg`;

    return (
        <video controls width="800" className="rounded-lg shadow-md">
            <source src={videoUrl} type="video/mp4"/>
            Ваш браузер не поддерживает видео-тег.
        </video>
    );
};

export default VideoPlayer;