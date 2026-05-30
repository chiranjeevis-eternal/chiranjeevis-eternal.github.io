// --- THE CAMPFIRE INTERACTION ENGINE ---
// Deep companion conversations during travel intervals.
// Each camp contains mystery threads, kalki_nature branches, and affinity consequences.

// ─── CAMP 1: AFTER PARASHURAMA ───────────────────────────────────────────────

=== camp_post_parashurama ===
# title: The First Night
# yuga: kali
# background: act1

You make camp on the high slopes of the Mahendra Peaks. The wind cuts like iron. Parashurama sits bare-chested near the fire, immune to the cold, scraping a whetstone against his axe in the slow rhythm of something done ten thousand times.

{kalki_nature == "warrior":
    He watches you clean your own blade. "You hold it like a craftsman," he says. From him, that is high praise.
}
{kalki_nature == "sage":
    He watches you writing in the dirt with a stick. "A warrior who maps before he moves," he says. "Good."
}
{kalki_nature == "wanderer":
    He watches you look at the horizon. "You are already calculating the next road," he says. "The next Chiranjeevi is not one you find. He finds you."
}

* [Ask about what lies ahead.]
    He does not stop scraping. "Hanuman. Do not approach him with a sword in your mind. He will test your devotion, not your martial prowess. Devotion is harder to fake than a sword arm." He pauses. "The voice I warned you about — the patient one that advised the king — I have heard it before. It is not Kali's own voice. Kali is vast and theatrical. This voice is small and specific. Keep that in mind."
    ~ aff_parashurama += 5
    -> camp_post_parashurama_end

* [Ask about his burden.]
    "The kings I killed are not heavy," he says. "It is the ones I spared who weigh on me. The ones I gave a second chance who used it badly." He scrapes the whetstone once more. "Mercy requires more precision than judgment. I was always better at judgment."
    ~ aff_parashurama += 10
    -> camp_post_parashurama_end

* [Meditate and conserve Essence.]
    ~ essence += 20
    You turn inward, gathering fragments of your Atman. For the first time in days, the sound of blood in your ears quiets.
    -> camp_post_parashurama_end

=== camp_post_parashurama_end ===
As dawn paints the peaks in bruised violet, you break camp and move further north.
-> act2_hanuman_arrival

// camp_post_parashurama_end routes to act2_hanuman_arrival (defined in act2_2_hanuman.ink)


// ─── CAMP 2: AFTER HANUMAN ───────────────────────────────────────────────────

=== camp_post_hanuman ===
# title: The Smell on the Wind
# yuga: kali
# background: act2

The camp is larger now — two Chiranjeevis, forty survivors from Shambhala, three village militias from the foothills. You have stopped in the lee of a ruined watchtower, its stones older than the dynasty that built it.

Hanuman does not sleep. He sits cross-legged at the edge of the firelight, enormous eyes fixed on the dark perimeter. The survivors give him a wide berth, though none can say exactly why.

* [Ask what he is watching for.]
    ~ aff_hanuman += 5
    He does not answer immediately. Three full minutes pass. Then: "Smell the wind, Kalki. Not the smoke, not the pine — underneath it."
    You breathe deeply. Under the woodsmoke and cold altitude there is something else. Sweet. The ghost of a specific incense — the kind burned only in the temples that Moha has corrupted.
    Hanuman's voice drops to a murmur. "One of our people carries it. Not on their clothing — on their skin. Someone who has been inside one of those temples recently." He pauses. "I have said nothing because I am not certain enough to accuse. But I have been watching."
    ~ memories_kali_first_contact = true
    -> camp_post_hanuman_end

* [Ask about the room he didn't burn in Lanka.]
    ~ aff_hanuman += 10
    He turns to look at you, and for a moment his expression is entirely unguarded. "So you saw that." He is quiet. "I have never shown that memory to anyone before. Not in three thousand years." He looks back at the dark. "I showed it to you because the same situation is coming. In Kali's fortress there is a room that must not burn. I do not yet know which room it is. When we find it, you must hesitate. Even at the last moment. Especially at the last moment."
    -> camp_post_hanuman_end

* [Check on the survivors instead.]
    ~ karma += 10
    You move among the small fires. An old weaver. A blacksmith with a broken arm, still carrying his tools. A girl of nine with a thin grey cat that watches you with amber eyes and no visible alarm. You learn their names. You listen to what they lost.
    When you return, Hanuman is watching you. "Good," he says simply.
    -> camp_post_hanuman_end

=== camp_post_hanuman_end ===
The cold deepens before dawn, as it always does — the world's last protest before the sun returns. You break camp and move toward the cave of the Chronicle-Keeper.
-> act2_vyasa_arrival


// ─── CAMP 3: AFTER VYASA ─────────────────────────────────────────────────────

=== camp_post_vyasa ===
# title: The Blank Page
# yuga: kali
# background: act2

Three Chiranjeevis. The camp has an electric quality — the survivors sense it without understanding it. Parashurama does not mingle with them. Hanuman walks the perimeter in silence. Vyasa sits at the center, his birch-bark scrolls spread before him, writing by firelight.

He is not writing the story. He is checking the same page — the last page — again and again. Looking for ink that refuses to appear.

* [Ask about the blank page.]
    ~ aff_vyasa += 10
    He hands you the final section of the manuscript — the section that should contain the account of the final battle. The pages are there but every attempt to write on them results in prose that fades within an hour, leaving no trace.
    "It is not that the story has not happened yet," he says quietly. "I have written future events before. This is different. Something is *preventing* the record." He looks at the fire. "This has only happened once before in the entire manuscript. The passage describing the traitor of the Kuru war — the one who opened the gates." He folds the pages. "Someone does not want their role in the final battle recorded. That means there is a role to hide."
    ~ memories_vyasa_truth = true
    -> camp_post_vyasa_end

* [Ask whether Vyasa knows who the betrayer in your company is.]
    ~ aff_vyasa += 15
    ~ karma += 10
    He sets down his stylus. "I know things I cannot prove. The nature of knowing without proof is the curse of the Chronicler." He pauses. "Parashurama noted the voice in the king's ear. Hanuman smells incense. Vibhishana has been watching a letter-writer. Three independent observations pointing in the same direction." Another pause. "I will not say the name. Names have weight. When you are ready — come to me. I will tell you what I know. Not before."
    -> camp_post_vyasa_end

* [Ask whether the final battle can be won.]
    ~ dharma += 10
    "Every battle in the Mahabharata was winnable by either side," he says. "The question was never capability. It was always choice." He rolls up the blank pages. "The blank pages may not be a threat. They may be an invitation. The universe may simply be waiting to see which ending you choose before it commits to the record."
    -> camp_post_vyasa_end

=== camp_post_vyasa_end ===
The fire gutters. The Chiranjeevis fall into their separate silences. The thin grey cat from Shambhala appears at your elbow without sound and sits, looking out at the same horizon you are watching. You feel watched. Not by an enemy. By a question.
-> act2_vibhishana_arrival


// ─── CAMP 4: AFTER VIBHISHANA ────────────────────────────────────────────────

=== camp_post_vibhishana ===
# title: What Vibhishana Has Not Said
# yuga: kali
# background: travel_mountains

Four Chiranjeevis. The camp is on the plains now, the mountains behind you, the grey lowland cities of Adharmendra's territory on the southern horizon.

Vibhishana stands apart from the others, looking south with the expression of someone re-reading a memorized letter.

* [Approach him quietly.]
    ~ aff_vibhishana += 5
    He speaks without turning. "Three days ago, I intercepted a scroll that was not addressed to any of us." He holds it out. The message inside is written in an old cipher — but one of the Chiranjeevis knows that cipher. Their teaching lineage is embedded in the structure of it. "I have not shown this to anyone else," Vibhishana says. "I am showing it to you because you are the Avatar and this is your decision to carry."
    {prologue_village_approach == "sprint":
        He adds: "One more thing. Adharmendra's men saw your face clearly at Shambhala. They will be expecting you at the front. Consider that the expectations of an enemy are also a kind of map."
    }
    ~ karma += 10
    ~ memories_vibhishana_cost = true
    -> camp_post_vibhishana_scroll

* [Tell him you trust his judgment entirely.]
    ~ aff_vibhishana += 10
    ~ dharma += 10
    Something in his expression shifts — not quite relief, but a relaxation of vigilance. "Trust given unconditionally is not wisdom," he says. "But trust extended with eyes open is the currency of alliances." He hands you the intercepted scroll. "I need you to look at this and tell me if I am wrong. I very much want to be wrong."
    -> camp_post_vibhishana_scroll

* [Ask about the voice that speaks in logical cadences.]
    ~ aff_vibhishana += 15
    "I heard it once. In Lanka, before I left. It was not Kali's voice — Kali is vast and theatrical. This voice is small and specific. It speaks in the logic of necessity." He looks at the horizon. "It has been speaking to someone in this camp for at least three weeks. I believe I know who. I believe they do not know they are being spoken to."
    ~ memories_vibhishana_cost = true
    -> camp_post_vibhishana_scroll

=== camp_post_vibhishana_scroll ===
You look at the intercepted scroll in your hands. The cipher inside is elegant and old — the kind taught by one specific teacher to a specific generation of students.

You fold it and place it inside your robe. The question it raises will keep until morning. Some questions only reveal their full weight in daylight.
-> travel_act2_to_act3


// ─── CAMP 5: AFTER KRIPACHARYA ───────────────────────────────────────────────

=== camp_post_kripacharya ===
# title: The Night Watch
# yuga: kali
# background: act3

Five Chiranjeevis. You are in the grey country between the last valley and the first of Kali's strongholds. The air tastes of burned wire.

Kripacharya wakes you at midnight. No explanation. Just a hand on your shoulder and a tilt of the head toward the perimeter.

You follow him to the ridge overlooking the camp. He points.

One figure is not asleep. They have left the firelight and stand at the far edge of the ridge, looking north — directly toward Adharmendra's fortress. Perfectly still. Listening.

They slip back into the camp before you can identify them. The ease with which they move is the ease of someone who has done this before.

* ["Do you know who that was?"]
    ~ aff_kripacharya += 10
    "I know which direction they faced," he says. "North. Toward the fortress. For nine minutes." He does not speculate aloud. "I have observed it twice before this week. The same person, the same direction, a counted duration." He shakes his head. "I do not accuse. I observe. But you should know the shape of the observation."
    ~ memories_kripacharya_war = true
    -> camp_post_kripacharya_end

* ["Have you told the others?"]
    ~ aff_kripacharya += 5
    "I have told no one. Paranoia in a camp at this stage is more dangerous than any single spy." He looks at you steadily. "I am telling you because the decision about what to do with the information must be yours. That is what an Avatar is — not someone who is always right, but someone who accepts the full weight of a choice."
    -> camp_post_kripacharya_end

* [Watch the empty ridge where the figure stood.]
    {prologue_village_approach == "shadows":
        You remember the figure you saw during the village approach. Not one of Adharmendra's soldiers — a watcher. The same silhouette. The same stillness. You have been sharing a camp with them for weeks.
    }
    The ridge is empty and cold. Somewhere below, the figure has returned to their blankets, their breathing indistinguishable from all the others. Nine minutes facing north. Listening.
    ~ dharma += 5
    -> camp_post_kripacharya_end

=== camp_post_kripacharya_end ===
You return to the camp without speaking. The fire has burned low. Every face in the firelight is familiar and opaque.
-> travel_act3_krodha


// ─── CAMP 6: AFTER ASHWATTHAMA ───────────────────────────────────────────────

=== camp_post_ashwatthama ===
# title: The Confession
# yuga: kali
# background: act3

Six Chiranjeevis.

Ashwatthama finds you alone, away from the others, an hour before midnight. His gem is darker than you have seen it — not bleeding, just profoundly dark, the color of a secret held too long. He sits without invitation. He waits a long time before speaking.

"I need to tell you something," he says at last. "Something I have not told Parashurama, Vyasa, or Kripacharya."

* [Listen without interrupting.]
    He tells you what you saw in the vision — but in his own words, from the inside. The tent. The grief. The voice that spoke between his thoughts in the cadence of his father. The incantation.
    "I knew it was wrong even as I spoke it," he says. "But the voice had been patient. Reasonable. For months. By the time it asked for the final thing, I had already agreed to a hundred smaller things. The Brahmastra was not an act of madness. It was the conclusion of a very long argument I had been losing."
    He looks at you. "That same argument is happening in this camp. I can hear the echo of it in someone's silences. In the way they watch the northern horizon." He pauses. "I am telling you this because we are approaching the moment of final conclusion. The last thing the voice will ask for will seem small. Necessary. Logical. It is not."
    ~ aff_ashwatthama += 15
    ~ memories_ashwatthama_curse = true
    -> camp_post_ashwatthama_choice

* ["Can you identify who is hearing the voice?"]
    ~ aff_ashwatthama += 10
    His jaw tightens. "I believe so. I can recognize its fingerprint in a person's reasoning — the way they frame choices, the questions they ask." He looks at his hands. "I need one more day of certainty before I speak a name. If I am wrong, the accusation will do more damage than the voice itself." He looks up. "But I will tell you this: the person hearing it is not doing so willingly. They do not know. And that is the most dangerous kind of instrument — a good person who has been carefully aimed."
    ~ memories_ashwatthama_curse = true
    -> camp_post_ashwatthama_choice

* ["Do you trust yourself, now that you know what happened?"]
    ~ aff_ashwatthama += 20
    The question lands in him like something that has been falling for three thousand years and finally hits ground.
    "Not entirely," he says quietly. "But I trust the wound more than I trust the silence. The gem bleeds so I cannot forget what I cost. Three thousand years of not forgetting has made me better at recognizing the cost before it is paid." He puts his hand over the gem. "Assign me the most dangerous position in the final battle. Not as punishment. Because I am the one who knows exactly where the voice will try to speak at the worst possible moment."
    ~ ashwatthama_betrayed = false
    ~ karma += 15
    ~ dharma += 10
    ~ memories_ashwatthama_curse = true
    -> camp_post_ashwatthama_choice

=== camp_post_ashwatthama_choice ===
# title: The Crossroads
# yuga: kali

Vibhishana finds you before dawn, his strategic map unrolled on a flat stone.

"Two paths," he says. "To reach Kali, we must first cut off his hands. We have two targets within reach."

* [Strike the Merchant Guilds to the East — Lobha.]
    "Greed is the fuel of his war machine," Vibhishana nods. "Break the guilds and his soldiers starve within a month."
    -> act3_trial_lobha

* [Expose the False Temples to the North — Moha.]
    "Delusion is his strongest shield," Vyasa interjects from the dark. "Expose the lies and the people will simply stop fighting. Not because they are defeated. Because they see."
    -> act3_trial_moha


// ─── CAMP 7: AFTER BALI ──────────────────────────────────────────────────────

=== camp_post_bali ===
# title: The Eve of Everything
# yuga: kali
# background: act4

All seven Chiranjeevis. The final camp.

Adharmendra's fortress is visible on the horizon — a jagged silhouette of black stone, lit from within by the violet glow of the Adharma Fog. It looks the way a wound looks when it has become an identity.

The camp is very quiet. The survivors from Shambhala sit in small groups, not speaking much. Bali has made a wall of himself at the northern perimeter and the cold wind stops at him.

* [Walk among the Chiranjeevis one final time.]
    ~ karma += 10
    ~ dharma += 10
    Parashurama sharpens, but tonight his strokes are slower. Hanuman has his eyes closed, memorizing faces — you can tell by the way his expression moves. Vyasa has stopped trying to write the blank pages. He has set them aside and is writing something small and careful on a separate piece of bark. You do not read it. It is not for you. Vibhishana stands alone, watching the fortress. He holds the intercepted scroll. You understand now that he has always known what it means — he was waiting for you to be ready. Kripacharya walks the perimeter with the thoroughness of a man who intends to be the last person standing. Ashwatthama sits apart, his gem fully dark. He gives you a short, definite nod as you pass. Whatever he decided, he has decided it.
    -> camp_post_bali_end

* [Sit alone with the intercepted scroll and read it in full.]
    The cipher finally yields entirely. It is a report — your company's movements, your route, your vulnerabilities, in precise detail. At the bottom, where a signature should be, there are three words: *I tried to stop.*
    ~ karma += 5
    ~ memories_kali_first_contact = true
    -> camp_post_bali_end

* [Ask Bali about the forty-year acceleration.]
    ~ aff_bali += 10
    "Someone fed Kali forty years of compressed suffering," he says. "One complete generation of people who grew up in accelerated darkness. Who never knew a world where the Adharma Fog was thin." His voice is not angry — it is grieving. "They were not corrupted. They were deprived. There is a difference." He pauses. "Whoever fed the rot — I find I am less interested in punishment than in whether they chose it knowingly, or were themselves an instrument."
    -> camp_post_bali_end

=== camp_post_bali_end ===
The night deepens. The violet glow of the fortress does not change.

Somewhere in the camp, a child from Shambhala begins to sing — a low, wordless song. One of the old ones. The kind that predates language, that existed before the first Yuga had a name.

The Chiranjeevis hear it, one by one, and each of them stops what they are doing.

Even Parashurama stops sharpening.

You break camp before dawn.
-> act4_march
