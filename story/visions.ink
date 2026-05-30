// --- MEMORY VISIONS ENGINE ---
// Full cinematic memory sequences. Each vision is 200-400 words of immersive prose
// with meaningful branching choices and a mystery thread that connects to present events.

// ─── VISION 1: PARASHURAMA ───────────────────────────────────────────────────

=== vision_parashurama_1 ===
# title: The Weight of the Axe
# yuga: satya
# overlay: memory_vision
# vision_yuga: satya
# vision_title: THE WEIGHT OF THE AXE
# vision_chiranjeevi: PARASHURAMA
# audio: ancient_drone
# shake: subtle

The white peaks of Mahendra Mountain dissolve. In their place rises a palace of black stone and river-jade, its towers reaching into a sky that has not yet learned the color of ash. This is the Satya Yuga — the age when the world was still honest about its own weight.

You are standing in a throne room. The man on the throne is not a monster. He is a father, perhaps fifty years old, with three daughters playing at his feet. This is **King Kartavirya Arjuna**, the sovereign whom Parashurama hunted across twenty-one dynasties.

His daughters are laughing at a butterfly.

The doors explode inward. Parashurama enters, his Vidyudabhi axe already red. The king rises slowly. He does not reach for a weapon. He holds up his open, empty hands.

"I know what you are here for, Chiranjeevi," the king says, his voice stripped of all pride. "I know what I became. I have been... advised, for years, by a voice I should have silenced. I did not. The damage is done."

You can see the king's eyes. There is no malice left in them. Only an exhaustion so deep it has become peace.

Parashurama pauses. His axe trembles. For three seconds — the longest three seconds in the memory — the Chiranjeevi hesitates.

Then the axe falls.

* ["Was he truly a threat at that moment?"]
    ~ aff_parashurama += 5
    Parashurama does not turn to look at you. His voice is granite. "The threat was never the man in front of me. The threat was the twenty-one dynasties watching what he became and choosing to replicate it. One death. Twenty-one lessons." He finally turns, and you see something unexpected — not triumph, but grief. The grief of a man who chose correctly and has regretted it ever since.
    ~ dharma += 10
    ~ memories_parashu_judgment = true
    -> vision_parashurama_reveal

* [Stay silent and watch the daughters.]
    The three girls have frozen. The butterfly is still. The eldest, perhaps twelve years old, is looking directly at you — as if she can see you standing in the vision. Her eyes are the same color as the Adharma Fog.
    ~ karma += 5
    ~ memories_parashu_judgment = true
    -> vision_parashurama_reveal

* ["The voice that advised him. What was it?"]
    ~ aff_parashurama += 10
    ~ dharma += 15
    Parashurama's hand clenches on the axe-haft. "I did not know then. I know now. Patient. Calm. It whispered strategy, not malice — which is the cruelest form of weapon." He looks at you. "The same voice is somewhere in your company, Avatar. I have smelled its reasoning on the wind for weeks. It does not shout. It simply... explains."
    ~ memories_parashu_judgment = true
    -> vision_parashurama_reveal

=== vision_parashurama_reveal ===
A cold understanding moves through you. The king was not wholly evil. He was a man who listened to the wrong voice until he became its instrument. And that voice — patient, calm, offering reasonable justifications for unreasonable acts — you have heard something like it before. Somewhere in the warmth of your own camp.

-> vision_parashurama_exit

=== vision_parashurama_exit ===
# overlay: end
The palace shatters. White peaks return.
-> act2_parashu_choice


// ─── VISION 2: HANUMAN ───────────────────────────────────────────────────────

=== vision_hanuman_1 ===
# title: The Room That Did Not Burn
# yuga: treta
# overlay: memory_vision
# vision_yuga: treta
# vision_title: THE ROOM THAT DID NOT BURN
# vision_chiranjeevi: HANUMAN
# audio: battle_hymn
# flash: red

The cold mountain temple dissolves into an inferno.

You are on the gold-plated roof of Lanka, and the city below you is burning. Not ordinary fire — the righteous, mechanical fire of something that has earned its destruction. Towers of sapphire and crimson coral crack and fall into the sea. The sky is the color of a forge.

Hanuman moves across rooftops, larger than you remembered, his tail a whip of liquid fire. He is deliberate and systematic, burning what needs to burn. There is no joy in his face. Only precision.

Then he stops. He drops to one knee at the edge of a burning corridor. At the end of that corridor is a single room — a small, unadorned chamber of white stone — from which an amber light comes. Not the fire's orange. Something older and quieter.

Inside, seven children sit in a circle. They are praying. They do not run. They do not cry. They hold each other's hands and recite the Gayatri Mantra with the calm of those who have accepted something.

Hanuman's fire-tail hangs in the air behind him. His enormous eyes are fixed on those seven children for a very long time.

He does not burn the room.

* ["Why didn't you burn it?"]
    ~ aff_hanuman += 10
    ~ dharma += 10
    He is quiet for so long that the fire around you becomes a held breath. "Because Dharma told me to burn Lanka," he says at last. "It did not tell me to burn prayer." He turns, and his eyes are fierce and guilty at once. "I have never told anyone about that room." He pauses. "The room still stands. Three thousand years later, a temple was built around it. The priests do not know why the walls are scorched on every side — except the inside."
    ~ memories_hanuman_courage = true
    -> vision_hanuman_aftermath

* [Watch without speaking.]
    The amber light grows stronger, as if the prayer itself is pushing back the fire. Hanuman places one enormous hand against the door frame — not pushing it open. Just resting there. A wall between the fire and the faithful.
    You understand something then. Courage is not the absence of capacity to destroy. It is the discipline not to.
    ~ karma += 10
    ~ memories_hanuman_courage = true
    -> vision_hanuman_aftermath

* ["Did the children survive?"]
    ~ aff_hanuman += 5
    ~ karma += 15
    He nods, slowly. "I returned after the battle. The room was intact. Empty. They had walked out through the fire and no fire had touched them." His voice quiets. "I believe someone was guiding them. Someone who also knew which rooms in a burning world must not be touched."
    ~ memories_hanuman_courage = true
    -> vision_hanuman_aftermath

=== vision_hanuman_aftermath ===
He straightens. The burning city makes his shadow enormous. "There is a room like that in every darkness, Kalki. A small, praying room the fire has not found yet. In Kali's fortress, in your enemies' hearts — there is always one room that must not burn. Finding it before you swing is the whole of wisdom."

-> vision_hanuman_exit

=== vision_hanuman_exit ===
# overlay: end
The fire cools. The gold dissolves. Cold mountain air returns.
-> act2_hanuman_choice


// ─── VISION 3: VIBHISHANA ────────────────────────────────────────────────────

=== vision_vibhishana_1 ===
# title: The Letter He Could Not Burn
# yuga: treta
# overlay: memory_vision
# vision_yuga: treta
# vision_title: THE LETTER HE COULD NOT BURN
# vision_chiranjeevi: VIBHISHANA
# audio: ancient_drone

The scent of ocean salt and sandalwood incense. You are in a corridor of the golden city — Lanka as it was before the war. Perfect, heartbreaking in its beauty.

Vibhishana stands at a writing desk. He is younger, his face unlined. In his left hand he holds a finished letter — addressed to his brother, Ravana. In his right hand, a flame.

He has written the truth in that letter. Everything: what Sita's abduction will cost, the war that will come, the exact shape of the defeat. He has seen it all and written it all down with the precision of love.

The flame in his right hand trembles.

On the desk beside the letter, there is another document — Rama's invitation, smuggled at great risk. An offer of safety. The implicit understanding that accepting it means leaving his brother to die.

Vibhishana cannot burn the warning letter. He has tried three times. The flame keeps going out.

* ["Why can't you burn it?"]
    ~ aff_vibhishana += 10
    ~ dharma += 10
    He does not look up. "Because destroying a truth, even one that will not be believed, is its own betrayal. I crossed to Rama's side. But I never stopped loving my brother. This letter—" he presses it to his chest— "is proof that I tried." He looks at you. "A truth that arrived too late is not a failure of the truth. It is a failure of the listener."
    ~ memories_vibhishana_cost = true
    -> vision_vibhishana_revelation

* [Watch without speaking as he makes his choice.]
    He puts the flame out. Folds the letter carefully. Places it inside his robe. Picks up Rama's invitation and reads it one final time — a man memorizing an exit door. Then he stands and walks toward the corridor that leads out of Lanka forever.
    He does not look back. Not once.
    You think you understand loyalty now. True loyalty sometimes looks, from the outside, exactly like betrayal.
    ~ karma += 10
    ~ memories_vibhishana_cost = true
    -> vision_vibhishana_revelation

* ["Did Ravana ever know you tried to warn him?"]
    ~ aff_vibhishana += 5
    ~ karma += 10
    His voice is careful. "Two days before the final battle, his messenger returned my letter — unopened. Ravana had always known I would leave. He chose pride over his own life rather than read a truth written in love." A pause. "In your company, Kalki, there is someone who is already receiving unopened letters. Someone writing warnings to themselves that they are refusing to read."
    ~ memories_vibhishana_cost = true
    -> vision_vibhishana_revelation

=== vision_vibhishana_revelation ===
He looks at you, and there is something specific in his gaze — a recognition that was not there when you first met him outside the valley.

"I know the smell of a person standing at that writing desk," he says quietly. "Someone writing a warning they have not yet decided whether to send. I have been watching your company since the mountains. I have not yet decided what to tell you."

He will say nothing more. Not yet.

-> vision_vibhishana_exit

=== vision_vibhishana_exit ===
# overlay: end
The golden corridor fades. The smell of ocean salt lingers a moment longer than it should.
-> act2_vibhishana_choice


// ─── VISION 4: VYASA ─────────────────────────────────────────────────────────

=== vision_vyasa_1 ===
# title: The Line That Refused to Change
# yuga: dvapara
# overlay: memory_vision
# vision_yuga: dvapara
# vision_title: THE LINE THAT REFUSED TO CHANGE
# vision_chiranjeevi: VYASA
# audio: ancient_drone

A small hut at the peak of Badrinath. Outside, stars arranged in constellations that no longer exist. Inside, by a ghee lamp, an older Vyasa sits at a manuscript the size of a door.

The Mahabharata. You are watching it being written.

His hand moves with the speed of pure transcription — not composing, but *receiving*. The story of every king, every warrior, every widow, every animal caught in the crossfire flows through his hand onto bark-paper.

Then he stops.

He reads back what he has just written. Slowly puts down the stylus. With his other hand, he picks it back up and writes a single word — a different word — over what was there.

The ink refuses. The word he changed unfolds back into the original. Like water finding its level. The bark-paper did not resist. The *universe* resisted.

He tries again. Three times. Four times, bearing down until the stylus bends.

The word always returns.

The name in the passage is **Abhimanyu**. And the word that returns every time — the word Vyasa cannot change — is *dies*.

* ["Could nothing be done for him?"]
    ~ aff_vyasa += 10
    ~ dharma += 10
    Vyasa lays the stylus down like a wounded thing. "He chose it. Not consciously — his every choice across sixteen years pointed toward that field on that morning. The Mahabharata is not a book of tragedies. It is a book of choices." He looks at you with great steadiness. "You will make choices in the next weeks that the book cannot change either. I have left the pages blank. But blank is not the same as empty."
    ~ memories_vyasa_truth = true
    -> vision_vyasa_revelation

* ["If the future is written, why do we choose?"]
    ~ aff_vyasa += 5
    ~ dharma += 5
    ~ karma += 5
    He almost smiles. "The current of the river is determined. But where you choose to swim — against it, with it, sideways to it — that is entirely yours." He taps the manuscript. "I have written the war. I have not written the quality of mercy inside it. That is always extemporaneous."
    ~ memories_vyasa_truth = true
    -> vision_vyasa_revelation

* ["Whose name is hardest to write?"]
    ~ aff_vyasa += 15
    He goes very still. "Yours." He turns to the back of the manuscript — and you see them: the final pages, blank, but stained as if writing had been there and been erased. "Someone has been removing the ink. Not from outside — from within the story itself. Something does not want the ending recorded." His voice drops to near silence. "Something, or someone, inside the story is afraid of their own last line."
    ~ memories_vyasa_truth = true
    -> vision_vyasa_revelation

=== vision_vyasa_revelation ===
He closes the manuscript. The lamp gutters.

"The pages of the final battle are blank, Kalki. I have checked every morning for thirty years. Either the battle has not yet been decided — or someone is actively preventing the universe from recording its outcome." A long pause. "Both possibilities disturb me equally."

-> vision_vyasa_exit

=== vision_vyasa_exit ===
# overlay: end
The lamp goes out. The hut vanishes. The cold blue cave returns.
-> act2_vyasa_choice


// ─── VISION 5: KRIPACHARYA ───────────────────────────────────────────────────

=== vision_kripacharya_1 ===
# title: The Soldier Who Should Not Be Breathing
# yuga: dvapara
# overlay: memory_vision
# vision_yuga: dvapara
# vision_title: THE SOLDIER WHO SHOULD NOT BE BREATHING
# vision_chiranjeevi: KRIPACHARYA
# audio: ancient_drone
# shake: subtle

Kurukshetra. The morning after.

The birds have not returned yet. The crows have not arrived. It is the silence between the last death and the first lament — a silence that exists in no other kind of time.

Kripacharya moves through the field alone, cataloguing. As the sole surviving teacher of both armies, this is his responsibility now: to account for every name, so that widows and histories have something to hold. He moves with an archivist's precision.

Three hours in, at the northern edge, he finds a soldier who is breathing.

The soldier has an arrow through the chest, one through the thigh, and a sword wound across the collarbone that should have severed the artery. Kripacharya saw Abhimanyu strike this man himself. He catalogued the fatal blow at the time.

Yet here the soldier breathes. Shallow. Steady. Clear.

Kripacharya kneels. The soldier's eyes open. Not fevered, not delirious. Clear in the way things are clear after a very long sleep.

And on the soldier's right palm — unmistakable, glowing faintly in the dawn light — is the mark of the Srivatsa.

* ["Who was the soldier?"]
    ~ aff_kripacharya += 10
    ~ dharma += 10
    "He had no name in the rolls. No regiment, no lineage. He said only — his voice perfectly steady — 'I came too early. The world was not ready. Tell the next one to wait until the Chiranjeevis remember.'" Kripacharya pauses. "Before dawn, he was gone. Footprints led to the edge of the field and stopped. No tracks past that point." He looks at you. "You are not the first attempt, Kalki. Something has been trying to turn the wheel for a very long time."
    ~ memories_kripacharya_war = true
    -> vision_kripacharya_revelation

* ["What did you do?"]
    ~ aff_kripacharya += 5
    ~ karma += 10
    "I covered him with my cloak and resumed cataloguing. When I returned an hour later he was gone. I wrote in my records: one unidentified soldier — status unclear." He makes a sound that might be a dry laugh. "Historians have argued about that entry for three thousand years. They think it was a scribal error." A pause. "It was not."
    ~ memories_kripacharya_war = true
    -> vision_kripacharya_revelation

* [Sit beside the soldier and watch him breathe.]
    In the grey light of Kurukshetra's aftermath, watching a man who should be dead sleep the sleep of the healing, something tightly wound in your chest slightly loosens. You do not know his name. You do not need to. The mark on his palm is enough. The world has been trying to right itself for longer than anyone knows. You are not the correction — you are the latest attempt.
    ~ dharma += 15
    ~ karma += 5
    ~ memories_kripacharya_war = true
    -> vision_kripacharya_revelation

=== vision_kripacharya_revelation ===
Kripacharya stands. The battlefield stretches to the horizon.

"Every age has tried to produce its answer," he says. "Not every attempt succeeded. The fact that you are standing here — do not mistake that for destiny. Destiny is the river. How you cross it is entirely yours." He looks at the pale sky with the patience of a man who has waited three thousand years for this particular morning. "Dharma leaves no footprints on any field. It simply finds the soldier who is still breathing."

-> vision_kripacharya_exit

=== vision_kripacharya_exit ===
# overlay: end
The grey field of Kurukshetra fades. The mountain fortress returns.
-> act3_kripacharya_choice


// ─── VISION 6: ASHWATTHAMA ───────────────────────────────────────────────────

=== vision_ashwatthama_1 ===
# title: The Voice Before the Brahmastra
# yuga: dvapara
# overlay: memory_vision
# vision_yuga: dvapara
# vision_title: THE VOICE BEFORE THE BRAHMASTRA
# vision_chiranjeevi: ASHWATTHAMA
# audio: kali_resonance
# distortion: start
# shake: strong

Night. A tent at the edge of the Kuru camp. Drona's son is alone.

His father is dead — not in battle, but by trickery. The greatest teacher in the world, the man who taught both armies how to hold a bow, killed by a lie. Ashwatthama is twenty-four years old and the grief inside him has no container.

He holds a blade of grass.

In this precise, terrible moment you are witnessing as a ghost — he has not yet decided. The Brahmastra requires an incantation he knows. Every student of Drona knows it. Knowing it and speaking it are different things, and between knowing and speaking there is a gulf as wide as every moral teaching his father ever gave him.

He stands at the edge of that gulf.

And then a voice speaks.

Not from outside the tent. Not from inside it. From somewhere *between* his thoughts — in the gap between one heartbeat and the next. Calm. Measured. Speaking in the precise cadence of strategy. Not malice. Not hate. *Logic*.

**"The war ends when the line ends. The Pandavas have no heir. End the line. The suffering concludes."**

It speaks the way Drona used to speak. Just like that. The reasonableness of it is the worst part.

+ ["You heard Kali's voice."]
    ~ aff_ashwatthama += 15
    # distortion: start
    The young Ashwatthama's head turns — toward you, but not quite. "I did not know its name then," the older voice comes from behind you, very quiet. "I know it now. That voice — patient, logical, speaking in the register of teachers — has been active across every Yuga. It finds the grief. It finds the weapon inside the grief's hand. And it speaks." He breathes. "It has spoken to someone in your camp, Kalki. I recognize the cadence now. I should have told you earlier. I was afraid of what it would mean if I was right."
    ~ memories_ashwatthama_curse = true
    -> vision_ashwatthama_revelation

+ [Watch without speaking as the young man raises the grass blade.]
    # distortion: start
    His lips form the first syllable. The tent walls shudder. The air turns green.
    And in the microsecond before the word completes — before everything becomes irreversible — you see it. A shape in the shadows behind him. Not quite there. A figure of patience and cold calculation.
    It was in Parashurama's throne room. In Vibhishana's corridor. In Vyasa's lamp-light.
    You are not looking at Kali's physical form. You are looking at his method — the whisper-shape he sends ahead of himself.
    ~ dharma += 10
    ~ memories_ashwatthama_curse = true
    -> vision_ashwatthama_revelation

+ ["Would you do it again, now that you know?"]
    ~ aff_ashwatthama += 10
    The question lands like a stone in still water. The young figure freezes at the edge of the irreversible. The older voice is silent for a long time.
    "No." Just that. Then: "The curse is not punishment. It is a lesson I have been too proud to fully learn until now. The voice is patient. It does not rush. By the time it speaks, it has already been watching for decades."
    ~ memories_ashwatthama_curse = true
    -> vision_ashwatthama_revelation

- -> vision_ashwatthama_revelation

=== vision_ashwatthama_revelation ===
# distortion: end
# shake: subtle

The tent collapses into light. The older Ashwatthama steps forward, his gem the color of cooling embers.

"The voice speaks through grief. It finds an open wound and tends it carefully until the wound makes the choice the voice intended." He meets your eyes directly. "In your company, there is a wound I have been watching. Not malice — old pain that has been cultivated. Carefully." He pauses. "I have not said who because I am not certain. And I am also afraid that if I name them before they choose, the voice will simply move to the next wound."

-> vision_ashwatthama_exit

=== vision_ashwatthama_exit ===
# overlay: end
# distortion: end
The Dvapara night fades. The grey mountain pass returns.
-> act3_ashwatthama_choice


// ─── VISION 7: MAHABALI ──────────────────────────────────────────────────────

=== vision_bali_1 ===
# title: The Counting in the Dark
# yuga: satya
# overlay: memory_vision
# vision_yuga: satya
# vision_title: THE COUNTING IN THE DARK
# vision_chiranjeevi: MAHABALI
# audio: ancient_drone

There is no light.

You are in the deepest chamber of Patala, 3,247 meters below the world's roots. The cold here is absolute and clean — the cold of mathematics, of stone, of time accounting for itself. Above you, the Kali Yuga has not yet begun.

Bali sits on his throne in total darkness. He has been here for four hundred years already. He will be here for two thousand more.

He is counting. Very quietly, under his breath. Not years. Days.

Then a small lamp appears — not from a source you can identify, but simply there, as if darkness decided one candle was permissible. By its light, Vamana sits on the step below the throne, no longer the tiny dwarf, but no less than he ever was.

"You are still counting," Vamana says. An observation, not an accusation.

"Day forty-seven thousand, two hundred and eight," Bali confirms.

Vamana holds out a piece of folded cloth. On it: a date — specified in planetary alignments, in the exact position of the Saptarishi stars. The morning when the Avatar will arrive at the Black Chasm.

"When you feel this alignment," Vamana says, "leave Patala."

Bali studies the cloth for a very long time. "This date is forty years from today's alignment in the surface world."

Vamana begins to fade.

"Why forty years from now?" Bali asks.

Silence.

* ["The date on the cloth doesn't match when you arrived, does it?"]
    ~ aff_bali += 15
    ~ dharma += 10
    Bali turns toward you with the calm of someone who has had three thousand years to process a shock. "The alignment I felt — the one that pulled me from Patala — was forty years earlier than the date on the cloth." He folds the cloth with care. "I assumed the acceleration was natural. The Kali Yuga compressing. Dharma failing faster than the prophecy accounted for." He looks at you steadily. "But compression of this magnitude does not happen naturally. Someone fed the rot. Deliberately. From inside the very movement fighting it." A long pause. "I have been waiting for the right moment to tell you."
    ~ memories_bali_surrender = true
    -> vision_bali_revelation

* [Sit with Bali in the dark and count with him.]
    In the silence of Patala, you count alongside him. Day forty-seven thousand, two hundred and eight. Nine. Ten. Then you feel it — the date on the cloth is wrong. The alignment that pulled him out arrived forty years too soon. Something compressed the timeline. Forty years of Kali's corruption, front-loaded, weaponized, delivered in advance.
    ~ karma += 15
    ~ memories_bali_surrender = true
    -> vision_bali_revelation

* ["What does arriving forty years early mean?"]
    ~ aff_bali += 10
    ~ karma += 10
    "It means the prophecy was accurate for the timeline that existed when Vamana wrote it," Bali says. "The Kali Yuga should have taken another forty years to reach this nadir. Someone from within your world — not from outside it — has been accelerating the corruption. Feeding Kali power he should not yet have." He looks at the cloth. "Whoever did this understood the mechanism. They had access to the centres of Dharmic power." His voice is absolutely still. "They have been inside your world for a very long time."
    ~ memories_bali_surrender = true
    -> vision_bali_revelation

=== vision_bali_revelation ===
The lamp goes out. In the darkness, Bali's voice is very careful.

"The acceleration is not finished. Whoever fed the rot is still feeding it. They have been doing so across multiple Yugas — which means they are either extraordinarily patient, extraordinarily long-lived, or—" He pauses. The pause has the weight of a conclusion he has been refusing to reach. "—or they are not a single person. They are a *method*. And the method has found a new instrument in your time."

In the dark, you hear something. Very faintly.

The sound of someone counting.

-> vision_bali_exit

=== vision_bali_exit ===
# overlay: end
The darkness of Patala gives way to the grey light of the Black Chasm. Bali stands before you.
-> act3_bali_choice
