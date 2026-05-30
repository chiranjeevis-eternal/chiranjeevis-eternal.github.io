// --- THE PATH OF THE PILGRIM ---
// Travel sequences between major acts.
// Each journey threads the central mystery and uses kalki_nature conditionals.

// ─── ACT 1 → ACT 2: SHAMBHALA TO MAHENDRA ────────────────────────────────────

=== travel_shambhala_to_mahendra ===
# title: The Path of the Pilgrim
# yuga: kali
# background: travel_mountains

You leave the burning ruins of Shambhala behind. The trek to the Mahendra Peaks is not a single leap — it is a slow, grueling climb through a world actively trying to forget its own name.

Vanya walks beside you. Behind you, the survivors carry the legacy of a hundred fallen homes.

{kalki_nature == "warrior":
    You walk at the front without discussion. The others arrange themselves behind you like water following a channel.
}
{kalki_nature == "sage":
    You ask Vanya what she remembers of the valley before Adharmendra's men arrived. Her answer tells you more about the geometry of the attack than any map would.
}
{kalki_nature == "wanderer":
    You drift to the edges of the column, watching the treelines, reading the way the Adharma Fog moves — thicker in the valleys, thinner at ridgelines.
}

* [Choose the High Road: The Ridge of Saffron.]
    ~ karma += 5
    ~ essence -= 10
    The exposed ridges are steep and the wind howls like a wounded god. But you see the world clearly. The full extent of the Adharma Fog below — vast, slow-moving, absolute. You understand for the first time how much is already lost.
    -> travel_mountain_encounter

* [Choose the Low Road: The Whispering Ravines.]
    ~ adharma += 5
    ~ essence -= 5
    The deep gashes in the earth are faster. The wind is muffled. But the silence here has weight — the silence of a place that has been listening for a long time.
    -> travel_mountain_encounter

=== travel_mountain_encounter ===
# title: An Encounter on the Path

Two days in, a lone traveler sits by a dying fire. Rags. A broken lute.

"The music has gone out of the valley," he says without looking up. "Even the strings have forgotten how to vibrate for the truth."

* [Share some of your meager supplies.]
    ~ karma += 10
    ~ essence -= 5
    He takes the bread with trembling hands. "You carry the scent of the First Yuga, boy. The Man with the Axe does not like visitors who smell of hope." He looks up. "I saw a rider. Black horse, no lantern, three nights ago. Moving north ahead of you. Not one of Adharmendra's men. Watching."
    -> travel_first_camp

* [Ask him for news of the north.]
    ~ dharma += 5
    "North is where the iron is forged. The Chiranjeevi waits." He looks at the broken lute. "There was a rider following you for two days. Black horse. Kept its distance. Yesterday it vanished. North."
    -> travel_first_camp

* [Move on without stopping.]
    ~ adharma += 5
    As you press on, the musician's voice follows you down the wind: "The rider on the black horse sees you. Whether it serves you or hunts you — I cannot say."
    -> travel_first_camp

=== travel_first_camp ===
# title: The First Vigil
# background: campfire_overlay

The sun vanishes. You make camp in the lee of a jagged slate cliff.

* [Meditate on the Srivatsa mark.]
    ~ essence += 15
    The golden light in your palm gathers your fatigue. In the glow, you see shapes you cannot quite hold — other hands, other ages, the same mark.
    -> act2_valley_entrance

* [Walk among the survivors.]
    ~ karma += 10
    You listen to their stories. The names of the lost. Their hope is a heavier burden than your sword.
    -> act2_valley_entrance

* [Watch the treeline for the black horse.]
    ~ dharma += 5
    Nothing — until dawn, when you find a single hoofprint in the soft mud at the camp's northern edge. The horse has no shoes. It is not a working animal.
    -> act2_valley_entrance


// ─── ACT 2 → ACT 3: MAHENDRA TO THE LOWLAND PLAINS ──────────────────────────

=== travel_act2_to_act3 ===
# title: The Weight of Company
# yuga: kali
# background: travel_mountains

The descent from the mountain hermitages is different from the ascent. You are heavier now — not with supplies, but with Chiranjeevis. Their presence changes the physics of a march. The survivors hold themselves differently; even the Adharma Fog seems to recede an inch from the camp's edges each morning, as if reconsidering.

{kalki_nature == "warrior":
    Parashurama falls in beside you on the switchbacks. Silence for an hour. Then: "You are different from what I expected." He returns to the front of the column without elaborating.
}
{kalki_nature == "sage":
    Vyasa falls in beside you and hands you a piece of birch bark. Three lines of text in a cipher you cannot read. "When the time comes," he says, "this will matter."
}
{kalki_nature == "wanderer":
    You notice that Vibhishana has been watching you differently since the mountains. Not with suspicion. With recognition. As if you remind him of someone he knew long ago.
}

* [Ride the descent at pace — keep the momentum.]
    ~ karma += 5
    Speed is its own kind of morale. At the valley floor, you find evidence of Adharmendra's scouts — three watchfires, abandoned in haste. Someone told them you were coming.
    -> travel_act2_plains

* [Move slow and careful — scout ahead.]
    ~ dharma += 10
    You send Hanuman ahead. He returns in an hour. "Three positions vacated within the last day," he says. "They knew this route. Not from observation — from intelligence." He does not say more.
    -> travel_act2_plains

* [Stop early — something feels wrong.]
    ~ karma += 5
    ~ dharma += 5
    You cannot name it. But the hair on the back of your neck has been standing since this morning. You call a halt. An hour later, a cascade of loose stone falls across the path you would have been walking. Whether triggered deliberately or by chance — impossible to say.
    -> travel_act2_plains

=== travel_act2_plains ===
# title: The Black Horse Again
# yuga: kali

That night, camped on the first flat ground since the mountains, Hanuman crouches beside you and says quietly:

"The black horse is back. It has been following us since Shambhala. It stands at the edge of our firelight and watches. It is not Devadatta."

At the very edge of the firelight, barely visible, there is a horse the color of a closed eye. No rider. Still as stone.

* [Walk toward it.]
    ~ dharma += 10
    It does not flee. Up close, its eyes are not a horse's eyes — too still, too aware, too old. It steps back into the dark, and the dark seems to breathe with it.
    Where it stood, in the hard clay, there is a single mark: not a hoofprint, but a handprint, fingers spread, pressed deeply.
    Kali has been watching since Shambhala.
    ~ memories_kali_first_contact = true
    -> travel_act2_end

* [Leave it alone.]
    ~ karma += 5
    It stands for two hours. Every Chiranjeevi can see it. None of them speak of it. In the morning it is gone. No tracks.
    -> travel_act2_end

* [Ask Vibhishana what it means.]
    ~ aff_vibhishana += 5
    "In Lanka, Kali sometimes sent projections. Not his body — his attention, shaped." He pauses. "He is not ready to confront you. But he is taking your measure." A thin pause. "He does not appear to be alarmed."
    ~ memories_kali_first_contact = true
    -> travel_act2_end

=== travel_act2_end ===
The plains open up. Three days' march to the first of the great trials.
-> act3_kripacharya_arrival


// ─── ACT 3: KRODHA ENCOUNTER ─────────────────────────────────────────────────

=== travel_act3_krodha ===
# title: The Fire That Came From Inside
# yuga: kali
# background: act3
# audio: battle_hymn

Two days after Kripacharya joins you, the civil war begins.

It does not announce itself. It grows like mold. By midday, two factions of your army have stopped marching near each other. By evening, they are camped on opposite sides of a dry riverbed and the insults have started. By midnight, three people have drawn blades.

The source of the argument, when you locate it, is extraordinary in its smallness: precedence at the water supply.

But behind the smallness you can see the shape of something much older — the specific accumulated grievances of two villages with a history you were never told, being played like strings.

A figure stands at the center. Not fighting, not shouting. Just present. Moving between the groups, saying the precise right thing to keep the fire exactly hot enough not to go out.

This is **Krodha**, the lieutenant of Wrath. He does not look like a demon. He looks like a reasonable man explaining a long list of valid grievances.

* [Confront Krodha directly.]
    ~ dharma += 15
    # encounter: krodha
    You walk to the center of the riverbed and stand between the factions. Krodha turns and looks at you. His eyes are perfectly ordinary. That is the worst thing about him.
    "The Avatar," he says pleasantly. "Whose side are you on?"
    -> travel_krodha_confrontation

* [Ask Kripacharya how to dissolve it.]
    ~ karma += 10
    ~ aff_kripacharya += 5
    Kripacharya watches the figure moving between the factions. "Wrath cannot be defeated by superior wrath. It feeds on confrontation." He thinks. "Introduce an asymmetry. Give one faction something the other does not want — a harder job, a task that sounds prestigious and is genuinely difficult. The resentment redirects upward, toward the task, instead of sideways."
    ~ dharma += 5
    -> travel_krodha_dissolution

* [Let Ashwatthama handle it.]
    ~ karma += 5
    ~ aff_ashwatthama += 10
    He has been crouching, watching. "Yes," he says — as if he has been waiting for exactly this. He does not draw a weapon. He walks between the factions and says, quietly, to no one in particular: "I have seen what this ends like. I have the wound to prove it. Ask me about it."
    The shouting stops. In the silence, Krodha's fire collapses — a rage that is not fed dies of its own weight.
    -> travel_krodha_resolution

=== travel_krodha_confrontation ===

"The grievances are real," Krodha says. "I did not invent them. I only clarified them."

* ["Clarity without context is manipulation."]
    ~ dharma += 20
    # stat_change: dharma_up
    "Perhaps," he concedes, undisturbed. "But context requires patience, and patience is scarce when children are hungry." He spreads his hands. "I only accelerate what is already there. The raw material is always yours."
    -> travel_krodha_dissolution

* ["What do you actually want?"]
    ~ karma += 10
    He smiles, and for one moment the smile is your own face. "What does Wrath always want? To be justified. To be told the anger was proportionate to the wound." He steps back. "I will return. I always do. When the wound is deep enough." He dissolves into the crowd and where he stood is just space between two people.
    -> travel_krodha_resolution

=== travel_krodha_dissolution ===
Kripacharya's strategy works. The faction given the harder assignment redirects their anger upward. The other faction, given no target, finds its grievance deflating into exhaustion. By morning, they share a fire.

Krodha is gone.

"Wrath cannot be killed," Kripacharya says, watching the reunited camp. "It can only be redirected until it burns out." He pauses. "The same is true of the person in your company who has been carrying this fire for weeks. They are not the enemy. They are a wound. Treat them accordingly."
-> travel_krodha_resolution

=== travel_krodha_resolution ===
The march resumes. The two factions walk together — carefully, but in the same direction. For now, that is enough.

In the pattern of how the fight started and how it ended, you can see — if you look carefully — the shape of Kali's preferred method. Not the big dramatic confrontation. The small, legitimate grievance, carefully tended until it becomes a weapon.

The black horse has not been seen since Kripacharya joined. It watches from somewhere you cannot see.
-> act3_ashwatthama_arrival
