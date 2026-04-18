=== act4_march ===
# title: The Final March
# yuga: kali
# background: act4
# actMap: act4
# audio: thunder_march

The time for words is over. You lead the Company of Seven and the Army of the Chasm South, toward the obsidian fortress of Adharmendra. The sky above is no longer iron grey; it is black, lit by the periodic, violet flash of the *Vimana of Shadows*.

The Adharma Fog is so thick here that you can barely see the person beside you. But you feel them. Seven immortals, their weights pressing into the earth.

* [Lead from the front.]
    ~ dharma += 10
    {dharma > 100:
        Vyasa watches you, his scrolls fluttering. "You do not lead as a man, Kalki. You lead as the Age itself. The light is blinding."
    }
    You draw your iron blade—now glowing with a steady, white heat. The fog withers before you.
    -> act4_koka_gate

* [Move as a shadow within the army.]
    ~ adharma += 5
    ~ karma += 10
    {karma > 100:
        Vibhishana nods, his shield humming. "Strength is a silent river, Avatar. We move as the shadow of the sword that is yet to fall."
    }
    You stay in the center of the formation, letting the immortals take the initial weight of the darkness.
    -> act4_koka_gate

=== act4_koka_gate ===
# title: The First Wall: Koka
# yuga: kali

At the gates of the obsidian fortress stands **Koka**, the General of the Outer Wall. He is a giant in black mail, but unlike the wraiths, he has honor in his eyes. He recognizes Mahabali.

"Kalki!" Koka roars. "One of us must fall today so the world can turn. I challenge you to single combat!"
# encounter: koka

* [Accept the challenge yourself.]
    ~ karma += 20
    ~ dharma += 10
    Spark fly as iron meets black steel. After a brutal exchange, you disarm him. He kneels. "The age has its champion," he whispers before dissolving.
    -> act4_illusion_field

* [Send Mahabali to handle his old rival.]
    ~ karma += 10
    Bali steps forward. The earth literally bends under their clash. "Go, Avatar!" Bali shouts. "I will hold this wall!"
    -> act4_illusion_field

=== act4_illusion_field ===
# title: The Field of Illusions
# yuga: kali

Beyond the gate, the world turns insane. You see your mother, Sumati, standing in a field of flowers. You see Shambhala unburned. You see your father, Vishnuyasha, calling you home.

It is **Matsarya**, the lieutenant of Envy. The illusion is perfect.

* [Trust Hanuman’s sight.]
    Hanuman roars, a sound that shatters the silence. "Focus on the Tulsi, Kalki! The scent of the real world!"
    -> act4_adharmendra_clash

* [Name the illusion aloud.]
    "This is not my home. This is a grave!" you shout. The flowers turn to bone, and the sky returns.
    -> act4_adharmendra_clash

=== act4_adharmendra_clash ===
# title: The General of the Age
# yuga: kali
# encounter: adharmendra

Finally, you stand before the inner sanctum. Adharmendra waits for you. He is no longer the warlord from your childhood. He is a shell of a man, his armor fused to his skin by violet fire.

"I tried to save them, Kalki," he rasps. "I took the power Kali offered to protect my kingdom. I... I forgot that power is the very thing he uses to destroy us."

* [Offer him the memory of a king.]
    ~ dharma += 30
    # stat_change: dharma_up
    You show him the mark on your palm. He drops his blade, his eyes clearing for a single second. "Thank you," he says, as he finally turns to dust.
    -> act4_kali_presence

* [Strike him down without hesitation.]
    ~ adharma += 20
    ~ karma += 15
    # stat_change: karma_up
    You end his suffering with a single, merciful blow. His armor shatters like glass.
    -> act4_kali_presence

=== act4_kali_presence ===
# title: The Heart of the Age: Kali
# yuga: kali
# background: act5
# encounter: kali
# audio: absolute_silence

The inner sanctum is empty. No throne, no army. Only a single, black mirror that stretches from the floor to the ceiling.

As you approach, your reflection does not move. Instead, a figure steps out of the glass. He is vast, his skin the color of an eclipse, his eyes the violet of the Adharma Fog.

This is **Kali**.

"You have gathered your ghosts, Avatar," he says, his voice a lullaby of corruption. "But I am not a man you can kill. I am the ego in every heart. I am the greed in every hand. I am the very air you breathe."

He offers you the handle of his own violet blade.

"Strike me, and you become the judge, the jury, and the executioner. You become me. Or... you can stop. We can rule a world of comfort together. No more Yugas. No more hunger. Just the soft, violet peace of the Kali Yuga forever."

* [Strike him with the Truth of the Ages.]
    # background: kalki_strike
    -> ending_resolution

* [Accept the offer of peace.]
    -> ending_dark_avatar

=== ending_resolution ===
{
    - dharma > 80 && karma > 80:
        -> ending_satya_yuga
    - karma > 60:
        -> ending_warrior_peace
    - else:
        -> ending_fractured_dawn
}

=== ending_satya_yuga ===
# title: THE NEW SATYA YUGA
# yuga: satya
# audio: victory_bells

The violet blade shatters. Kali is not killed; he is simply... irrelevant. The light from your palm covers the earth, washing away the soot and the ash. The Chiranjeevis look at each other and smile. Their long walk is over.

The Golden Age is reborn. You are Kalki, the Turner of the Wheel.

# game_over: true
-> END

=== ending_warrior_peace ===
# title: THE WARRIOR'S PEACE
# yuga: kali

You strike with the fury of twenty-one dynasties. Kali is driven back into the mirror, and the obsidian fortress collapses. The world is different now—the fog is gone, but the scars remain.

You rule for a generation, a king who remembers the weight of the axe.

# game_over: true
-> END

=== ending_fractured_dawn ===
# title: THE FRACTURED DAWN

The battle is won, but the cost was absolute. Shambhala remains in ruins, and the Chiranjeevis vanish back into the shadows. The world is free, but it is cold.

A new age begins, but the memory of Kali lingers in the wind.

# game_over: true
-> END

=== ending_dark_avatar ===
# title: THE DARK AVATAR
# yuga: kali

You take the blade. The violet light enters your veins, and your eyes turn the color of the Adharma Fog. Kali laughs, and the sound is your own voice.

The age does not end. It simply finds a new master.

# game_over: true
-> END
