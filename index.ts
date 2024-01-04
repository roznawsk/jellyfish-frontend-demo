// Import stylesheets
import './style.css';
import './mediaDevices.ts';
import { JellyfishClient, Peer } from '@jellyfish-dev/ts-client-sdk';

// Write TypeScript code!
// const appDiv: HTMLElement = document.getElementById('app');
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const mediaStream = navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    console.log('nice sock');
  });

import './style.css';
import './mediaDevices.ts';
import { JellyfishClient, Peer } from '@wjellyfish-dev/ts-client-sdk';
import {
  addVideoTrackButton,
  connectButton,
  connectionStatus,
  disconnectButton,
  localTrackId,
  remoteTracksContainer,
  removeVideoTrackButton,
  tokenInput,
} from './components';
import {
  createVideoComopnent,
  videoMediaStream,
  startLastSelectedDevice,
} from './mediaDevices';

// startLastSelectedDevice();

type PeerMetadata = {
  name: string;
};

type TrackMetadata = {
  type: 'camera' | 'microphone' | 'screenshare';
};

export const client = new JellyfishClient<PeerMetadata, TrackMetadata>();

// Exercise 1: Connect to Jellyfish Media Server
connectButton.addEventListener('click', async () => {
  const token = tokenInput.value;
  console.log({ token });

  // your code here
  client.connect({
    signaling: {
      host: 'mediumfish.membrane.ovh',
      protocol: 'wss',
    },
    token: tokenInput.value,
    peerMetadata: { name: 'Kamil' },
  });
});

// Exercise 2: Get connection status
// hint: set component text
// connectionStatus.innerHTML = "Hello world";

// your code here
client.addListener('joined', (peerId: string, peers: Peer[]) => {
  console.log('joined');
  connectionStatus.innerHTML = 'joined';
});

client.addListener('disconnected', () => {
  console.log('disconnected');
  connectionStatus.innerHTML = 'disconnected';
});

// // Exercise 3: Disconnect from jellyfish server
disconnectButton.addEventListener('click', async () => {
  console.log('Disconnect clicked!');
  // Your code here
  client.disconnect();
});

// // Exercise 4: Stream your video track

addVideoTrackButton.addEventListener('click', async () => {
  console.log(videoMediaStream);

  if (!videoMediaStream) throw Error('Stram is empty!');

  const vidoeTrack = videoMediaStream.getVideoTracks()?.[0];
  if (!vidoeTrack) throw Error('Media stream has no video track!');

  // Your code for both here
  const trackId = client.addTrack(vidoeTrack, videoMediaStream);
  localTrackId.innerHTML = trackId;
});
// // Exercise 5: Get remote video trackId and display it
// // Hint: localTrackId.innerHTML = trackId

// // Exercise 6: Stop track
removeVideoTrackButton.addEventListener('click', async () => {
  console.log('Remove track clicked!');
  // Your code here
  client.removeTrack(localTrackId.innerHTML);

  localTrackId.innerHTML = '';
});

// // Exercise 7: Get remote tracks

// // Hint: Add new video track componet
// // const newVideoElement = createVideoComopnent(trackId, stream);
// // remoteTracksContainer.appendChild(newVideoElement);

// // Hint: Remove video track component
// // document.getElementById(trackId)?.remove();

// // Your code here

client.addListener('trackReady', (trackContext) => {
  if (!trackContext.stream) throw Error('Track stream is null!');

  const newVideoElement = createVideoComopnent(
    trackContext.trackId,
    trackContext.stream
  );
  remoteTracksContainer.appendChild(newVideoElement);
});

client.addListener('trackRemoved', (trackContext) => {
  document.getElementById(trackContext.trackId)?.remove();
});

// Exercise 8: Online meeting
