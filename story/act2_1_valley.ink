=== act2_valley_entrance ===
# title: The Valley of Ash
# yuga: kali
# background: act2
# actMap: act2
# audio: valley_wind

You lead the survivors through the narrow throat of the ravine. On the other side, the world opens up into a vast, grey wound in the earth: **The Valley of Ash**.

Once, this was the fertile basin of the Saraswati, but now the river is a shrivelled vein of salt and the soil has been replaced by a knee-deep layer of fine, grey soot—the remains of the cities Kali burned long ago.

The **Adharma Fog** rolls across the valley floor like a living thing, thick and suffocating.

"The air... it tastes of iron and old death," Vanya whispers, wrapping a cloth over her mouth.

* [Focus your internal light. Shield the group.]
    ~ karma -= 5
    ~ dharma += 10
    # stat_change: dharma_up
    You close your eyes, drawing upon the heat in your blood. A faint, golden aura ripples outward from your skin, pushing back the grey mist for a few yards. The villagers huddle closer to you, their breathing slowing.
    -> act2_valley_skirmish

* [Move fast. Death is at our heels.]
    ~ karma += 5
    ~ adharma += 5
    # stat_change: adharma_up
    "Do not stop to breathe," you command, your voice harsh. "The fog only takes those who linger. Run!"
    -> act2_valley_skirmish

=== act2_valley_skirmish ===
Halfway across the waste, the ground begins to churn. Grey shapes—neither man nor ghost—emerge from the soot. They are **Ash-Wraiths**, the echoes of those who died in the Great Fire. They carry blades of jagged glass and their eyes are hollow pits of violet flame.

"To arms!" you roar, drawing your iron blade.

You must choose a **Vyuha** (Tactical Formation) to protect the survivors.

* [The Suchi Vyuha (The Needle): Charge the centre.]
    You place yourself at the tip of a spearhead formation, piercing through the wraith-line. 
    ~ karma += 10
    The wraiths shatter like glass under your blade, but two villagers are dragged into the mist.
    -> act2_valley_outcome

* [The Padma Vyuha (The Lotus): Encircle the weak.]
    You command the few armed men to form a circle around the women and children, with you rotating through the gaps to strike.
    ~ dharma += 15
    The defense holds. Not a single life is lost, but the effort leaves you exhausted and the wraiths eventually retreat into the fog.
    -> act2_valley_outcome

=== act2_valley_outcome ===
# title: The Man with the Axe
# yuga: kali

The immediate danger has passed, but the valley is silent. Too silent.

As you stand amidst the cooling soot of the wraiths, a figure emerges from the fog to the North. He is tall, his skin the color of parched earth, and he carries a single-bladed axe that seems to draw all the light in the valley to its edge.

He does not speak. He simply watches you for three long days as you lead the people toward the Mahendra Peaks. 

Finally, on the eve of the fourth night, he stands before your fire. This is [Parashurama](https://en.wikipedia.org/wiki/Parshurama).

* [Bow before him.]
    "I do not seek your worship, Kalki," he says, his voice like the grinding of tectonic plates. "I seek your resolve."
    ~ dharma += 10
    -> act2_parashu_lesson

* [Stand your ground and wait for him to speak.]
    He nods almost imperceptibly. "Good. A king should not bend his back to a ghost."
    ~ karma += 10
    -> act2_parashu_lesson

=== act2_parashu_lesson ===
# title: The First Lesson
# yuga: kali

"The iron in your hand is heavy," Parashurama says, pointing his axe at your blade. "But it is nothing compared to the iron in your soul. To defeat Kali, you must learn to kill the ego before you kill the man."

He strikes the ground with the haft of his axe. The world shivers.

"Look into my eyes, Avatar. See what happens when a Guru loses his temper."

* [Look into his eyes.]
    The valley vanishes. The ash is replaced by the white peaks of a world that existed before the stars were born.
    -> vision_parashurama_1

=== act2_parashu_choice ===
// This is reached after the vision in visions.ink
Parashurama watches you as you return from the memory of the 21 Dynasties.

"Now you know," he says. "I did what was necessary, and it cost me my peace. Will you do the same?"

* [“I will do whatever is needed for Dharma.”]
    ~ dharma += 20
    ~ karma += 10
    He hands you a sharpening stone. "Then begin. We have much to do before Hanuman finds us."
    -> act2_valley_end

* [“I will find another way. I will not be a butcher.”]
    ~ karma += 20
    ~ adharma -= 10
    He laughs—a cold, short sound. "Then you will have to be wiser than a god. Let us see if you are."
    -> act2_valley_end

=== act2_valley_end ===
The path to the Mahendra Peaks is open. Parashurama walks beside you now, a silent sentinel in the fog.
~ comp_parashurama = true
# companion_joined: parashurama

-> act2_hanuman_arrival

