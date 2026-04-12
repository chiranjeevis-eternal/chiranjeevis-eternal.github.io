=== act3_kripacharya_arrival ===
# title: The General Who Survived
# yuga: kali
# audio: military_drums

Following the coast North, your growing company enters a hidden mountain fortress. Here, a small band of warriors trains in absolute silence. Their movements are precise, devoid of the frantic energy of the Shambhala raid.

In the center of the courtyard, an elderly warrior with a silver beard and eyes like sharpened flint is teaching a young recruit the *Garuda Vyuha*.

This is [Kripacharya](https://en.wikipedia.org/wiki/Kripa), the royal teacher of a forgotten dynasty.

"Form is temporary, Dharma is permanent," he says, parrying the recruit's strike with a simple wooden staff. He looks at you. "You have the aura of the Avatar, but the footwork of a villager."

* [“Then teach me how to move as a king.”]
    ~ karma += 5
    ~ dharma += 10
    # stat_change: dharma_up
    He nods. "A king does not move for himself. He moves for the earth below him."
    -> act3_kripacharya_vision

* [“I have outlived Adharmendra's generals without your footwork.”]
    ~ karma += 10
    ~ adharma += 5
    # stat_change: karma_up
    "Luck is a cruel teacher, Kalki," he says dryly. "It makes you believe you are invincible until the moment you are dead."
    -> act3_kripacharya_vision

=== act3_kripacharya_vision ===
# title: Kurukshetra: Day 18
# yuga: dvapara

Kripacharya places his hand upon your iron blade. The cold metal turns warm, then hot.

"I saw the end of the Dvapara Yuga. I saw the day the sun set on the field of bone. See what I saw, before you call yourself a warrior."

* [Enter the memory.]
    The stone courtyard fades. The smell of jasmine is replaced by the smell of iron and decay.
    -> vision_kripacharya_1

=== act3_kripacharya_choice ===
// Reached after Kripacharya vision in visions.ink
The sounds of the great war still ring in your ears—the conchs, the screams, the silence of the aftermath.

Kripacharya looks at you. "Dharma was won, but the cost was a world of widows. To win this war, will you be the general who counts the cost, or the general who only sees the victory?"

* [“I will be the general who counts every soul.”]
    ~ dharma += 15
    # stat_change: dharma_up
    "Then you will carry the heaviest burden of all," he says, bowing his silver head.
    -> act3_kripacharya_companion

* [“I will be the general who ensures the victory.”]
    ~ karma += 10
    ~ adharma += 10
    # stat_change: karma_up
    "A dangerous resolve," he warns. "But perhaps the only one Kali understands."
    -> act3_kripacharya_companion

=== act3_kripacharya_companion ===
Kripacharya joins your company.
~ comp_kripacharya = true
# companion_joined: kripacharya

-> act3_ashwatthama_arrival
