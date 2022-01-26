const score = document.querySelector('#score');
const player = document.querySelector('#player');

score.textContent = localStorage.getItem('score');
player.textContent = localStorage.getItem('username');