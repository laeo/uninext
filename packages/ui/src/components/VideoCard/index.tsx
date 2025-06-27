'use client';

type VideoCardProps = {
    src: string;
    autoPlay?: boolean;
}

export default function VideoCard(props: VideoCardProps) {
    const { src, autoPlay = false } = props;

    return (
        <video src={src} className="aspect-[9/16]" autoPlay={autoPlay}></video>
    );
}