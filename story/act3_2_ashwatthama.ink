=== act3_ashwatthama_arrival ===
# title: The Wounded Thing
# yuga: kali
# audio: cursed_silence

The air grows colder, almost metallic, as you lead your company into the high passes of the Mahendra range. Devadatta begins to neigh with an uneasy, high-pitched fear.

Lying across the path, half-buried in the frozen soot, is a man whose roar of pain seems to vibrate in the very stones. A red, pulsating light emanates from a jagged hole in his forehead—the place where a divine gem once sat, now a weeping wound that will not heal.

This is **Ashwatthama**, the son of Drona, the cursed immortal.

"Get... away..." he snarls, his hands clawing at the ice. "The darkness... it feeds on my hate. If you touch me, Avatar, you will taste the burning of a thousand Kurukshetras."

* [Approach and offer your hand.]
    ~ dharma += 10
    # stat_change: dharma_up
    You ignore the warnings. As your hand touches his, a jolt of pure, unadulterated agony spikes through your arm. He is not just wounded; he is a man made of grief.
    -> act3_ashwatthama_vision

* [Wait for Vyasa to intervene.]
    ~ karma += 5
    Vyasa steps forward, chanting a mantra of binding. The red light from the gem-wound dims, but Ashwatthama's eyes remain wild and full of malice.
    -> act3_ashwatthama_vision

=== act3_ashwatthama_vision ===
# title: The Brahmastra Crisis
# yuga: dvapara

Ashwatthama's scream turns into a roar of fire. 

"You want to know what it feels like to be a god who failed?" he hisses. "Then see the night I tried to end the world."

* [Enter the memory.]
    The snow turns to fire. The sky turns to blood.
    -> vision_ashwatthama_1

=== act3_ashwatthama_choice ===
// Reached after Ashwatthama vision in visions.ink
The memory of the divine fire still burns in your eyes. Ashwatthama is breathing heavily, the red light on his forehead pulsing like a dying star.

"I am the mistake of the previous age, Kalki," he says, with a terrible, broken hope. "Kali promises me a world where I am not a monster. What do you promise me?"

* [“I promise you a chance at redemption.”]
    ~ dharma += 20
    # stat_change: dharma_up
    "Redemption is a long walk in the dark," he mutters. But he stands up. 
    -> act3_ashwatthama_companion

* [“I promise you a war worth fighting.”]
    ~ karma += 15
    ~ adharma += 10
    # stat_change: karma_up
    He laughs—a sound like breaking bone. "Then let us burn the darkness together."
    -> act3_ashwatthama_companion

=== act3_ashwatthama_companion ===
Ashwatthama follows your company, though he keeps to the shadows.
~ comp_ashwatthama = true
# companion_joined: ashwatthama

-> act3_trial_lobha
