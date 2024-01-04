import { audioIndicator, videoPlayer } from './components';
import {
  AUDIO_TRACK_CONSTRAINTS,
  SCREEN_SHARING_MEDIA_CONSTRAINTS,
  VIDEO_TRACK_CONSTRAINTS,
} from './constraints';

const camera = 'environment';

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const getCameraOrMicrophone = async (
  videoDeviceId: string,
  audioDeviceId: string
): Promise<MediaStream> => {
  const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: videoDeviceId, ...VIDEO_TRACK_CONSTRAINTS },
    audio: { deviceId: audioDeviceId, ...AUDIO_TRACK_CONSTRAINTS },
  });
  console.log('dupa stream', stream);
  return stream;
};

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
const getScreenshareExample = async (
  deviceId: string
): Promise<MediaStream> => {
  const stream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
    video: SCREEN_SHARING_MEDIA_CONSTRAINTS,
  });
  return stream;
};

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
const listAllDevices = async (): Promise<MediaDeviceInfo[]> => {
  const mediaDevices: MediaDeviceInfo[] =
    await navigator.mediaDevices.enumerateDevices();
  return mediaDevices;
};

// How to display a video stream
const attachVideo = (stream: MediaStream) => {
  // <video id="video-player-id" class="h-[150px] w-[200px]"></video>
  const videoPlayer =
    document.querySelector<HTMLVideoElement>('video-player-id');
  if (!videoPlayer) throw Error('Video player is null or undefined');

  videoPlayer.srcObject = stream;
  videoPlayer.onloadedmetadata = () => {
    videoPlayer.play();
  };
};

// helper:
// startLastSelectedDevice()

// ------------------------------------------------------------- //

export let videoMediaStream: MediaStream | null = null;
export let audioMediaStream: MediaStream | null = null;

const LAST_SELECTED_VIDEO_DEVICE_ID_KEY = 'last-selected-video-device-id';
const LAST_SELECTED_AUDIO_DEVICE_ID_KEY = 'last-selected-audio-device-id';

const startDevice = async (deviceId: string, type: 'audio' | 'video') => {
  localStorage.setItem(
    type === 'video'
      ? LAST_SELECTED_VIDEO_DEVICE_ID_KEY
      : LAST_SELECTED_AUDIO_DEVICE_ID_KEY,
    deviceId
  );

  const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
    [type]: {
      deviceId: deviceId,
      ...(type === 'video' ? VIDEO_TRACK_CONSTRAINTS : AUDIO_TRACK_CONSTRAINTS),
    },
  });

  if (type === 'video') {
    videoMediaStream = stream;
    videoPlayer.srcObject = stream;
    videoPlayer.onloadedmetadata = () => {
      videoPlayer.play();
    };
  } else {
    audioIndicator.innerHTML = '🎤';
  }
};

document
  .querySelector<HTMLVideoElement>('#grant-permission-btn')
  ?.addEventListener('click', async () => {
    // const device = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const device = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: camera },
      audio: false,
    });
    device.getTracks().forEach((track) => {
      track.stop();
    });
  });

document
  .querySelector<HTMLVideoElement>('#enumerate-devices-btn')
  ?.addEventListener('click', async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('enumerated Devices', devices);
    const container = document.querySelector<HTMLDivElement>(
      '#device-buttons-container'
    );
    container?.classList.remove('hidden');
    container?.classList.add('flex');

    const videoButtonsHtml = devices
      .filter((device) => device.kind === 'videoinput')
      .map((device) => {
        return `<button id="${device.deviceId}" data-device-id="${device.deviceId}" class="start-video-device-button btn-xs btn btn-success">${device.label}</button>`;
      })
      .join('');

    document.querySelector<HTMLDivElement>(
      '#start-video-devices-buttons'
    )!.innerHTML = videoButtonsHtml;

    document
      .querySelectorAll<HTMLButtonElement>('.start-video-device-button')
      .forEach((element) => {
        const deviceId = element.dataset.deviceId;
        if (!deviceId) throw Error('Device id is null');

        element.addEventListener('click', async (event) => {
          startDevice(deviceId, 'video');
        });
      });

    const audioButtonsHtml = devices
      .filter((device) => device.kind === 'audioinput')
      .map((device) => {
        return `<button id="${device.deviceId}" data-device-id="${device.deviceId}" class="start-audio-device-button btn-xs btn btn-info">${device.label}</button>`;
      })
      .join('');

    document.querySelector<HTMLDivElement>(
      '#start-audio-devices-buttons'
    )!.innerHTML = audioButtonsHtml;

    document
      .querySelectorAll<HTMLButtonElement>('.start-audio-device-button')
      .forEach((element) => {
        const deviceId = element.dataset.deviceId;
        if (!deviceId) throw Error('Device id is null');

        element.addEventListener('click', async (event) => {
          startDevice(deviceId, 'audio');
        });
      });
  });

export const startLastSelectedDevice = () => {
  const videoDeviceId: string | null = localStorage.getItem(
    LAST_SELECTED_VIDEO_DEVICE_ID_KEY
  );
  if (!videoDeviceId) throw Error('Device id from local storage is null');
  startDevice(videoDeviceId, 'video');
  // const audioDeviceId: string | null = localStorage.getItem(LAST_SELECTED_AUDIO_DEVICE_ID_KEY);
  // if (!audioDeviceId) throw Error("Device id from local storage is null");
  // startDevice(audioDeviceId, "audio");
};

export const createVideoComopnent = (
  trackId: string,
  stream: MediaStream
): HTMLVideoElement => {
  const newVideoElement = document.createElement('video');
  newVideoElement.setAttribute('id', trackId);
  newVideoElement.setAttribute('class', 'h-[150px] w-[200px]');
  newVideoElement.srcObject = stream;
  newVideoElement.onloadedmetadata = () => {
    newVideoElement.play();
  };
  return newVideoElement;
};
