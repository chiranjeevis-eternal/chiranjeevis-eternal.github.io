=== act4_march ===
# title: The March Begins
# yuga: kali
# background: act4
# actMap: act4
# audio: thunder_march

The time for words is over. You lead the Company of Seven and the Army of the Chasm South, toward the obsidian fortress of Adharmendra. The sky above is no longer iron grey; it is black, lit by the periodic, violet flash of the *Vimana of Shadows*.

The Adharma Fog is so thick here that you can barely see the person beside you. But you feel them. Impossibly heavy weights pressing into the earth.

* [Lead from the front.]
    ~ dharma += 10
    {dharma > 60:
        # companion_pulse: vyasa
        Vyasa watches you, his scrolls fluttering. "You do not lead as a man, Kalki. You lead as the Age itself. The light is blinding."
    }
    You draw your iron blade—now glowing with a steady, white heat. The fog withers before you.
    -> act4_koka_gate

* [Walk among the soldiers.]
    ~ karma += 5
# companion_pulse: hanuman
    Hanuman walks beside you. "They are afraid," he notes gently. "Show them your shadow, Avatar, not just your light."
    -> act4_koka_gate

* {comp_bali} [Let Mahabali lead the vanguard.]
    ~ karma += 10
    Bali takes the front. The earth literally bends under his steps. 
    -> act4_koka_gate

=== act4_koka_gate ===
# title: Kali's First Wall
# yuga: kali

At the gates of the obsidian fortress stands **Koka**, the General of the Outer Wall. He is a giant in black mail, but unlike the wraiths, he has honor in his eyes. 

"Kalki!" Koka roars. "One of us must fall today so the world can turn. I challenge you to single combat!"
# encounter: koka

* [Accept the challenge yourself.]
    ~ karma += 10
    ~ dharma += 10
    Sparks fly as iron meets black steel. After a brutal exchange, you disarm him. He kneels. "The age has its champion," he whispers before dissolving.
    -> act4_illusion_field

* {comp_parashurama} [Send Parashurama.]
    ~ karma += 5
# companion_pulse: parashurama
    "An old score," the Guru mutters, his axe catching the violet light. The impact of their clash shakes the fortress walls. Koka falls, laughing.
    -> act4_illusion_field

* {comp_bali} [Send Mahabali to handle his old rival.]
    ~ karma += 10
# companion_pulse: bali
    Bali steps forward. "Your war ended an age ago, Koka." 
    "And yet we are both still here, King."
    -> act4_illusion_field

=== act4_illusion_field ===
# title: The Field of Illusions
# yuga: kali

Beyond the gate, the world turns insane. You see your mother, Sumati, standing in a field of flowers. You see Shambhala unburned. You see your father, Vishnuyasha, calling you home.

It is **Matsarya**, the lieutenant of Envy. The illusion is perfect.

* {comp_hanuman} [Trust Hanuman’s sight.]
# companion_pulse: hanuman
    Hanuman roars, a sound that shatters the silence. "Focus on the scent of the real world, Kalki! It smells of ash!"
    -> act4_adharmendra_clash

* {comp_vyasa} [Ask Vyasa for the counter-sight.]
# companion_pulse: vyasa
    Vyasa unrolls a blank scroll. "An illusion is merely a story told badly," he says. The flowers bleed ink and dissolve into soot.
    -> act4_adharmendra_clash

* [Name the illusion aloud.]
    "This is not my home. This is a grave!" you shout. The flowers turn to bone, and the sky returns.
    -> act4_adharmendra_clash

=== act4_adharmendra_clash ===
# title: The General of the Age
# yuga: kali
# encounter: adharmendra

You push through to the courtyard. Adharmendra waits for you. He is no longer the warlord from your childhood. He is a shell of a man, his armor fused to his skin by violet fire.

"I tried to save them, Kalki," he rasps, raising a broken greatsword. "I took the power Kali offered to protect my kingdom. I... I forgot that power is the very thing he uses to destroy us."

* [Offer him the memory of a king.]
    ~ dharma += 20
    # stat_change: dharma_up
    You lower your blade and show him the mark on your palm. He drops his sword, his eyes clearing for a single second. "Thank you," he says, as he finally turns to dust.
    -> act4_inner_sanctum

* [Strike him down without hesitation.]
    ~ adharma += 15
    ~ karma += 15
    # stat_change: karma_up
    You end his suffering with a single, massive blow. His armor shatters like glass.
    -> act4_inner_sanctum

=== act4_inner_sanctum ===
# title: The Inner Sanctum
# yuga: kali

Before the massive bronze doors of the throne room, shadows coalesce into a thousand armored figures. This is Vikoka's inner guard. 

# companion_pulse: kripacharya
"They intend to drown you in numbers before you reach the throne," Kripacharya observes grimly. "We must split the company to hold the exits."

* [Assign them based on their strengths.]
    ~ karma += 10
    "Parashurama, take the left flank. Vibhishana, shield the scholars. Hanuman, clear my path." They move with perfect synchronicity.
    -> act4_kali_presence

* {comp_ashwatthama} [Ask Ashwatthama to hold the main door.]
    ~ adharma += 10
# companion_pulse: ashwatthama
    Ashwatthama's gem glows with fierce, violent light. "For the first time in millennia," he smiles, "I am allowed to unleash everything."
    -> act4_ashwatthama_moment

* [Tell them all to stay back. You face Kali alone.]
    ~ karma += 15
    ~ dharma += 10
# companion_pulse: vyasa
    Your companions hesitate, then bow. "We will ensure none interrupt you," Vyasa says softly.
    -> act4_kali_presence

=== act4_ashwatthama_moment ===
# title: Ashwatthama’s Moment
# yuga: kali

As you step toward the bronze doors, a detachment of Kali's elite shadow-priests surges from the flanks. They are chanting a nullification mantra designed to extinguish the light of the Avatar.

Ashwatthama steps between you and them. His hands are covered in green, radioactive fire. He could unleash the Brahmastra energy again.

* [Trust him. Let him fight his way.]
    ~ karma += 15
    You do not look back. Ashwatthama roars, not with ancient anger, but with new purpose. The fire does not consume the innocent. He burns only the corruption.
    ~ ashwatthama_betrayed = false
    -> act4_kali_presence

* [Order him to hold back. You don't trust the fire.]
    ~ adharma += 15
    "Even now," he spits, his gem dimming. "Even now, I am only a monster to you." He steps aside.
    ~ ashwatthama_betrayed = true
    -> act4_kali_presence

=== act4_kali_presence ===
# title: Kali’s Offer
# yuga: kali
# background: act5
# encounter: kali
# audio: absolute_silence

You kick open the bronze doors. The inner sanctum is vast, empty of soldiers. Only a single, black mirror stretches from the floor to the ceiling behind a throne of fused gold and bone.

Your reflection does not move. Instead, a figure steps out of the glass. He is vast, his skin the color of an eclipse, his eyes the violet of the Adharma Fog. 
# distortion:start 

This is **Kali**.

"You have gathered your ghosts, Avatar," he says. His voice is incredibly calm, a lullaby of corruption. "But I am not a man you can kill. I am the ego in every heart. I am the greed in every hand. I am the very air you breathe."

He descends from the throne and offers you the handle of his own violet blade.

"Strike me, and you become the judge, the jury, the executioner. You become me. Or... you can stop. We can rule a world of comfort together. No more Yugas. No more hunger. Just the soft, violet peace of the Kali Yuga forever."

* [Refuse entirely.]
    ~ dharma += 10
    "Your peace is a graveyard," you answer.
    -> act4_name_of_age

* [Ask what he would actually preserve.]
    ~ karma += 5
    He smiles. "The comfortable lies that make life bearable. The small, petty joys of ignorance."
    -> act4_name_of_age

=== act4_name_of_age ===
# title: The Name of the Age
# yuga: kali

Kali stops an inch from the tip of your sword. "Before you swing," he whispers, "tell me what you are killing. Name me, Kalki. If you do not know what I am, you cannot end me."

* ["You are Ignorance."]
    ~ kali_name_given = "ignorance"
    ~ dharma += 15
    -> act4_the_strike

* ["You are Ego."]
    ~ kali_name_given = "ego"
    ~ karma += 15
    -> act4_the_strike

* ["You are Time."]
    ~ kali_name_given = "time"
    ~ karma += 5
    -> act4_the_strike

=== act4_the_strike ===
# title: The Strike
# yuga: kali

"So be it," Kali breathes. "Let the Age end."

He lunges. The power of the Kali Yuga compresses into a single point of gravity that threatens to rip your soul from your body.

* {kali_name_given == "ignorance"} [Strike him with the Light of Dharma.]
    # background: kalki_strike
    Your blade ignites with the blinding truth of Vyasa's scrolls.
    -> act4_the_last_choice

* {kali_name_given == "ego"} [Strike him with the Weight of Karma.]
    # background: kalki_strike
    You bring down the sword with the fury of Parashurama's twenty-one dynasties.
    -> act4_the_last_choice

* [Accept the strike, and turn his power against him.]
    # background: kalki_strike
    You let his blade pierce you, anchoring his darkness to the earth, as your own light consumes him from within.
    -> act4_the_last_choice

=== act4_the_last_choice ===
# title: The Last Choice
# yuga: kali

The violet blade shatters. Kali does not die; he shatters into a million fragments of glass that dissolve into the air. He is simply... irrelevant.

The fortress shakes, then stills. The fog outside begins to clear. The sun—a real, burning sun—touches the valley floor for the first time in millennia.

The Chiranjeevis gather around you. Their long walk is over.

"It is done," Hanuman whispers.

* [Announce the New Satya Yuga.]
    ~ karma += 10
    -> ending_resolution

* {kalki_nature == "wanderer"} [Walk away in silence.]
    -> ending_resolution

* {kalki_nature == "sage"} [Ask Vyasa what comes next.]
    -> ending_resolution

=== ending_resolution ===
// 1. The New Satya Yuga (True Ending)
{ dharma > 70 && karma > 60:
    -> ending_satya_yuga
}

// 5. Ashwatthama Redeemed (Hidden Ending)
{ comp_ashwatthama && not ashwatthama_betrayed && karma > 50:
    -> ending_ashwatthama_redeemed
}

// 3. The Sage Ascending (Philosophical)
{ kalki_nature == "sage" && comp_vyasa:
    -> ending_sage_ascending
}

// 6. The Wanderer Walks On (Open)
{ kalki_nature == "wanderer":
    -> ending_wanderer
}

// 7. The Dark Avatar (Dark)
{ karma < 30 && adharma > 40:
    -> ending_dark_avatar
}

// 8. The Eternal Return (Cosmic Balance)
{ karma >= 48 && karma <= 52 && memories_bali_surrender && memories_ashwatthama_curse:
    -> ending_eternal_return
}

// 2. The Warrior's Peace (Heroic / Default High Karma)
{ karma > 50:
    -> ending_warrior_peace
}

// 4. The Fractured Dawn (Default Low Karma)
-> ending_fractured_dawn


=== ending_satya_yuga ===
# title: THE NEW SATYA YUGA
# yuga: satya
# audio: victory_bells

The light from your palm covers the earth, washing away the soot and the ash. The ancient rivers begin to flow again. 

The Chiranjeevis look at each other and smile. They lay down their weapons. Parashurama's axe turns to dust. Hanuman's fur turns to white smoke. They dissolve into the golden light.

The Golden Age is reborn. You are Kalki, the Turner of the Wheel.

# game_over: true
-> END

=== ending_warrior_peace ===
# title: THE WARRIOR'S PEACE
# yuga: kali

The world is different now—the fog is gone, but the scars remain. Shambhala is rebuilt from the stones of the fallen.

You rule for one true generation, a king who remembers the weight of the axe. It is not a perfect age, but it is a just one.

# game_end
-> END

=== ending_sage_ascending ===
# title: THE SAGE ASCENDING
# yuga: dvapara

You drop the sword. The physical world blurs. Vyasa smiles, opening a blank scroll.

"The physical age is only a reflection, Avatar," the Chronicler says.

You do not rule a kingdom. You dissolve into the cosmic memory, becoming the ink that will write the laws of the next creation. 

# game_end
-> END

=== ending_fractured_dawn ===
# title: THE FRACTURED DAWN
# yuga: kali

The battle is won, but the cost was absolute. Shambhala remains in ruins, and the Chiranjeevis vanish back into the shadows. The world is free, but it is cold.

A new age begins, but the memory of Kali lingers in the wind. Justice exists, but it requires constant bleeding to maintain.

# game_end
-> END

=== ending_ashwatthama_redeemed ===
# title: THE REDEEMED WARRIOR
# yuga: dvapara

As the dust settles, Ashwatthama falls to his knees. The red, weeping wound on his forehead—the curse of three thousand years—finally closes.

The gem is gone. He is just a man. He weeps, not with grief, but with profound, devastating relief. You saved the world, but more importantly, you saved its most broken ghost.

# game_end
-> END

=== ending_wanderer ===
# title: THE WANDERER WALKS ON
# yuga: kali

You look at the empty throne. You look at the waiting Chiranjeevis.

Then, you turn your back on the fortress. You leave the sword plunged into the earth. The world has been given back to humanity. What they do with it is their burden, not yours. You walk into the clearing fog, becoming nothing more than a legend.

# game_end
-> END

=== ending_eternal_return ===
# title: THE ETERNAL RETURN
# yuga: satya

The wheel clicks into place. Time folds in on itself. The end is indistinguishable from the beginning.

In the village of Shambhala, a child is born. Ancient texts are read in a crumbling ashram. The signs appear again. The dance never truly ends.

# game_end
-> END

=== ending_dark_avatar ===
# title: THE DARK AVATAR
# yuga: kali

The violet light enters your veins, and your eyes turn the color of the Adharma Fog. Kali's laugh echoes from your own throat.

You sit on the throne of fused gold and bone. The age does not end. It simply finds a more efficient, more terrifying master.

# game_end
-> END
