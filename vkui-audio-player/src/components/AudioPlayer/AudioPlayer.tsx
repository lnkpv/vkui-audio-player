import React, {useRef, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Image, IconButton, SimpleCell, Footnote, Headline} from '@vkontakte/vkui';
import audioStore from '../../stores/AudioStore';
import {Icon20GraphOutline, Icon16MoreVertical} from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';


const AudioPlayer: React.FC = observer(() => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            audioStore.setTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            audioStore.setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    useEffect(() => {
        if (audioStore.isPlaying) {
            audioRef.current?.play();
            setOverlay(true);
        } else {
            audioRef.current?.pause();
            setOverlay(false);
        }
    }, [audioStore.isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = audioStore.currentTrack.url;
            audio.load();
            if (audioStore.isPlaying) {
                audio.play();
            }
        }
    }, []);

    return (
        <SimpleCell
            before={
                <Image src={audioStore.currentTrack.icon} alt="icon" size={40} borderRadius="m">
                    {overlay && (
                        <Image.Overlay theme="dark" visibility="always">
                            <Icon20GraphOutline/>
                        </Image.Overlay>
                    )}
                </Image>
            }

            indicator={
                <Footnote>
                    {audioStore.currentTime > 0 ?
                        (audioStore.getTimeDisplay())
                        : (audioStore.getDurationDisplay())}
                </Footnote>
            }

            after={
                <IconButton>
                    <Icon16MoreVertical/>
                </IconButton>
            }

            subtitle={
                <Footnote>{audioStore.currentTrack.artist}</Footnote>
            }

            multiline={true}

            onClick={(() => (
                audioStore.isPlaying ?
                    audioStore.pause() :
                    audioStore.play()
            ))}
        >
            {audioStore.currentTrack.title}
            <audio
                ref={audioRef}
                src={audioStore.currentTrack.url}
            />
        </SimpleCell>
    );
});

export default AudioPlayer;
