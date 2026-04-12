=== act2_vibhishana_arrival ===
# title: The Shore of Shadows
# yuga: kali
# audio: waves_dark

Your journey takes you away from the mountains toward the southern coast. Here, the ocean is not blue, but a churning, violet expanse of Adharma-tainted water. The waves crash with a sound like heavy iron chains.

Standing on the black sand is a warrior in regal, albeit weathered, armor. He holds a shield that hums with a protective frequency.

This is [Vibhishana](https://en.wikipedia.org/wiki/Vibhishana), the younger brother of Ravana, the king who chose Dharma over his own kin.

"You have come at the eleventh hour, Avatar," he says, his voice regal and precise. "Lanka has risen again from the sea, but it is not the Lanka I knew. It is a fortress for Adharmendra's fleet."

* [“We will take it back.”]
    ~ karma += 10
    "A direct assault would be suicide," he says, tracing a map in the sand. "We need a strategist, not just a soldier."
    -> act2_vibhishana_test

* [“How did you survive when your brother fell?”]
    ~ dharma += 10
    "By remembering that a king's first duty is to the truth, not his blood," he replies sadly. "I have outlived my world to ensure yours does not end in fire."
=== act2_vibhishana_test ===
# title: The Council of the Wise
# yuga: kali

Vibhishana stops and looks at the violet waves. "Do you see the ghosts of Lanka, Kalki? My past is a bridge made of ash."

* [Enter the memory.]
    The black sand dissolves into gold and screams.
    -> vision_vibhishana_1

=== act2_vibhishana_strategy ===
# title: The Council of the Wise
# yuga: kali

The three other Chiranjeevis—Parashurama, Hanuman, and Vyasa—gather around the black sand map. The air is thick with the weight of ancient power.

"Adharmendra has a weapon," Vibhishana explains. "The *Vimana of Shadows*. It can rain violet fire from beyond the clouds. To get to him, we must cross the bridge of ghosts."

* [Ask Vibhishana for a strategy.]
    "We use the Adharma Fog as cover," he suggests. "We let them think we are a funeral procession, then strike from within the smoke."
    ~ karma += 5
    -> act2_vibhishana_choice

* [Ask Hanuman for a direct strike.]
    "I will be the wind that clears the sky," Hanuman roars. "Let them see our light before they see our blades!"
    ~ dharma += 5
    -> act2_vibhishana_choice

=== act2_vibhishana_choice ===
# title: The Strategist's Gambit
# yuga: kali

Vibhishana looks at you. "The path to the heart of the darkness requires a sacrifice. Not of life, but of pride. Will you lead from the front where they expect you, or will you move as a shadow?"

* [“I will be the shadow that takes the heart.”]
    ~ adharma += 5
    ~ karma += 10
    # stat_change: karma_up
    Vibhishana nods. "The tactician's path. Rare for a hero, but necessary for a survivor."
    -> act2_vibhishana_companion

* [“I will be the sun that burns the fog.”]
    ~ dharma += 20
    # stat_change: dharma_up
    "Then let the world witness the return of the Avatar," he says, bowing deeply. 
    -> act2_vibhishana_companion

=== act2_vibhishana_companion ===
Vibhishana joins your company.
~ comp_vibhishana = true
# companion_joined: vibhishana

# title: The Tactical Crossroads
# yuga: kali

Vibhishana spreads a map of the continent before you. Two violet sigils pulse on the parchment.

"Kali is a hydra," the King of Lanka explains. "To reach him, we must first cut off his hands. We have two targets within reach."

* [Strike at the Merchant Guilds to the East (LOBHA)]
    "Greed is the fuel of his war machine," Vibhishana nods. "If we break the guilds, his soldiers will starve."
    -> act2_branch_lobha_start

* [Expose the False Temples to the North (MOHA)]
    "Delusion is his strongest shield," Vyasa interjects. "Expose the lies, and the people will no longer fight for him."
    -> act2_branch_moha_start

=== act2_branch_lobha_start ===
The decision is made. Your company turns East toward the gilded spires of the trade cities.
-> act3_trial_lobha

=== act2_branch_moha_start ===
The decision is made. Your company turns North toward the silent, shadowed temples.
-> act3_trial_moha

