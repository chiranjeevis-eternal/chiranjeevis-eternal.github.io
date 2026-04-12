import fs from 'fs';
import { Compiler } from 'inkjs/compiler/Compiler.js';

const source = fs.readFileSync('story/main.ink', 'utf-8');
const compiler = new Compiler(source, {
  errorHandler: (message, type) => {
    console.error(`[${type}] ${message}`);
  }
});
const story = compiler.Compile();
const json = story.ToJson();
fs.writeFileSync('story/story.json', json);
console.log('Compiled story/main.ink to story/story.json');
