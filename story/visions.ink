=== vision_parashurama_1 ===
# title: The 21 Dynasties
# yuga: satya

As you make your choice, a sudden, blinding pressure seizes your temples. It brings you to your knees. The scent of the burning village is violently ripped away from your nostrils, instantly replaced by the overwhelming smell of copper, ozone, and old monsoon rain.

The world falls away completely. The Kali Yuga vanishes.

You find yourself standing on a jagged mountain peak. This is Mahendra Mountain. A man stands before you in the deluge. He is impossibly vast, heavily muscled. In his hands, he holds an axe—the Vidyudabhi. It drips with blood.

"This is not where you die, Kalki," Parashurama says.

+ ["Who are you?"]
    He traces the edge of his axe. "I am the wrath that you must learn to harness. I am the shadow of the Treta Yuga."
    -> vision_parashurama_exit

+ ["I am not ready for this war."]
    "No one ever is," he answers quietly. "Dharma only asks if you will stand when your spine is the only thing keeping the sky from falling."
    -> vision_parashurama_exit

=== vision_parashurama_exit ===
The vision shatters. You return to the ash of the valley.
-> act2_parashu_choice

=== vision_hanuman_1 ===
# title: The Fire of Lanka
# yuga: treta

The blue bioluminescence of the temple is replaced by a roaring, golden inferno. You are standing on a roof of gold and sapphire. Below, a city—vast and beautiful—is being consumed by a fire that does not smoke.

A shape leaps across the sky, silhouetted against a moon that looks too large. It is Hanuman, his tail a lash of flame.

"See, Kalki," a younger Hanuman whispers beside you. "We burned the city of the Demon King not out of hate, but out of necessity. To some, I was a god. To others, I was a monster. You will be both."

* [“Memory is a chain that prevents moving forward.”]
    ~ aff_hanuman -= 10
    The golden light of the Treta Yuga fades.
    -> vision_hanuman_exit

* [“Some names are meant to be eternal.”]
    ~ aff_hanuman += 10
    The golden light of the Treta Yuga fades.
    -> vision_hanuman_exit

=== vision_hanuman_exit ===
The flames vanish. You are back in the cold temple with the gold-furred monk.
-> act2_hanuman_choice

=== vision_vibhishana_1 ===
# title: The Burning Bridge
# yuga: treta

The air is thick with the smell of seawater, ozone, and the dying screams of a golden civilization. You are on the ramparts of a city of pure gold—Lanka. Below, an army of monkeys is swarming the walls.

You see a younger Vibhishana. He is weeping as he watches his brother, the ten-headed king, fall from the sky.

"The bridge of family is burning," his younger self whispers. "I have betrayed my kin to save the truth. Tell me, future king... was it worth the sorrow?"

* [“Loyalty to Rama was the only path to peace.”]
    ~ aff_vibhishana += 10
    The golden city collapses into the black sands of the coast.
    -> vision_vibhishana_exit

* [“To strike your own blood is a scar that never heals.”]
    ~ aff_vibhishana -= 10
    The golden city collapses into the black sands of the coast.
    -> vision_vibhishana_exit

=== vision_vibhishana_exit ===
The vision of ancient Lanka fades. Vibhishana stands before you in the present darkness.
-> act2_vibhishana_choice

=== vision_vyasa_1 ===
# title: The Field of Dharma
# yuga: dvapara

The air turns cold and heavy with the scent of wet earth and iron. You are standing on a plain—Kurukshetra. Millions of soldiers stand in silence. In the center, two chariots face each other.

You see a warrior with a bow, his head bowed in grief. Beside him, a charioteer with skin the color of a thundercloud is speaking. You cannot hear the words, but the vibration of them makes your heart skip.

Vyasa's voice echoes: "The war ended here, Kalki. But the consequences began. Every line I wrote was a tombstone for a friend. Will you write tombstones, or a testament?"

* [“A script needs an ending, no matter how cruel.”]
    ~ aff_vyasa -= 10
    The ink of the vision washes away into the rain.
    -> vision_vyasa_exit

* [“The script is only a guide. The ink is still wet.”]
    ~ aff_vyasa += 10
    The ink of the vision washes away into the rain.
    -> vision_vyasa_exit

=== vision_vyasa_exit ===
The battlefield dissolves into the birch-bark scrolls of the cave.
-> act2_vyasa_choice

=== vision_kripacharya_1 ===
# title: The Last Sunset
# yuga: dvapara

The sky is the color of a fresh bruise—purple, red, and dying gold. You are standing in the middle of a field where there are more broken arrows than blades of grass.

You see Kripacharya, his armor shattered, holding the body of a fallen friend. He is not weeping. He is staring at the horizon with a look of absolute, terrifying clarity.

"They are all gone, Kalki," Kripacharya's voice whispers from the wind. "The heroes, the kings, the monsters. All that remains is the duty to the survivors. Do not let your pride burn the world to save your throne."

* [“Loyalty to a lie is no virtue.”]
    ~ aff_kripacharya -= 10
    The golden sunset of Kurukshetra is replaced by the grey mist.
    -> vision_kripacharya_exit

* [“Teachers are the anchors of an age, even a failing one.”]
    ~ aff_kripacharya += 10
    The golden sunset of Kurukshetra is replaced by the grey mist.
    -> vision_kripacharya_exit

=== vision_kripacharya_exit ===
The field of bone vanishes. You are back in the mountain fortress.
-> act3_kripacharya_choice

=== vision_ashwatthama_1 ===
# title: The Brahmastra Crisis
# yuga: dvapara

The world erupts into a light that is not white, but a sickly, radioactive green. You see Ashwatthama, his eyes wide with a madness born of grief, holding a blade of grass that has been transformed into a weapon of absolute destruction.

The Brahmasira. The weapon that cannot be recalled.

"I can't take it back!" he screams in the memory. "I won't take it back!"

You see the vision of the unborn child in the womb, the target of his malice. You see the Krishna figure intervening with a curse that will last three thousand years.

* [“Justice should be absolute, not personal.”]
    ~ aff_parashurama -= 10
    The vision of blood dissolves into the grey soot of the Valley.
    -> vision_ashwatthama_exit

* [“The weight of the axe was your dharma.”]
    ~ aff_parashurama += 10
    The vision of blood dissolves into the grey soot of the Valley.
    -> vision_ashwatthama_exit

=== vision_ashwatthama_exit ===
The vision of fire fades. The red wound in Ashwatthama's forehead still pulses.
-> act3_ashwatthama_choice

=== vision_bali_1 ===
# title: The Three Steps
# yuga: satya

The world is made of ivory, gold, and the purest water you have ever seen. You are at the court of the young King Bali. He has conquered everything, and yet there is no blood on his walls.

A small boy, a dwarf with an umbrella—Vamana—stands before him.

"You have given everything I asked for, Bali," the boy says, his voice like a gentle gong. "Two steps have covered the earth and the heavens. Where should I put the third?"

You see Bali, at the height of his power, kneeling. He does not look defeated. He looks free. He offers his own head as the third step.

* [“The humility of a king is his true crown.”]
    ~ aff_bali += 10
    The ivory world dissolves into the grey soot of the Chasm.
    -> vision_bali_exit

* [“A king should never kneel, even to a god.”]
    ~ aff_bali -= 10
    The ivory world dissolves into the grey soot of the Chasm.
    -> vision_bali_exit

=== vision_bali_exit ===
The vision of the Golden Age fades. Bali stands before you in the Kali Yuga.
-> act3_bali_choice
