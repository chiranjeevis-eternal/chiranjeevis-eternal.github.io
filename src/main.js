import './style.css';
import { InkWrapper } from './engine/InkWrapper.js';
import { UIManager } from './ui/UIManager.js';
import storyJson from '../story/story.json';

let game, ui;

async function startSession(isNew = true) {
  try {
    ui = new UIManager();
    game = new InkWrapper(storyJson, ui);
    
    const landingPage = document.getElementById('landing-page');
    const gameContainer = document.getElementById('game-container');
    
    landingPage.classList.add('hidden-fade');
    gameContainer.classList.remove('hidden');
    gameContainer.style.opacity = 0;
    
    setTimeout(() => {
      gameContainer.style.transition = 'opacity 1.5s ease';
      gameContainer.style.opacity = 1;
      
      if (isNew) {
        localStorage.removeItem('chiranjeevis_eternal_save'); // Clear old save
        game.start();
      } else {
        game.load();
        game.start(); // This ensures choice handlers are bound
      }
    }, 1500);

  } catch (error) {
    console.error("Critical Failure:", error);
    document.getElementById('landing-content').innerHTML = `
      <p style="color:var(--c-kali-red)">System Error: Kali's darkness prevents the story from loading.</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const beginBtn = document.getElementById('begin-btn');
  const resumeBtn = document.getElementById('resume-btn');
  
  // Check for existing save
  const hasSave = localStorage.getItem('chiranjeevis_eternal_save');
  if (hasSave) {
    resumeBtn.classList.remove('hidden');
  }

  beginBtn.addEventListener('click', () => startSession(true));
  resumeBtn.addEventListener('click', () => startSession(false));
});
