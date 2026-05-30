=== act4_march ===
# title: The March Begins
# yuga: kali
# background: act4
# actMap: act4
# audio: thunder_march

The time for words is over. You lead the Company of Seven and the Army of the Chasm South, toward the obsidian fortress of Adharmendra. The sky is black, lit by the periodic, violet flash of the *Vimana of Shadows*.

The Adharma Fog is so thick here that you can barely see the person beside you. But you feel them — impossibly heavy weights pressing into the earth. Each Chiranjeevi a different kind of silence.

{aff_parashurama > 15:
    Parashurama walks directly behind you, axe unsheathed. There is something different in the way he carries it today — not with the grip of duty but with the grip of choice. He made a decision somewhere on the road here, and it shows in his shoulders.
}
{aff_hanuman > 15:
    Hanuman has been completely silent since dawn. Not the silence of worry — the silence of total preparation. Every resource gathered, every distraction set aside. When Hanuman is this quiet, the things around him tend to break.
}
{aff_bali > 15:
    Bali has been counting under his breath since the Black Chasm. Not the old countdown — something new. The count of steps remaining. He has waited three thousand years for this march. He intends to remember every step of it.
}

* [Lead from the front.]
    ~ dharma += 10
    {dharma > 60:
        # companion_pulse: vyasa
        Vyasa watches you, his scrolls fluttering. "You do not lead as a man, Kalki. You lead as the Age itself. The light is blinding."
    }
    You draw your iron blade — now glowing with a steady, white heat. The fog withers before you.
    -> act4_koka_gate

* [Walk among the soldiers.]
    ~ karma += 5
    # companion_pulse: hanuman
    Hanuman walks beside you. "They are afraid," he notes gently. "Show them your shadow, Avatar, not just your light."
    -> act4_koka_gate

* {comp_bali} [Let Mahabali lead the vanguard.]
    ~ karma += 10
    Bali takes the front. The earth bends under his steps. The soldiers behind him walk straighter, as if borrowed courage travels through stone.
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

* {comp_vibhishana && aff_vibhishana > 15} [Let Vibhishana speak to him — one fallen king to another.]
    ~ dharma += 25
    # companion_pulse: vibhishana
    # stat_change: dharma_up
    Vibhishana steps forward. He does not draw his shield. He stands before Adharmendra with open hands — the exact posture he used when he walked out of Lanka.
    "I know what the voice promised you," Vibhishana says quietly. "I know how reasonable it sounded. I know what you traded for it and what you thought you were protecting." A pause. "I made the same calculation. I made a different choice. I have regretted the choice every day since and I would make it again."
    Adharmendra's armor stops glowing. The violet light leaks out of him slowly, like poison leaving a wound.
    "I remember being a king," he says. Then he is dust.
    ~ aff_vibhishana += 10
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

The light from your palm covers the earth.

Not a flash — a steady, building warmth, like a sun that has been below the horizon for a thousand years and is finally rising for real. The soot and the ash dissolve. The ancient rivers, sluggish and violet-tinged for generations, run clear.

{comp_parashurama && comp_hanuman && comp_vibhishana && comp_vyasa && comp_bali && comp_kripacharya && comp_ashwatthama:
    All seven Chiranjeevis are here. Every immortal who walked the broken earth for three thousand years — they are all here for this moment. The one they have been waiting for since before the stars found their positions.
}
{not (comp_parashurama && comp_hanuman && comp_vibhishana && comp_vyasa && comp_bali && comp_kripacharya && comp_ashwatthama):
    Some of the Chiranjeevis are here. Not all — but enough. The ones who made it to this moment stand in a loose circle around you, and their long wait is, at last, over.
}

They look at each other. Then they look at you. Then they look at their own hands — the hands that have carried weapons and scrolls and grief for longer than most civilizations have existed.

{memories_parashu_judgment:
    Parashurama looks at his axe for a long time. Then he opens his hand. The axe falls. It does not hit the ground — it dissolves into golden light before it gets there. He makes a sound that is not quite a word. It sounds like relief.
}
{memories_ashwatthama_curse:
    Ashwatthama presses both hands to the gem on his forehead. It does not bleed. For the first time in three thousand years, it simply... does not bleed. He closes his eyes and something in his posture unknots that you have never seen knotted because it was always like that.
}
{memories_bali_surrender:
    Bali looks at the clearing sky with the expression of a man who has just completed a very long count. "Day one," he says quietly. Nobody asks what he means. They all understand.
}
{memories_vyasa_truth:
    Vyasa opens the back of the manuscript to the blank pages. He watches as the ink appears — not slowly, not uncertain, just: appearing. The record, finally permitted to exist. He reads the first line and closes the manuscript without a word.
}

The Chiranjeevis dissolve into the light, one by one — not dying, not disappearing, but *completing*. Joining the light they were always made of.

You are Kalki, the Turner of the Wheel. The Satya Yuga does not arrive because you won a battle. It arrives because enough people, across enough lifetimes, refused to stop believing it was possible.

{kali_name_given == "ignorance":
    The new age's scholars record the Kali Yuga as the Age of Ignorance. The word becomes a diagnosis, not a condemnation — the recognition that most evil is not malice but the failure to look clearly at what one is doing and why.
}
{kali_name_given == "ego":
    The new age's scholars record the Kali Yuga as the Age of Ego — the age in which the self forgot it was connected to everything else, and called that forgetting freedom. The word becomes a mirror.
}
{kali_name_given == "time":
    The new age's scholars record the Kali Yuga as the Age of Time — the most honest accounting. Every age is time. The question is only what is done with it. The naming is its own kind of wisdom.
}

# game_over: true
-> END

=== ending_warrior_peace ===
# title: THE WARRIOR'S PEACE
# yuga: kali

The fog is gone. The battle is won. The world is not golden — it is grey and scarred and exhausted in the particular way of things that have survived rather than thrived.

Shambhala is rebuilt. Slowly, from the stones of the fallen, with the labour of people who are beginning to believe that building something is more interesting than defending themselves against the alternative.

{comp_parashurama:
    Parashurama stays for the first year of rebuilding. He sharpens tools instead of blades. He does not look comfortable doing it. He also does not stop.
}
{comp_kripacharya:
    Kripacharya organizes the new generation of defenders — not an army, but a practice. People who know the cost of war because someone made sure to teach them before Kali's fog could make them forget.
}
{not comp_hanuman && not comp_vyasa:
    The Chiranjeevis who did not make it to this moment are gone back to their corners — Hanuman to his mountain, Vyasa to his manuscripts. You can feel their absence the way you feel a missing tooth: not constantly, but whenever you try to bite down on something difficult.
}

You rule for one true generation — a king who remembers the weight of the axe. Not because you enjoy ruling, but because someone has to stand in the center and hold the shape of the thing while the world remembers how to hold itself. It is not a perfect age. But it is a just one.

{memories_parashu_judgment:
    The patient voice that spoke in the ears of kings — you hear it occasionally, at the edge of sleep, offering comfortable alternatives to the difficult work of maintenance. You close the window every time. Maintenance is not glamorous. It is the only thing that works.
}

# game_end
-> END

=== ending_sage_ascending ===
# title: THE SAGE ASCENDING
# yuga: dvapara

You drop the sword.

It falls in slow motion, or perhaps you are moving in a different time than the blade. By the time it hits the stone floor, you are already somewhere else — not gone, but shifted, the way light shifts when it passes through water.

{comp_vyasa:
    Vyasa smiles. He opens the blank pages of the manuscript — the ones that refused to fill for thirty years — and this time the ink appears immediately. Flooding the pages. Writing itself. He reads a line, then another, and his expression changes. "Oh," he says softly. "That is how it ends."
    He holds the manuscript up so you can see the pages.
    You are the ink.
}
{not comp_vyasa:
    You feel the absence of Vyasa the way you feel the absence of a word you almost remembered. The cosmic memory is there regardless — it does not require a chronicler. It simply continues, untranslated.
}

{memories_vyasa_truth:
    The blank pages he showed you by firelight. The writing that kept fading. Now it is permanent because you are the one writing it. The universe finally consented to record its own ending — because you became the record.
}

You do not rule a kingdom. You dissolve into the cosmic memory, becoming the ink that will write the laws of the next creation. Not a god — a principle. The principle that a single person's refusal to accept the darkness as permanent is enough to begin a new age.

# game_end
-> END

=== ending_fractured_dawn ===
# title: THE FRACTURED DAWN
# yuga: kali

The battle is won. Kali is shattered. The fog is thinning.

And the Chiranjeevis are gone.

Not dramatically — they simply slip away in the hours after, one by one, back to their mountains and their manuscripts and their waiting. They came for the battle. The aftermath is not their function. The aftermath is yours.

{not comp_hanuman && not comp_vyasa && not comp_parashurama:
    You face the aftermath alone — or nearly alone. The survivors from Shambhala are here. They look at you with the specific expectation of people who have followed someone through fire and are now wondering what comes next. You do not entirely know. That is the honest answer.
}

Shambhala remains in ruins. The fog is thinner, not gone. Justice exists in the world now, but it is not self-sustaining — it requires constant, unglamorous maintenance by people who remember why it matters. The work of the next age is not heroic. It is municipal.

{kalki_nature == "wanderer":
    This is, perhaps, the worst possible outcome for someone who is fundamentally a direction rather than a destination. You built a road. You do not particularly want to live on it.
}

A new age begins. Not the Satya Yuga — not yet. But something better than what was. Something that, if tended carefully by people who choose to care, might eventually become the Golden Age on its own.

That is not a bad thing to leave behind.

{kali_name_given == "ignorance":
    The historians of the rebuilt cities call it the Age of Ignorance. The name spreads. It is not used as an insult. It is used as a reminder — here is what happens when a civilization stops asking why.
}
{kali_name_given == "ego":
    The philosophers of the new era write extensively about the Age of Ego. The concept becomes a cornerstone of how the next generation thinks about governance, about power, about the specific way that self-interest convinces itself it is also the world's interest.
}
{kali_name_given == "time":
    "The Age of Time," the first chronicles call it. Every age is time, spent or wasted. The naming sticks not because it is poetic but because it is accurate. The Kali Yuga was an age that forgot it was temporary.
}

# game_end
-> END

=== ending_ashwatthama_redeemed ===
# title: THE REDEEMED WARRIOR
# yuga: dvapara

As the dust settles, Ashwatthama falls to his knees.

The gem on his forehead — the bleeding, weeping, inescapable wound that has been his punishment and his reminder for three thousand years — goes still.

Then dark.

Then absent.

{memories_ashwatthama_curse:
    You remember the tent in the Dvapara Yuga. The blade of grass. The voice speaking between his thoughts in the cadence of his father. The incantation that left his lips before he fully chose it. Three thousand years of bleeding for that one moment. And now it is enough. The universe has counted the time and found the debt paid.
}

The gem is simply gone. No ceremony. No announcement. No cosmic fanfare. Just: a wound that finally closed.

He is just a man. A very old man, standing in the ruins of a fortress at the end of an age, with nothing on his forehead but skin.

He weeps. Not with grief — the grief has been happening for three thousand years and he is finished with it. He weeps with the specific, devastating relief of something long braced finally being allowed to relax. The relief of a man who was told for three millennia that he was not allowed to rest, and who is, for the first time, permitted.

You saved the world. You saved the age. You ended the Kali Yuga.

But Ashwatthama will tell you — if you ask him, in the years that follow — that the thing that mattered most was the moment someone looked at his wound and said: *the voice found you. That is not the same as choosing to be its instrument.*

# game_end
-> END

=== ending_wanderer ===
# title: THE WANDERER WALKS ON
# yuga: kali

You look at the empty throne. The fused gold and bone of Adharmendra's seat of power, now just furniture.

You look at the waiting Chiranjeevis.

{comp_hanuman:
    Hanuman is watching you with an expression that contains no surprise. He has walked with enough Avatars — enough princes who turned back from the path, enough sages who chose the mountain over the court — to recognize the shape of this decision.
}
{comp_parashurama:
    Parashurama puts his axe on his shoulder. He does not bow. He nods, once, slightly. A warrior's acknowledgment of a different kind of courage.
}

You leave the sword plunged into the stone floor of the throne room. Let whoever comes next find it and ask what kind of person left a sword in a stone.

The world has been given back to humanity. What they do with it is their burden, not yours. The fog is clearing. The rivers are flowing. The structures of Kali's age are crumbling — not with violence, but with the ordinary entropy of things no longer maintained by fear.

{memories_kripacharya_war:
    The soldier on Kurukshetra who left no footprints past the edge of the field. You understand now. Not a failure, and not a completion. An interval. A breath between verses. You are walking into the same fog he walked into, becoming the next reference point for whoever is counting the days in the dark.
}

You walk out of the fortress and into the clearing grey. Within a week, your name is a rumor. Within a year, it is a story. Within a generation, it is a principle — the idea that someone walked through the worst age and out the other side, leaving the door open.

That is not nothing.

# game_end
-> END

=== ending_eternal_return ===
# title: THE ETERNAL RETURN
# yuga: satya

The wheel clicks into place.

Not metaphorically. You hear it — a sound like the deepest bell in the oldest temple, felt more than heard, traveling through the stone and the marrow and the specific frequency of a universe adjusting its own position.

Time folds.

{memories_bali_surrender:
    You think of Bali in the darkness of Patala, counting days. The count he kept for three thousand years. The date Vamana gave him that arrived forty years too early because someone fed the rot deliberately. The rot is gone now. The count is complete. In the deep place beneath the world, Bali will finally be able to stop counting.
}
{memories_kripacharya_war:
    The soldier on Kurukshetra who should not have been breathing. The footprints that stopped at the edge of the field. He was not a forerunner — he was a returning. The wheel was already turning then. It is always already turning.
}

In the village of Shambhala, a child is born.

Ancient texts are read in a crumbling ashram by a scholar who will spend forty years not understanding them and twenty minutes, very late in life, understanding everything.

A white horse is seen at the edge of a forest by a girl of nine who will spend the rest of her life trying to describe it to people who were not there.

The signs appear again. Not the same signs — the wheel does not repeat, it *spirals*. Each cycle higher or lower than the last, depending on the choices of the people in it. The specific shape of this return was made in the choices you made, which were made possible by the choices of everyone you walked with, which were made possible by the choices of everyone who came before.

The dance never truly ends. But it gets better at dancing.

# game_end
-> END

=== ending_dark_avatar ===
# title: THE DARK AVATAR
# yuga: kali

The violet light enters your veins.

It is not sudden. That is the surprising part. It does not arrive like a possession or a corruption — it arrives like a conclusion. The logical endpoint of a hundred choices made along the way, each one individually defensible, the sum of which is this.

{kalki_nature == "warrior":
    The blade finds its master. You are still a warrior — you will always be a warrior. But now the edge serves a different Dharma.
}
{kalki_nature == "sage":
    The lamp has not gone out. It simply burns a different color now. The understanding is still there. Only the direction of it has changed.
}

Kali's laugh echoes from your own throat. It does not sound the way you expected a demon's laugh to sound. It sounds reasonable. Satisfied. The laugh of someone who has been proven correct.

{comp_hanuman:
    Hanuman is the last to leave. He stands in the doorway for a long time, looking at you with eyes that have seen the end of one age and the beginning of another and are now watching the end of something different. He does not speak. There is nothing left to say.
}

You sit on the throne of fused gold and bone.

The age does not end. It simply finds a more efficient master. The Kali Yuga, it turns out, did not need a demon king. It only needed an avatar who was tired enough, and angry enough, and given just enough reasonable justification at just the right moment.

The patient voice that spoke in the ears of kings across every Yuga settles into its new home and goes quiet. It does not need to speak anymore. It has found something better than an instrument.

It has found a throne.

# game_end
-> END
