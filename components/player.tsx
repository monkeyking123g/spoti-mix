"use client";
import "@/styles/player.css";
import {Card } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { play, pause, setVolume, setDuration, setCurrentTime } from '../app/GlobalRedux/slices/playerSlice';
import { PlayIcon, PauseIcon, VolumeIcon } from "./icons";
import { RootState } from "@/app/GlobalRedux/store";

const Player = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const volume = useSelector((state: RootState) => state.player.volume);
  const tracks = useSelector((state: RootState) => state.player.tracks);
  const duration = useSelector((state: RootState) => state.player.duration);
  const currentTime = useSelector((state: RootState) => state.player.currentTime);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const WIDTH = 480; 
  const HEIGHT = 50;

  const handlePlay = () => {
    if(isPlaying) return dispatch(pause())
    
    return dispatch(play())
    
  } 
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    dispatch(setVolume(newVolume));
    if (audioElement) {
      audioElement.volume = newVolume / 100;
    }
  };

  const handleCurrentTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    dispatch(setCurrentTime(newTime));
    if (audioElement) {
      audioElement.currentTime = newTime;
    }
  };

  // const handleLoadTracks = (trackList: string[]) => {
  //   dispatch(loadTracks(trackList));
  // };

  // const handleLoadTrack = (trackUrl: string) => {
  //   dispatch(loadTrack(trackUrl));
  // };
  

  useEffect(() => {
    // if (tracks.length === 0) return;

    const canvas: HTMLCanvasElement | any  = document.getElementById("audioCanvas");
    const canvasCtx = canvas.getContext("2d");

    const audioContext = new (window.AudioContext ||
      window.AudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const audio: HTMLAudioElement = new Audio('https://cdn.pixabay.com/audio/2023/10/03/audio_ff0e1ce26c.mp3');
    audio.currentTime = currentTime;
    audio.volume = volume / 100;
    audio.addEventListener("loadedmetadata", () => {
      dispatch(setDuration(audio.duration)); 
    });

    audio.addEventListener("timeupdate", () => {
      dispatch(setCurrentTime(audio.currentTime));
    });

    audio.addEventListener("ended", () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
        audio.src = tracks[currentTrackIndex + 1];
        audio.load();
        audio.play();
      }
    });

    audio.crossOrigin = "anonymous";
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    function draw() {
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.fillStyle = "rgb(2, 2, 2)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.8;
        canvasCtx.fillStyle = `rgba(0, 136, 169, 1)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    }
    if (isPlaying) {
      audio.play();
      draw();
    }

    setAudioElement(audio);

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[480px] max-h-[200px]"
      shadow="sm"
    >
      <div>
	  	<canvas width={WIDTH} height={HEIGHT} id="audioCanvas"></canvas>
      </div>
      <div>
        <div className="flex justify-center items-center rounded-lg shadow-lg p-1">
        <button onClick={handlePlay}>
			      {isPlaying ? <PlayIcon /> : <PauseIcon />}
        </button>
        <input
          className="appearance-none w-300 bg-default-500/30 seekbar"
          type="range"
          min="0"
          max={duration}
          value={currentTime.toString()}
          onChange={handleCurrentTimeChange}
        />
        <VolumeIcon />
        <input
          className="appearance-none w-300 bg-default-500/30 volume"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
        </div>
      </div>
    </Card>
  );
};

export default Player;

