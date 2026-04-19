=== act3_trial_lobha ===
# title: The Trial of Greed
# yuga: kali
# background: act3
# actMap: act3
# audio: merchant_drums

Your company reaches the Merchant City of Gilded Spires. The air smells of spice, silk, and the heavy, sweet scent of burning gold. The people here walk with their heads down, their shadows long and violet—a sure sign of the Adharma Fog.

In the center of the Grand Plaza stands **Lobha**, the first of Kali's lieutenants. He looks like a prince, his silk robes shimmering with the logic of a thousand profitable lies.

"Kalki," he says, smiling as if you were an old friend. "Why do you bring an army of ghosts and monsters to a city of wealth? Shambhala is cold and poor. Stay here. I will give you a palace that outshines the sun, and your people will never hunger again."

* [“Your wealth is built on the bones of the poor.”]
    ~ dharma += 15
    # stat_change: dharma_up
    "Moralizing is a luxury of the hungry," Lobha laughs. "But if you refuse my gift, then you choose the hunger."
    -> act3_trial_lobha_conflict

* [“What is the price of this palace?”]
    ~ adharma += 10
    ~ karma += 5
    # stat_change: adharma_up
    "Only your silence," he whispers. "Stop this foolish march. Let the world turn as it will. We are comfortable, are we not?"
    -> act3_trial_lobha_conflict

=== act3_trial_lobha_conflict ===
Suddenly, the violet shadows of the crowd begin to coalesce. Adharmendra's soldiers—the *Ash-Guard*—emerge from the silk-stalls, their blades drawn.

"He refuses the bargain!" Lobha roars, his face twisting into a mask of pure, metallic greed. "Kill the Avatar of Poverty!"

* [Lead a direct charge with Hanuman.]
    ~ karma += 10
    Hanuman becomes a golden blur, his tail knocking the Ash-Guard like pins. You cut through to Lobha.
    -> act3_trial_lobha_result

* [Use Kripacharya's Shakata Formation.]
    ~ dharma += 10
    ~ karma += 5
    Your company forms a defensive square. The Ash-Guard break against your shields like a cold sea.
    -> act3_trial_lobha_result

=== act3_trial_lobha_result ===
Lobha is defeated, dissolving into a pile of fool's gold that turns to ash on the pavement. The city is freed from his immediate grip, but the greed in the hearts of the people remains.

Vibhishana looks at the ash. "One hand of Kali is cut. But the other five are already moving."

-> act3_trial_betrayal

=== act3_trial_betrayal ===
# title: The Trial of Betrayal
# yuga: kali
# calculate_betrayer: true
# audio: betrayal_tension

That night, in the ruins of the Merchant City, the air turns sour. Ashwatthama emerges from the shadows, his forehead-gem pulsing with a frantic, red alarm.

"Someone has spoken to the darkness, Kalki," he rasps. "Adharmendra's scouts have surrounded us. They knew our exact position in the ravine. They were... invited."

Vibhishana checks the map. "He is right. The encryption on our scrolls has been broken from the inside."

* [Ask: “Who among you has spoken to him?”]
    A heavy silence falls. Vyasa looks toward the fire, his stylus frozen. Hanuman grips his mace. Parashurama's eyes are closed, his hand on his axe.
    -> act3_trial_betrayal_confrontation

* [Search the camp in silence.]
    You find a piece of violet silk—the mark of **Mada**, the lieutenant of Arrogance—hidden in the gear of your companions.
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
Parashurama steps forward, his axe heavy in his hands. He does not look at you.
"Mada showed me the future, Kalki. He showed me the city burning even if you win. He promised a peace that didn't require more blood. I have seen enough blood."
-> act3_betrayal_choice

=== act3_betrayer_ashwatthama ===
# companion_pulse: ashwatthama
Ashwatthama steps forward, the gem in his forehead weeping.
"I have been cursed for three thousand years, Kalki. Mada offered to take it away. He offered to let me finally... die."
-> act3_betrayal_choice

=== act3_betrayer_hanuman ===
# companion_pulse: hanuman
Hanuman bows his head, his golden fur dimming.
"Mada offered me a timeline where Rama returned. A lie, I knew it to be a lie... but for just a moment, I wanted the lie more than I wanted this age."
-> act3_betrayal_choice

=== act3_betrayer_vyasa ===
# companion_pulse: vyasa
Vyasa drops his stylus. It shatters on the floor.
"I have written the ruin of ages, Avatar. Mada showed me a world where my scriptures were never needed because there was never any pain. The price was only our obedience."
-> act3_betrayal_choice

=== act3_betrayer_kripacharya ===
# companion_pulse: kripacharya
Kripacharya tightens his grip on his bow.
"A general must know when a war is unwinnable. Mada provided the casualty reports of tomorrow. The math of our survival was zero. I chose the preservation of life over the victory of dharma."
-> act3_betrayal_choice

=== act3_betrayer_vibhishana ===
# companion_pulse: vibhishana
Vibhishana steps forward, his crystalline shield dim.
"My logic was my shield, Kalki. But Mada showed me the tactical impossibility of our win. I was... trying to negotiate a surrender that would save the villagers."
-> act3_betrayal_choice

=== act3_betrayal_choice ===
* [“Dharma is not a bargain with a demon.”]
    ~ dharma += 15
    # stat_change: dharma_up
    You cast the violet silk into the fire. The companion falls to their knees. "Forgive me, Avatar."
    -> act3_trial_kali_voice

* [“I understand. The doubt is his weapon, not yours.”]
    ~ karma += 10
    ~ adharma -= 5
    # stat_change: karma_up
    You offer your hand. The betrayal is forgiven, but the trust has a scar that will never fully heal.
    -> act3_trial_kali_voice


=== act3_trial_kali_voice ===
# title: The Voice of Kali
# yuga: kali
# audio: kali_resonance

The fire in the camp suddenly turns a cold, electric violet. The shadows of the trees stretch toward you like grasping fingers.

A voice—calm, deep, and sounding like a million years of silk rubbing against stone—resonates in your mind. It is not Adharmendra. It is **Kali**) himself.

\*"You are a beautiful tragedy, Kalki. You gather ghosts to fight a shadow. But ask yourself: When you strike me, what comes after? A world of rules? A world of boredom? I am the desire that makes the world move. You are the silence that wants it to stop."*

* [“I am the truth that makes the world clean.”]
    ~ dharma += 20
    # stat_change: dharma_up
    The violet fire explodes. You are thrown back, but your resolve is a shield of diamond.
    -> act3_eve_of_march

* [“If I am silence, then let the world finally rest.”]
    ~ karma += 15
    ~ adharma += 5
    # stat_change: karma_up
    The violet fire withers under your gaze. You have looked into the abyss, and you did not blink.
    -> act3_eve_of_march

=== act3_eve_of_march ===
The morning sun is a pale, iron grey. The time for training and trials is over. The march on the final stronghold begins now.

-> act3_bali_arrival

