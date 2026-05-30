=== act1_house ===
# title: The Father's House
# yuga: kali

You are twelve years old when your father, Vishnuyasha, takes you into the inner sanctum of the house and closes the door behind him with the specific care of a man who does not want to be overheard.

The room smells of old parchment, sandalwood, and the concentrated attention of a person who has been afraid of the same thing for a very long time. He holds a scroll that looks older than the village. His hands, you notice, are trembling. Not from cold.

"Kalki," he says. His voice is deliberately even. "The world outside Shambhala is not the world of the Vedas anymore. Kings have forgotten they are servants of Dharma. Teachers sell their students' courage for their own safety." He pauses. "I should have told you this sooner. I was afraid that knowing would change you before you were ready."

He unrolls the scroll. On it is your name, written in an ink that shifts color when you look at it directly.

"You were born with a mark on your palm. The Srivatsa. It means something found you before I did. Something older than this village, older than this age."

He holds the scroll against his chest and looks at you with the weight of a love that cannot protect what it loves.

"There is a man at the Mahendra Peaks who has been waiting for you since before you were born. When the black snow falls, he will come." He pauses again. "Be careful about the voices that speak in quiet moments. There is one that sounds very reasonable. I know because I have heard it too."

He does not say what the voice told him. He never will.

* [Ask about the mark.]
    ~ dharma += 5
    "The Srivatsa — the sign of an avatar. Of the turning of the age." He looks at your palm. "Parashurama will come when the first black snow falls. Until then, be a student of the heart, not just the sword."
    -> act1_horse

* [Ask about the voice he mentioned.]
    ~ karma += 10
    He goes very still. "It speaks when you are tired or grieving or certain you have been wronged. It sounds like good sense. Like a friend." A long pause. "Adharmendra — the warlord — I knew him, once. Before. He was a king who loved his people. The voice found him in a year of drought and a bad harvest. He is what he is now." He meets your eyes. "When you hear it — and you will — remember that reasonable is not the same as right."
    ~ memories_kali_first_contact = true
    -> act1_horse

* [Ask about the kings and the shadows.]
    ~ karma += 5
    "Adharmendra." Vishnuyasha's hands tighten on the scroll. "A man who weaponized the rot of the age. He was advised into it. Over many years, by something patient." He says no more about the advisor.
    -> act1_horse


=== act1_horse ===
# title: The Horse at Dawn
# yuga: kali

Years pass in the concentrated way of a childhood that knows it is being used for something.

You learn the Vedas until they live in your bloodstream. You learn the sword until it is an extension of thought. You learn every pass and its weather in every season. Vishnuyasha teaches all of it with the systematic thoroughness of a man who fears he will not have enough time.

One morning, bruised line of sun on the horizon, you find a white horse at the edge of the forest. No saddle, no brand, no rope-wear. He could not have come through the only pass without being seen by the night watch.

He is built of muscle and cold light. His eyes are wrong — too still, too aware of you specifically.

He does not flee. He simply waits, the way things wait when they have been waiting for a very long time and are finally looking at what they waited for.

This is **Devadatta**.

* [Approach him slowly, hand outstretched.]
    ~ dharma += 10
    He allows you to touch his muzzle. His hide is cold as ice, but where your palm meets his skin there is a warmth that belongs to the Satya Yuga — when the world was still honest about its own light.
    His nostrils flare. He exhales slowly, and the breath carries the faint scent of high-altitude lotus, a season that does not exist anymore.
    He has been here before. In other ages, with other hands. You understand, without being told, that you will not be the last.
    -> act1_screams

* [Call for your father.]
    ~ karma += 5
    By the time Vishnuyasha reaches the forest edge, the horse is gone. Only a single hoofprint in the soft mud, filled with faint golden light that dims and vanishes as you watch.
    Vishnuyasha looks at it for a long time. "It has begun," he says quietly. Not with excitement. With the sound of a man whose long preparation is finally over, and who does not yet know if the preparation was enough.
    -> act1_screams

* [Stand still and let the horse decide.]
    ~ dharma += 5
    ~ karma += 5
    You do not reach out. You do not call. You simply stand in the bruised half-light and let the horse decide.
    He takes three slow steps toward you and stops with his nose six inches from yours. Up close his eyes are clearly not the eyes of an animal — they carry something that has witnessed every age, and has chosen, one more time, to be present for the ending of this one.
    He turns and walks back into the forest. This was an introduction, not a gift. He will return when it is time.
    -> act1_screams


=== act1_screams ===
# title: The Screams of Shambhala
# yuga: kali

From the valley below, the first scream reaches you. Sharp, absolute, cut short with the wet sound of iron meeting bone.

In the center of the village square, three soldiers in the lacquered black armor of Adharmendra's army have surrounded an elder. Their blades are drawn, glowing with a faint, sickly violet light — the specific light of weapons blessed by something that is not Dharma.

The elder's name is Chandradev. He taught you the Vedas for eight years. He has a granddaughter with a gap-toothed smile who brings him tea.

+ [Intervene immediately — frontal strike.]
    ~ karma += 5
    ~ dharma += 10
    There is no calculation. Only the immediate arithmetic of duty. You draw your iron blade, which vibrates with a sudden heat that surprises you.
    -> act1_battle_start

+ [Unleash the Mark's raw power.]
    ~ essence -= 30
    ~ dharma += 20
    # flash: gold
    # shake: strong
    The Srivatsa blazes before you consciously decide to use it. The soldiers are thrown back by a concussive wave of pure divinity, their black armor cracking like pottery, violet light spilling from the cracks and dissolving.
    -> act1_aftermath

+ [Wait for a strategic opening.]
    ~ adharma += 5
    Your father's training holds. You stay in the periphery, watching for the gap.
    -> act1_battle_start


=== act1_battle_start ===
The lead soldier turns. "Another lamb for the slaughter?"

* [Parry and counter with precision.]
    ~ karma += 5
    Sparks fly as iron meets violet steel. You step inside his guard — exactly as Vishnuyasha taught — and strike at the gap between pauldron and collar.
    -> act1_battle_result

* [Unleash a raw, overhead blow.]
    ~ adharma += 5
    You abandon finesse. The impact shatters his guard and drives him to his knees. Effective. Expensive.
    -> act1_battle_result


=== act1_battle_result ===
The other soldiers hesitate. "He's not a villager!"

+ [Get to the elder first — let the others flee.]
    ~ dharma += 15
    You rush to Chandradev's side. He is alive. His tea-granddaughter finds him an hour later.
    -> act1_aftermath

+ [Ensure they don't come back.]
    ~ adharma += 10
    You end it. You do not think about it during. You will think about it later, more than you expect to.
    -> act1_aftermath


=== act1_aftermath ===
# title: The Red Snow
# yuga: kali

Shambhala is burning. The snow falling from the iron sky is grey with the ash of your childhood home.

You stand in the center of what was the village square and look at your palms. The Srivatsa mark glows with a faint, golden radiance. Your father was right. The mark has awakened.

Which means Parashurama will come.

Which means everything is no longer preparation.

* [Look for survivors.]
    ~ karma += 5
    You move through the ruins, calling names. Not all of them answer. Enough do.
    -> act1_mothers_wisdom


=== act1_mothers_wisdom ===
# title: The Mother's Wisdom
# yuga: kali

You find your mother, Sumati, in the ruins of the eastern temple. She is tending a wounded child with the specific calm of someone who has always known this day would come and has decided not to let it break what is essential.

She looks up. Her eyes go to the glowing mark on your palm. She nods, once — confirming something.

"Violence is a mirror," she says, wrapping a bandage around the sleeping child's arm with practised precision. "If you look into it too long, you will only see the enemy's face where your own should be."

She ties off the bandage.

"Adharmendra was once a king who loved his people. I knew him briefly, twenty years ago. He was a good man — the kind of good that does not know how to say no to a reasonable-sounding argument for a bad thing." She looks up. "He fell because he feared his own mortality more than he loved the truth. The voice found him in a year of drought. He is what he is now."

{kalki_nature == "warrior":
    She looks at your blade. "The sword is not what you are. It is what you carry until something better is available. Do not confuse the tool with the person."
}
{kalki_nature == "sage":
    She looks at your eyes. "The mind that sees clearly is the most dangerous thing in any age. Do not let it convince you that seeing clearly is the same as acting rightly."
}
{kalki_nature == "wanderer":
    She looks at your feet. "When you walk away from something, make sure it is toward something. Even a wanderer needs a north."
}

* ["Is it wrong to fight them?"]
    "It is wrong to fight without love for what you protect," she replies. "Do not become a sword with no hand to guide it. Find Parashurama first. He has been a sword without a hand for three thousand years. He will teach you everything about why that is dangerous."
    ~ karma += 5
    -> act1_village_elder

* ["The voice you mentioned — does it have a name?"]
    ~ memories_kali_first_contact = true
    She is quiet. "It speaks in the register of a friend," she says. "It offers exactly the right argument at exactly the wrong moment. It has been here as long as the age has been dark." She meets your eyes. "When you hear it, it will sound like your own best thinking. That is how you know it is not."
    ~ karma += 10
    -> act1_village_elder

* ["I will find Adharmendra and end this."]
    She closes her eyes briefly. "Find the Man with the Axe first. Only a Chiranjeevi can teach you how to carry that weight without it reshaping everything you are." She stands. "Go. I will care for what remains here."
    ~ adharma += 5
    -> act1_village_elder


=== act1_village_elder ===
# title: The Elder's Secret
# yuga: kali

Before Chandradev passes into the Great Sleep, he pulls you close. His breath smells of iron and old paper.

"Thirty years ago," he says, with the quietness of someone who has been waiting for the right listener, "a man came to Shambhala. He carried an axe that never grew dull. He spoke to no one except me."

He presses your hand.

"He said he was waiting for a boy with the Srivatsa on his right palm. He said the boy would arrive when the black snow fell. He is at the Mahendra Peaks. He has been there since before your father was born. He is the last person alive who remembers the Treta Yuga from inside."

{memories_kali_first_contact:
    He coughs. Recovers. "The voice that found Adharmendra — Parashurama knows it. He has been fighting it for three thousand years." His grip tightens. "Ask him about the king. The one he hesitated over. He will not want to answer. That is the answer."
}

* [Ask about the axe.]
    "It was not for wood," he coughs. "It was for the ego of kings. For the part of a ruler that forgets the difference between power and service." He releases your hand. "Go. Find Parashurama."
    ~ dharma += 5
    -> act1_devadatta_speaks


=== act1_devadatta_speaks ===
# title: The Vision of the Horse
# yuga: kali

That night, Devadatta appears at the edge of the firelight.

He shows you a vision — not in words, but in something older. You see a crowned shadow on a throne of fused gold and bone. You see a world where the sun has become a rumor. You see every road leading to that throne, and the specific way each road looks reasonable until you are already committed to it.

Then, at the peripheral edge of the vision: something small. A room that doesn't burn. You don't know what it is yet. You will.

Devadatta nudges your hand toward the North.

Not a command. A direction.

+ [Follow the vision.]
    ~ dharma += 10
    You realize the path is not a choice, but a duty. Duty is heavier than choice. More reliable.
    -> act1_silence


=== act1_silence ===
# title: The Silence Before
# yuga: kali

The final hour of the night is absolute. In the distance, the drums of Adharmendra's army move south. You must move north.

* [Prepare to move at first light.]
    ~ karma += 5
    The blade is sharp. The path is north. The world is burning and you are the thing the world made to walk into that burning.
    -> act1_encampment


=== act1_encampment ===
# title: Under the Crimson Moon
# yuga: kali

Twenty-three survivors from Shambhala have gathered in the ravine. Chandradev's tea-granddaughter, who refused to stay behind. Two former soldiers quietly joining the right side. The Blood Moon of Kali hangs above like a weeping eye.

Vanya approaches you. She was a weaver; she walks like someone who has been paying close attention to everything for twenty years and is no longer surprised. "They look to you, Kalki. You should know that."

+ [Reassure them: "We reach the Mahendra Peaks together."]
    ~ karma += 10
    ~ dharma += 5
    "We are not fleeing," you say. "We are moving toward the only person alive who knows what comes next." It is not a comfortable speech. It is an honest one. They respond to honesty better than comfort.
    -> travel_shambhala_to_mahendra

+ [Warn them honestly: "What comes next will be hard."]
    ~ adharma += 5
    ~ karma += 5
    "I will not tell you it is safe," you say. "I will tell you that where we are going is better than where we have been, and that I will be in front of you the whole way." Not a reassurance. A contract.
    -> travel_shambhala_to_mahendra
