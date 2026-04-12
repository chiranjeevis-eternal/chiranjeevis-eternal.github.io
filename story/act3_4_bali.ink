=== act3_bali_arrival ===
# title: The King Under the Earth
# yuga: kali
# audio: earthquakes

The march toward Adharmendra's fortress stops at the edge of the *Black Chasm*. The bridge has been destroyed by violet fire. Your army — a thousands strong now, made of villagers and survivors — looks to you with fear.

Suddenly, the earth begins to heave. Not a quake of destruction, but a systematic rising of the land. From the depths of the chasm, monolithic pillars of basalt ascend, forming a new bridge.

Standing atop the highest pillar is a gargantuan figure, crowned in vines and emeralds. He carries no weapon, for his very presence is a mountain.

This is [Mahabali](https://en.wikipedia.org/wiki/Mahabali), the noble Asura King of Patala.

"I have waited for three Yugas to repay my debt to the Line of Vishnu," he booms, his voice echoing from the chasm floor. "Kali's age has no room for kings who care for their people. My army is yours, Kalki."

* [“We receive you as a brother-sovereign.”]
    ~ dharma += 20
    # stat_change: dharma_up
    "Then let the earth itself rise to meet your enemy," Bali roars.
    -> act3_bali_vision

* [“Your army will be the shield of the world.”]
    ~ karma += 15
    ~ adharma += 5
    # stat_change: karma_up
    "I was once a king of the surface," Bali says. "I know how to hold a line against the darkness."
    -> act3_bali_vision

=== act3_bali_vision ===
# title: The Three Steps
# yuga: satya

Bali places a massive hand on the earth at your feet.

"See the day I lost the world," he says. "And found something better."

* [Enter the memory.]
    The grey soot of Kali vanishes. You are in a world of ivory and pure white light.
    -> vision_bali_1

=== act3_bali_choice ===
// Reached after Bali vision in visions.ink
The blinding light of the Satya Yuga fades, leaving the world looking even darker than before.

Bali watches you. "Surrender is not defeat, Kalki, if it is done for the truth. Will you sacrifice your name to save the age?"

* [“My name is nothing. Dharma is everything.”]
    ~ dharma += 25
    # stat_change: dharma_up
    "Then you are truly the Avatar," Bali says, bowing low.
    -> act3_bali_companion

* [“I will sacrifice my life, but never my honor.”]
    ~ karma += 20
    # stat_change: karma_up
    "Honor is a bright flame," Bali nods. "Let it light the way to Lanka."
    -> act3_bali_companion

=== act3_bali_companion ===
Mahabali and his Legion of Patala join your company.
~ comp_bali = true
# companion_joined: bali

// ACT III COMPLETE - MOVING TO THE FINAL MARCH
-> act4_march_begins
