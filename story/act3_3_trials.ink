=== act3_trial_lobha ===
# title: The City That Sold Its Shadow
# yuga: kali
# background: act3
# actMap: act3
# audio: merchant_drums

Your company reaches the Merchant City of Gilded Spires — and for a moment, you almost believe the world is fine.

The city is beautiful. Impossibly, obscenely beautiful. Silk awnings in a dozen colors. The smell of cardamom and cedar oil and the kind of bread that takes two days to bake. Children run between market stalls with the loose-limbed ease of children who have never gone hungry. The roads are clean. The lamps are lit in the middle of the afternoon, just because someone could afford to light them.

But the people's eyes are wrong.

They walk with their heads slightly bowed — not in prayer, not in fear, but in the specific posture of people who have decided not to look too closely at anything. Not the soldiers. Not the tax collectors in their silk livery who sit at every corner. Not the foreign-looking men being led in chains through the side streets. They have made an agreement, these people, with the comfort around them: *we will not ask what it cost.*

{comp_vibhishana:
    Vibhishana walks beside you in silence for a long time. Then: "I have seen this before. In Lanka. Ravana kept the capital beautiful and the borders bloody. As long as the city was fed, the city did not ask about the border."
}

In the center of the Grand Plaza stands **Lobha**, Kali's lieutenant of Greed. He looks like a merchant-prince — silk robes, easy smile, the relaxed confidence of a man who has been winning every negotiation for a century.

"Kalki," he says, as if you were an old acquaintance. "What a dramatic entrance. You bring an army of ghosts and axe-carriers to a city of commerce." He gestures broadly at the beautiful square. "Look around you. Are these people suffering? I gave them what they wanted. Comfort. Safety. The small, manageable happiness of not having to think too hard."

His smile does not reach his eyes. His eyes are calculating the cost of everything you are wearing.

"Stay. I will build you a palace that makes Shambhala look like a cattle shed. Your people will never hunger again. All I ask is that you stop marching."

* ["Your comfort is built on the chains in those side streets."]
    ~ dharma += 15
    # stat_change: dharma_up
    The smile flickers — the first real expression you have seen from him. Not anger. Annoyance, like a man whose accounts have been audited. "Moralizing is the luxury of the well-fed," he says. "But you are not well-fed, are you? And neither are the people behind you." He spreads his hands. "If you refuse my gift, you choose their continued hunger. That is also a moral choice."
    -> act3_trial_lobha_conflict

* ["What is the true price of this palace?"]
    ~ karma += 5
    "Only your silence," he says softly. "The march ends here. The Chiranjeevis return to their corners. You become a king, well-supplied and comfortable. The world continues exactly as it is — which is to say, imperfect but tolerable." He leans forward. "The alternative is war. And war is never comfortable."
    -> act3_trial_lobha_conflict

* {comp_vibhishana} ["Vibhishana — you've seen this accounting before."]
    ~ aff_vibhishana += 10
    ~ dharma += 20
    # companion_pulse: vibhishana
    Vibhishana steps forward. His voice is quiet but carries. "In Lanka, we called it the prosperity doctrine. You keep the capital beautiful, the citizens fed, the streets clean. In exchange, they agree not to ask about the cost. The cost is always paid by the people outside the city walls." He looks at Lobha. "I know the ledger. I have seen the other side of it."
    Lobha's smile finally dies completely. "A traitor speaking about accounting. How novel."
    -> act3_trial_lobha_conflict

=== act3_trial_lobha_conflict ===
# shake: subtle

Lobha's silk sleeve drops. Beneath it, a violet bracelet — the mark of Kali's authority. The beautiful square darkens as the tax collectors and silk-sellers drop their costumes, revealing the black armor of the Ash-Guard.

"He refuses the bargain!" Lobha calls, his merchant's voice dropping into something colder. "Demonstrate the cost of refusal."

{kalki_nature == "warrior":
    Your hand is already on your blade.
}
{kalki_nature == "sage":
    You look for the point of structural collapse — the load-bearing column of their formation.
}
{kalki_nature == "wanderer":
    You see the exit routes before you see the enemy.
}

* [Lead a direct charge with Hanuman.]
    ~ karma += 10
    # companion_pulse: hanuman
    Hanuman becomes a golden blur, clearing the plaza in three strides. The Ash-Guard break against him like a wave against a cliff face. You cut through to Lobha directly.
    -> act3_trial_lobha_result

* [Use Kripacharya's defensive formation and wait for them to over-extend.]
    ~ dharma += 10
    ~ karma += 5
    # companion_pulse: kripacharya
    "Shakata," Kripacharya says quietly, and your company locks into a defensive square. The Ash-Guard charge against it and find nothing to grip. Three waves, each dissolving. On the fourth, you counter.
    -> act3_trial_lobha_result

* {comp_vyasa} [Ask Vyasa to expose the lie to the watching crowd.]
    ~ dharma += 20
    # companion_pulse: vyasa
    Vyasa steps to the center of the plaza and speaks — not loudly, but with the carrying quality of absolute conviction. He describes exactly what happens outside the city walls. The price list of the "prosperity." The chains. The border towns.
    The watching crowd goes very still. Lobha's smile freezes. You cannot fight a city that has remembered it can ask questions.
    -> act3_trial_lobha_result

=== act3_trial_lobha_result ===
Lobha is defeated. Not dramatically — he simply stops, looks at the crowd of his own city looking back at him with different eyes, and understands that the transaction is over. He dissolves into a rain of gold coins that clatter on the pavement and turn immediately to rust.

The city exhales. The awnings are still beautiful. The bread still smells good. But the eyes of the people have changed. They are looking at the side streets now. At the people they decided not to see.

Vibhishana watches them. "The hardest thing about corruption," he says, "is that the comfort is real. The question is only whether the comfort is worth the cost. And the only way to answer that is to finally see the cost."

-> act3_trial_betrayal


=== act3_trial_betrayal ===
# title: The Trial of Betrayal
# yuga: kali
# calculate_betrayer: true
# audio: betrayal_tension
# shake: subtle

That night, in the ruins of the Merchant City, the air turns sour.

{memories_kali_first_contact:
    It is the smell Hanuman warned you about weeks ago — the specific incense of Moha's corrupted temples, the one that clings to the skin rather than the clothes. It is in the camp now, close, coming from among your own company.
}

Ashwatthama emerges from the shadows, his forehead-gem pulsing with a frantic, dark alarm — not bleeding, but *dark*, the way it goes when the voice he confessed to you is near.

"Someone has spoken to the darkness, Kalki," he rasps. "Adharmendra's scouts have surrounded us. They knew our exact position in the ravine. They were... invited."

Vibhishana spreads the map on a flat stone. "The encryption on our route-scrolls has been broken from the inside. Not guessed — *known*." He pauses. "A specific cipher. Old. Taught only in one lineage."

{memories_vibhishana_cost:
    Your hand moves to your robe. The intercepted scroll — the one Vibhishana gave you at the camp after he joined you — is still there. You understood then that he was waiting. Waiting for this moment to matter.
}

* [Lay the cipher scroll on the map for all to see.]
    ~ karma += 10
    ~ dharma += 10
    {memories_vibhishana_cost:
        You place the scroll on the map, unfolded. Vibhishana looks at it without surprise — he always knew you were carrying it. The cipher is unmistakable. The specific encryption pattern belongs to one teaching lineage.
        Every Chiranjeevi in the circle looks at the scroll. Then at the person whose lineage matches it.
        -> act3_trial_betrayal_confrontation
    }
    {not memories_vibhishana_cost:
        You spread your hands. "Someone in this circle has been translating our positions. Who?"
        A silence that has weight.
        -> act3_trial_betrayal_confrontation
    }

* [Ask directly: "Who among you has been speaking to the darkness?"]
    ~ dharma += 5
    A silence falls that is longer than any you have experienced since Shambhala. The fire between you pops. Parashurama's eyes are closed, his hand resting on his axe as if it is the only thing he trusts. Hanuman is completely still. Vyasa's stylus has not moved.
    You look at each face. You have been watching for weeks. You know the shape of the observation, even if you do not yet have the proof.
    -> act3_trial_betrayal_confrontation

* [Search the camp in silence before saying anything.]
    ~ karma += 5
    You find it in the folds of a bedroll — a piece of violet silk, the mark of **Mada**, the lieutenant of Arrogance. It is not hidden carefully. It is hidden by someone who did not fully believe they would be searched. Someone who, at some level, wanted to be found.
    -> act3_trial_betrayal_confrontation

=== act3_trial_betrayal_confrontation ===
{ betrayer_id:
    - "parashurama": -> act3_betrayer_parashurama
    - "ashwatthama": -> act3_betrayer_ashwatthama
    - "hanuman": -> act3_betrayer_hanuman
    - "vyasa": -> act3_betrayer_vyasa
    - "kripacharya": -> act3_betrayer_kripacharya
    - else: -> act3_betrayer_vibhishana
}

=== act3_betrayer_parashurama ===
# companion_pulse: parashurama

Parashurama steps forward.

He does not look at you. He looks at the fire.

"Mada found me at the mountain," he says. "He showed me a calculation. The number of lives this march costs. The number of cities that burn on the road to the fortress. He offered a peace that did not require more blood from people who have already bled everything."

He finally looks up. His eyes are the eyes of a man who has spent three thousand years carrying the weight of necessary violence and has, finally, flinched.

"I have killed twenty-one dynasties for Dharma. I believed every one of those deaths was necessary. Mada showed me a future where none of them were." He pauses. "I did not commit. But I listened. And listening was enough."

{memories_parashu_judgment:
    You think of the king in the vision. The open hands. The daughters playing at his feet. You think about what Parashurama's hesitation had cost him even then. The voice had been in his ear before too, centuries ago, speaking in the same patient cadence.
}

-> act3_betrayal_choice

=== act3_betrayer_ashwatthama ===
# companion_pulse: ashwatthama

Ashwatthama steps forward. His gem is the color of an extinguished lamp.

"I told you about the voice," he says quietly. "What I did not tell you is that it found me again. It has been speaking to me since I joined your company." His jaw tightens. "Mada offered to remove the curse. Not the gem — the guilt. He said if I gave Adharmendra our position once, the debt of the Brahmastra would be considered paid. The wound would close."

He looks at the dark gem on his forehead. "I told you I would not be a good person again. I was right."

{memories_ashwatthama_curse:
    This is the conclusion of the argument he described. The hundred smaller agreements. The voice of logic leading to the final concession. He recognized the pattern and made the choice anyway. That is almost worse than not recognizing it.
}

-> act3_betrayal_choice

=== act3_betrayer_hanuman ===
# companion_pulse: hanuman

Hanuman bows his head. His gold fur is dull, like a lamp whose oil has been reduced.

"Mada offered me a vision of a timeline where Rama returned," he says. The words come slowly, as if each one costs something. "Not Rama's presence as a principle, which I have always carried — but Rama. His voice. The actual sound of him speaking." He is quiet for a moment. "I knew it was a lie. I knew it the way you know the difference between a real fire and its reflection in water. And I listened anyway. For three days I listened, and three times I spoke to his agents when they came."

{memories_hanuman_courage:
    You think of the room he didn't burn. The discipline not to. The same discipline, applied here, failed.
}

-> act3_betrayal_choice

=== act3_betrayer_vyasa ===
# companion_pulse: vyasa

Vyasa drops his stylus. It breaks on the stone floor with a sound like a small bone.

"Mada showed me a world in which the Mahabharata was never needed," he says. "A world in which the war never happened. A world in which every person I have written dying — dying because of the logic of the story I was transcribing — simply lived." His voice is very steady. "I have written more death than any ten generals combined. Mada offered me a world in which the pen was never required as a weapon."

{memories_vyasa_truth:
    The blank pages. He has been trying to change ink for three thousand years. Mada found the only wound that could pry open his resolve — the one line he could never rewrite.
}

He looks at you with the expression of a man who has understood something terrible. "The pages about the final battle are blank because I was complicit in erasing them. I believed that if there was no record, perhaps there would be no war."

-> act3_betrayal_choice

=== act3_betrayer_kripacharya ===
# companion_pulse: kripacharya

Kripacharya looks at you with the flat, professional expression of a general giving a casualty report.

"Mada provided projections," he says. "Mathematical projections of the battle for the fortress. The probability of success given your current force composition against Adharmendra's numbers, his terrain advantage, and his artillery." A pause. "The number was not encouraging."

{memories_kripacharya_war:
    You think of the impossible survivor on Kurukshetra. The man who should not have been breathing. Kripacharya catalogued impossibilities — he of all people knows that impossible numbers can be wrong. And still.
}

"I have spent three thousand years teaching students how to count the cost of a war," he says. "Mada simply showed me the cost. The logic was impeccable. The conclusion was that the most ethical choice was to negotiate a conditional surrender before the final march." His eyes are steady. "I was wrong to act on that logic without consulting you. The math was not wrong. The choice of how to respond to the math was."

-> act3_betrayal_choice

=== act3_betrayer_vibhishana ===
# companion_pulse: vibhishana

Vibhishana steps forward. His crystalline shield has dimmed to the color of a cloudy sky.

"I identified the spy three weeks ago," he says. "I identified it as myself."

The silence is different from the others.

"Mada did not offer me comfort or a lie. He offered me information — a complete tactical analysis of what happens if Adharmendra wins. The cities that burn. The names. He was very specific about the names." He pauses. "And then he offered me a negotiated framework that would spare most of those cities in exchange for the route and timing of our march." His voice is precise and controlled. "I told myself I was giving him the least damaging information in exchange for the most protection. I told myself this was tactical wisdom, not betrayal."

{memories_vibhishana_cost:
    The letter he couldn't burn. The same logic, three thousand years later. He chose Dharma over blood then. He tried to choose Dharma over blood now. The difference is that then, he was right.
}

"The intercepted scroll," he says, looking at your robe. "I gave it to you because I wanted to be stopped."

-> act3_betrayal_choice

=== act3_betrayal_choice ===
The fire burns between you.

The companion who has stepped forward is not a traitor in the way of folk stories — not secret, not contemptuous, not gloating. They are a person who found the specific wound that Kali's method always finds, and they were not strong enough to close it in time.

* ["Dharma is not a bargain that can be negotiated with a demon."]
    ~ dharma += 15
    # stat_change: dharma_up
    You cast the violet silk into the fire. The companion flinches as if struck.
    "No," they say quietly. "It is not." They kneel. Not in defeat — in acknowledgment.
    -> act3_trial_kali_voice

* ["The voice found your wound. That is not the same as choosing to be an instrument."]
    ~ karma += 15
    ~ adharma -= 5
    # stat_change: karma_up
    You do not cast the silk into the fire. You hold it.
    "The voice that spoke to you has been speaking since before the Satya Yuga," you say. "It found Parashurama's king. It found Ashwatthama. It will not stop finding wounds — which means the answer is not to have no wounds. It is to know the shape of yours."
    The companion looks at you for a long time. The trust has a scar. Scars can be stronger than unbroken skin.
    -> act3_trial_kali_voice

* ["Why didn't you come to me when it started speaking?"]
    ~ karma += 10
    ~ dharma += 5
    The question lands harder than the accusation would have. The companion's composure finally, slightly, breaks.
    "Because," they say, "I was not sure I wanted to be stopped. And that is the thing I cannot forgive in myself."
    -> act3_trial_kali_voice


=== act3_trial_kali_voice ===
# title: The Voice of Kali
# yuga: kali
# audio: kali_resonance
# shake: subtle

The confrontation is over. The camp is still.

And then the fire turns violet.

Not the orange-gold of wood fire — the cold electric violet of the Adharma Fog at its most concentrated. The shadows of the trees extend toward you like hands. The sound of breathing becomes very loud and then disappears entirely.

{memories_kali_first_contact:
    You have felt this attention before — at the edge of the camp, in the shape of a black horse. This is the same presence, but no longer observing. No longer taking your measure.
}

A voice resonates in the space between your thoughts. Not from outside — from the gap between your heartbeats, the specific frequency that fits in the silence.

Calm. Deep. Patient. Speaking in the register of a teacher explaining something obvious.

*"You are a beautiful tragedy, Kalki. You gather ghosts and broken things and call it an army. But ask yourself: when you strike me — if you strike me — what comes after? A world of rules? A world of constant, grinding Dharma maintenance? I am not the disease. I am the permission that makes the disease comfortable. End me and the disease remains. I will be back in a generation wearing a different face."*

A pause. The violet light pulses.

*"Or: you can stop. Not surrender — just stop. Leave the fortress. Let the age wind down on its own. In three hundred years, the Satya Yuga comes regardless. Three hundred years is nothing to you. It is everything to the people who will die in your march."*

{kalki_nature == "warrior":
    The voice knows exactly which argument to use on a warrior — the cost in lives of the direct approach.
}
{kalki_nature == "sage":
    The voice knows exactly which argument to use on a sage — the long view, the mathematics of patience over violence.
}
{kalki_nature == "wanderer":
    The voice knows exactly which argument to use on a wanderer — the freedom of simply walking away from a problem that will solve itself.
}

+ ["I am the truth that makes the world remember it has a name."]
    ~ dharma += 20
    # stat_change: dharma_up
    The violet fire snaps out. The shadows withdraw. In the sudden silence, you can hear the Chiranjeevis breathing again.
    Vyasa picks up the broken pieces of his stylus.
    -> act3_eve_of_march

+ ["Three hundred years of suffering is not an acceptable patience."]
    ~ karma += 15
    # stat_change: karma_up
    The violet fire dims. Not extinguished — diminished, the way a lamp diminishes when a window is opened. The voice retreats rather than being silenced. It will be back. But not tonight.
    -> act3_eve_of_march

+ ["If you were not afraid of me, you would not negotiate."]
    ~ karma += 20
    ~ dharma += 10
    # stat_change: karma_up
    # shake: strong
    # flash: red
    The silence after this is the most complete silence you have ever heard. Then the violet fire erupts outward and vanishes completely. The shadows are just shadows.
    Ashwatthama exhales slowly. "That," he says, "is the first time I have heard it stop mid-argument."
    -> act3_eve_of_march

- -> act3_eve_of_march

=== act3_eve_of_march ===
# title: The Morning Before
# yuga: kali

The morning sun is a pale, iron grey.

The time for training and trials is over. One hand of Kali cut. One betrayal survived. One voice heard and refused.

The march on the final stronghold begins now.

-> act3_bali_arrival
