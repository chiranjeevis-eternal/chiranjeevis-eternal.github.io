import './style.css';
import { InkWrapper } from './engine/InkWrapper.js';
import { UIManager } from './ui/UIManager.js';
import storyJson from '../story/story.json';

async function initGame() {
  try {
    const ui = new UIManager();
    const game = new InkWrapper(storyJson, ui);
    
    // Hide landing page, reveal game container
    const landingPage = document.getElementById('landing-page');
    const gameContainer = document.getElementById('game-container');
    
    landingPage.classList.add('hidden-fade');
    gameContainer.classList.remove('hidden');
    gameContainer.style.opacity = 0;
    
    // Give time for the landing page fade to complete
    setTimeout(() => {
      gameContainer.style.transition = 'opacity 1.5s ease';
      gameContainer.style.opacity = 1;
      
      // Start the game logic
      game.start();
    }, 1500);

  } catch (error) {
    console.error("Failed to load story.", error);
    document.getElementById('landing-content').innerHTML = `
      <p style="color:var(--c-kali-red)">System Error: Kali's darkness prevents the story from loading. Check console.</p>
    `;
  }
}

// Bind to "Begin" button rather than immediate load
document.addEventListener("DOMContentLoaded", () => {
  const beginBtn = document.getElementById('begin-btn');
  if (beginBtn) {
    beginBtn.addEventListener('click', initGame);
  }
});
