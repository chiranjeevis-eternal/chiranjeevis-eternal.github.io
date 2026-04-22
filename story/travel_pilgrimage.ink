// --- THE PATH OF THE PILGRIM ---
// This file handles the travel between major acts, adding "narrative mass" and evolution.

=== travel_shambhala_to_mahendra ===
# title: The Path of the Pilgrim
# yuga: kali
# background: travel_mountains

You leave the burning ruins of Shambhala behind. The trek to the Mahendra Peaks is not a single leap; it is a slow, grueling climb through a world that is actively trying to forget its own name.

Vanya walks beside you, her breath misting in the cold air. Behind you, the survivors carry the legacy of a hundred fallen homes.

* [Choose the High Road: The Ridge of Saffron.]
    ~ karma += 5
    ~ essence -= 10
    You take the exposed ridges. The path is steep and the wind howls like a wounded god, but you see the world clearly. You see the extent of the Adharma Fog.
    -> travel_mountain_encounter

* [Choose the Low Road: The Whispering Ravines.]
    ~ adharma += 5
    ~ essence -= 5
    You stay in the shadows, moving through the deep gashes in the earth. It is faster, and the wind is muffled, but the silence here feels unnatural.
    -> travel_mountain_encounter

=== travel_mountain_encounter ===
# title: An Encounter on the Path

Two days into the ascent, you find a lone traveler sitting by a dying fire. His clothes are rags, and he clutches a broken lute.

"The music has gone out of the valley," he rasps without looking up. "Even the strings have forgotten how to vibrate for the truth."

* [Offer him some of your meager supplies.]
    ~ karma += 10
    ~ essence -= 5
    You share what little you have. He takes the bread with trembling hands. 
    "You carry the scent of the First Yuga, boy," he whispers. "Be careful. The Man with the Axe does not like visitors who smell of hope."
    -> travel_first_camp

* [Ask him for news of the north.]
    ~ dharma += 5
    "The North is where the iron is forged," he laughs bitterly. "The Chiranjeevi waits. But he waits for a warrior, not a child."
    -> travel_first_camp

* [Ignore him and keep the columns moving.]
    ~ adharma += 5
    The world is too cold for charity. You press on, leaving the musician to his silence.
    -> travel_first_camp

=== travel_first_camp ===
# title: The First Vigil
# background: campfire_overlay

The sun vanishes, replaced by the bruised violet of the Kali sky. You make camp in the lee of a jagged slate cliff. This is the first moment of stillness since the fires.

* [Meditate upon the Srivatsa mark.]
    ~ essence += 15
    You focus on the warmth in your palm. The golden light hums, knitting together the fatigue in your bones. You feel the evolution of your Atman.
    -> act2_valley_entrance

* [Walk among the survivors.]
    ~ karma += 10
    You listen to their stories—the names of the children lost, the prayers for a Satya Yuga that feels impossible. Their hope is a heavy burden.
    -> act2_valley_entrance

* [Stare into the North.]
    ~ dharma += 5
    The Mahendra Peaks loom like teeth. You feel the presence of Parashurama. It is not a beckoning; it is a challenge.
    -> act2_valley_entrance
