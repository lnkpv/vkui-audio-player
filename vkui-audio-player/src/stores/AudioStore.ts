import {makeAutoObservable} from 'mobx';
import {Track} from '../types/Track';
import {TRACKS} from "../data/tracks";

class AudioStore {
    tracks: Track[] = TRACKS;
    currentTrackIndex = 0;
    isPlaying = false;
    currentTime = 0;
    duration = 0;

    constructor() {
        makeAutoObservable(this);
    }

    fromSecondsToMinutes(time: number) {
        const h = Math.floor(time / 3600);
        const m = Math.floor(time % 3600 / 60);
        const s = Math.floor(time % 3600 % 60);

        const hDisplay = h > 0 ? (h > 9 ? "" : "0") + h : "";
        const mDisplay = m > 0 ? (m > 9 ? "" : "0") + m : "00:";
        const sDisplay = s > 0 ? (s > 9 ? "" : "0") + s : "00";
        return hDisplay + mDisplay + sDisplay;
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    setTime(time: number) {
        this.currentTime = time;
    }

    getTimeDisplay() {
        return this.fromSecondsToMinutes(this.currentTime);
    }

    setDuration(duration: number) {
        this.duration = duration;
    }

    getDurationDisplay() {
        return this.tracks[this.currentTrackIndex].duration;
    }

    setCurrentTrackIndex(index: number) {
        this.currentTrackIndex = index;
        this.resetTime();
    }

    resetTime() {
        this.currentTime = 0;
    }

    get currentTrack() {
        return this.tracks[this.currentTrackIndex];
    }
}

const audioStore = new AudioStore();
export default audioStore;
