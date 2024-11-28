const socket = io();
let mediaRecorder;
let audioChunks = [];

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  startButton.disabled = true;
  stopButton.disabled = false;

  mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    socket.emit('audio', audioBlob);
    audioChunks = [];
  };
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});

socket.on('transcription', text => {
  document.getElementById('transcription').textContent = `Transcription: ${text}`;
});

socket.on('translation', text => {
  document.getElementById('translation').textContent = `Translation: ${text}`;
});