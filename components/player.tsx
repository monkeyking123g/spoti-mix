"use client";
import "@/styles/player.css";
import React, { Component, RefObject } from "react";
import { RootState } from "@/redux/store";
import { Card } from "@nextui-org/card";
import { useDispatch, useSelector } from "react-redux";
import { play } from "@/redux/slices/playerSlice";
import { PlayIcon, PauseIcon, VolumeIcon } from "./icons";
import { useTheme } from "next-themes";
interface AudioVisualizerProps {
  tracks: string[];
  currentTrackIndex: number;
  isPlaying: boolean;
  dispatch: any;
  theme: string;
}

interface AudioVisualizerState {
  isReplay: boolean;
  currentTime: number;
}

class AudioVisualizer extends Component<
  AudioVisualizerProps,
  AudioVisualizerState
> {
  private audioElementRef: RefObject<HTMLAudioElement>;
  private canvasElementRef: RefObject<HTMLCanvasElement>;
  private playPauseButtonRef: RefObject<HTMLButtonElement>;
  private seekbarRef: RefObject<HTMLInputElement>;
  private volumeBarRef: RefObject<HTMLInputElement>;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private WIDTH: number = 0;
  private HEIGHT: number = 0;
  private audioCtx: AudioContext;

  constructor(props: AudioVisualizerProps | Readonly<AudioVisualizerProps>) {
    super(props);
    this.audioElementRef = React.createRef();
    this.canvasElementRef = React.createRef();
    this.playPauseButtonRef = React.createRef();
    this.seekbarRef = React.createRef();
    this.volumeBarRef = React.createRef();
    this.canvasCtx = null;
    this.state = {
      isReplay: false,
      currentTime: 0,
    };
    this.analyser = null;
    this.dataArray = null;
    this.WIDTH = 480;
    this.HEIGHT = 50;
    this.audioCtx = new window.AudioContext();
  }

  componentDidUpdate(prevProps: { isPlaying: boolean; tracks: string[] }) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.togglePlayPause();
    }
    if (prevProps.tracks !== this.props.tracks) {
      this.togglePlayPause();
    }
  }

  componentDidMount() {
    if (!this.canvasElementRef.current || !this.audioElementRef.current) return;

    this.WIDTH = this.canvasElementRef.current.clientWidth;
    this.HEIGHT = this.canvasElementRef.current.clientHeight;
    this.canvasCtx = this.canvasElementRef.current.getContext("2d");

    const audioElement = this.audioElementRef.current;
    const source = this.audioCtx.createMediaElementSource(audioElement);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    setInterval(this.setProgress, 500);
    this.draw();
  }

  draw() {
    const canvasCtx = this.canvasCtx;
    const WIDTH = this.WIDTH;
    const HEIGHT = this.HEIGHT;
    const analyser = this.analyser;
    const dataArray = this.dataArray;

    if (!analyser || !canvasCtx || !dataArray) return;
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = this.props.theme === "light" ? "#000000" : "#171717";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const gradient = canvasCtx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, "#ff1cf7");
    gradient.addColorStop(1, "#b249f8");

    const barWidth = (WIDTH / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i] / 2.8;
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    requestAnimationFrame(() => this.draw());
  }

  togglePlayPause = () => {
    this.audioCtx.resume().then(() => {
      if (!this.audioElementRef.current) return;

      if (this.props.isPlaying) {
        console.log("Play");
        this.audioElementRef.current.play();
      } else {
        console.log("Pause");
        this.audioElementRef.current.pause();
      }
    });
  };
  setProgress = () => {
    if (this.audioElementRef.current) {
      const currentTime = this.audioElementRef.current.currentTime;
      this.setState({ currentTime });
      this.seekbarRef.current!.value = String(currentTime);
    }
  };

  setDuration = () => {
    if (this.audioElementRef.current) {
      this.seekbarRef.current!.max = String(
        this.audioElementRef.current.duration
      );
    }
  };

  onEnd = () => {
    this.audioElementRef.current!.currentTime = 0;
    this.seekbarRef.current!.value = "0";
  };

  onSeek = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (this.audioElementRef.current) {
      this.audioElementRef.current.currentTime = parseFloat(evt.target.value);
    }
  };

  onVolumeSeek = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (this.audioElementRef.current) {
      this.audioElementRef.current.volume = parseFloat(evt.target.value) / 100;
    }
  };

  render() {
    const { tracks, currentTrackIndex, isPlaying } = this.props;
    return (
      <div>
        <audio
          src={tracks[currentTrackIndex]}
          ref={this.audioElementRef}
          onLoadedMetadata={this.setDuration}
          crossOrigin="anonymous"
        ></audio>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[480px] max-h-[200px]"
          shadow="sm"
        >
          <div>
            <canvas
              id="myCanvas"
              className="bg-background/60"
              ref={this.canvasElementRef}
              width={this.WIDTH}
              height={this.HEIGHT}
            ></canvas>
          </div>
          <div>
            <div className="flex justify-center items-center rounded-lg shadow-lg p-1">
              <button
                ref={this.playPauseButtonRef}
                onClick={() => {
                  this.props.dispatch(play());
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <input
                className="appearance-none w-300 bg-default-500/30 seekbar"
                ref={this.seekbarRef}
                onChange={this.onSeek}
                type="range"
              />
              <VolumeIcon />
              <input
                className="appearance-none w-300 bg-default-500/30 volume"
                ref={this.volumeBarRef}
                onChange={this.onVolumeSeek}
                type="range"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const AudioVisualizerWrapper: React.FC = () => {
  const tracks = useSelector((state: RootState) => state.player.tracks);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const currentTrackIndex = useSelector(
    (state: RootState) => state.player.currentTrackIndex
  );
  return (
    <AudioVisualizer
      tracks={tracks}
      currentTrackIndex={currentTrackIndex}
      isPlaying={isPlaying}
      dispatch={dispatch}
      theme={theme}
    />
  );
};

export default AudioVisualizerWrapper;
