=== act2_vyasa_arrival ===
# title: The Cave of Heartbeats
# yuga: kali
# audio: vyasa_cave

Leaving the Mahendra slopes with Hanuman and Parashurama, you descend into a deep, limestone gorge. The air here doesn't move. It feels heavy, saturated with the weight of every word ever spoken.

At the end of the gorge is a cave that glows with a faint, blue bioluminescence. Inside, sitting atop a pile of ancient birch-bark scrolls that could fill a library, is an old man. His beard is as long as a river, and his eyes... his eyes are not looking at you. They are looking at the *entirety* of time.

This is [Vyasa](https://en.wikipedia.org/wiki/Vyasa), the Chronicler of the Ages.

"You are late, Kalki," he says, without looking up from the scroll he is writing. "Only by three centuries, but late nonetheless."

* [“We came as fast as we could.”]
    "Time is not a race, it is a tapestry," he replies, finally setting down his stylus. "And yours is currently full of frayed edges."
    ~ karma += 5
    -> act2_vyasa_test

* [Wait for him to finish writing.]
    He writes for another hour. The only sound is the scratch of the quill. Finally, he nods. "Patience. The first virtue of a king who must outlast an era."
    ~ dharma += 10
    -> act2_vyasa_test

=== act2_vyasa_test ===
# title: The Book of the World
# yuga: kali

Vyasa stands. He is surprisingly tall, his movements fluid despite his age. He walks to a massive stone pedestal where a book bound in what looks like starlight remains open.

"I have written the past. I have written the present. But the pages of the future are still wet with ink that has not yet dried. To lead the Chiranjeevis, you must understand that the war you fight now is merely the final syllable of a very long sentence."

* [“Show me the beginning of that sentence.”]
    He smiles—a sad, knowing expression. "Then look into the Great War. See the field where Dharma was won at the cost of everything."
    -> vision_vyasa_1

=== act2_vyasa_choice ===
// Reached after Vyasa vision in visions.ink
The blue light of the cave feels colder now. The smell of the Kurukshetra mud still lingers in your nose.

Vyasa watches you. "Every action has a reaction, Avatar. To end the Kali Yuga, you must break the cycle of vengeance. Will you carry the grudge of the past, or will you write a new law?"

* [“I will carry the memory, but not the grudge.”]
    ~ dharma += 20
    # stat_change: dharma_up
    "Then you are ready for the wisdom of the scroll," he says. He joins your company.
    -> act2_vyasa_companion

* [“I will be the hammer that breaks the cycle.”]
    ~ adharma += 10
    ~ karma += 15
    # stat_change: karma_up
    He sighs. "A hammer creates nothing but dust. But perhaps dust is all that is left to work with."
    -> act2_vyasa_companion

=== act2_vyasa_companion ===
Vyasa joins your company.
~ comp_vyasa = true
# companion_joined: vyasa

-> act2_vibhishana_arrival
