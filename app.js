const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play().catch(err => console.log("Autoplay bloqueado:", err));
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

playBtn.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    currentTimeEl.textContent = current;
    durationEl.textContent = duration;
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

window.addEventListener('load', () => {
  audio.volume = 0.25;
  // audio.play().catch(() => {}); // descomenta si quieres intentar autoplay
});

prevBtn.addEventListener('click', () => {
  audio.currentTime = 0;
});

nextBtn.addEventListener('click', () => {
  audio.currentTime = audio.duration * 0.85 || 0;
});