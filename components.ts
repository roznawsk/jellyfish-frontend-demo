/**
 * How to use it
 *
 * # Click handler
 *
 * connectButton.addEventListener("click", async () => {
 *   console.log("Clicked!");
 * });
 *
 * # Change UI
 *
 * connectionStatus.innerHTML = "joined";
 */

/* Video player */

const videoPlayerOrNull = document.querySelector<HTMLVideoElement>(
  '#local-video-player'
);
if (!videoPlayerOrNull) throw Error('Video player not found!');

export const videoPlayer = videoPlayerOrNull;

/* Audio icon */

const audioIndicatorOrNull =
  document.querySelector<HTMLVideoElement>('#audio-indicator');
if (!audioIndicatorOrNull) throw Error('Audio emoji not found!');

export const audioIndicator = audioIndicatorOrNull;

/* Token input */

const tokenInputOrNull: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>('#token-input');
if (!tokenInputOrNull) throw Error('Token input not found!');

tokenInputOrNull.value = localStorage.getItem('token') || '';

// peerTokenInput.addEventListener("change", (event) => {
//   console.log({ event });
// });

tokenInputOrNull.addEventListener('input', (event) => {
  const value = (event.target as HTMLInputElement).value;
  localStorage.setItem('token', value);
});

export const tokenInput: HTMLInputElement = tokenInputOrNull;

/* Connection status */

const connectionStatusOrNull: HTMLSpanElement | null =
  document.querySelector<HTMLSpanElement>('#connection-status');
if (!connectionStatusOrNull)
  throw Error('Connection status element not found!');

export const connectionStatus: HTMLSpanElement = connectionStatusOrNull;

/* Connect button */

const connectButtonOrNull =
  document.querySelector<HTMLButtonElement>('#connect-btn');
if (!connectButtonOrNull) throw Error('Connect button not found!');

export const connectButton: HTMLButtonElement = connectButtonOrNull;

/* Disconnect button */

const disconnectButtonOrNull =
  document.querySelector<HTMLButtonElement>('#disconnect-btn');
if (!disconnectButtonOrNull) throw Error('Disconnect button not found!');

export const disconnectButton: HTMLButtonElement = disconnectButtonOrNull;

/* Add video track button */

const addVideoTrackButtonOrNull = document.querySelector<HTMLButtonElement>(
  '#add-video-track-btn'
);
if (!addVideoTrackButtonOrNull)
  throw Error('Add video track button not found!');

export const addVideoTrackButton: HTMLButtonElement = addVideoTrackButtonOrNull;

const removeVideoTrackButtonOrNull = document.querySelector<HTMLButtonElement>(
  '#remove-video-track-btn'
);
if (!removeVideoTrackButtonOrNull)
  throw Error('Remove video track button not found!');

export const removeVideoTrackButton: HTMLButtonElement =
  removeVideoTrackButtonOrNull;

// Local track id

const localTrackIdOrNull =
  document.querySelector<HTMLButtonElement>('#local-track-id');
if (!localTrackIdOrNull) throw Error('Local track span not found!');

export const localTrackId: HTMLButtonElement = localTrackIdOrNull;

// Remote track container

const remoteTracksContainerOrNull = document.querySelector<HTMLButtonElement>(
  '#remote-tracks-container'
);
if (!remoteTracksContainerOrNull)
  throw Error('Remote track container not found!');

export const remoteTracksContainer: HTMLButtonElement =
  remoteTracksContainerOrNull;
