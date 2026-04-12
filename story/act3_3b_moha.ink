=== act3_trial_moha ===
# title: The Trial of Delusion
# yuga: kali
# background: shadow_temple
# audio: shadow_chants

Your company reaches the Silent Temples of the North. Here, the Adharma Fog doesn't just block the sun—it whispers. It sounds like the voices of your ancestors, telling you to lay down your sword and rest.

In the center of the sanctum stands [Moha](https://en.wikipedia.org/wiki/Delusion), the lieutenant of Delusion. He wears the robes of a High Priest, and his face is a mask of perfect, untroubled peace.

"Why do you bring the fire of war to a place of prayer, Kalki?" he asks, his voice vibrating with a false sanctity. "Kali has not conquered the world; he has simply brought it to a consensus. Join us, and the struggle ends."

* [“Your peace is a cage of lies.”]
    ~ dharma += 20
    # stat_change: dharma_up
    Vyasa steps forward, his birch-bark scrolls glowing with a blue light. "The truth does not need a consensus, Moha. It only needs to be seen."
    -> act3_trial_moha_conflict

* [“Show me this consensus.”]
    ~ adharma += 15
    ~ dharma -= 10
    # stat_change: adharma_up
    The temple walls ripple. You see a vision of a world where no one fights, but no one thinks either. A world of puppets.
    -> act3_trial_moha_conflict

=== act3_trial_moha_conflict ===
The False Priest raises his hands, and the stone pillars begin to bleed violet light. The shadows of the monks turn into reaching claw-hands.

"He refuses the light!" Moha cries, his voice turning into a metallic shriek. "Devour the Avatar of Doubt!"

* [Use Vyasa’s Wisdom to break the illusion.]
    ~ dharma += 10
    Vyasa strikes his staff against the floor. The violet light shatters like glass, revealing the decaying reality of the temple.
    -> act3_trial_moha_result

* [Let Hanuman clear the fog.]
    ~ karma += 10
    Hanuman breathes deep and exhales a gale that tears the False Priest's robes to shreds.
    -> act3_trial_moha_result

=== act3_trial_moha_result ===
Moha vanishes, leaving behind only the cold stone and the echoes of his whispers. The temple is silent again, but the fog in the North has thinned.

Vyasa looks at the altar. "One delusion broken. But the source of the lies still sits on the obsidian throne."

-> act3_trial_betrayal
