=== act1_house ===
# title: The Father's House
# yuga: kali

You are twelve years old when your father, Vishnuyasha, takes you into the inner sanctum of the house. The air here smells of old parchment and the heavy, sweet scent of Tulsi.

"Kalki," he says, his voice a low vibration in the small room. He holds a scroll that looks older than the village itself. "The world outside Shambhala is not the world of the Vedas anymore. It is a world of shadows, where kings have forgotten they are servants of Dharma."

He looks at you with a weight in his eyes that no child should have to carry. "You were born with a mark on your palm. Do not hide it. But do not flaunt it."

* [Ask about the mark.]
    "It is the Srivatsa," he whispers. "The sign that you are not just my son, but a vessel for the turning of the age. Parashurama will come for you when the first black snow falls. Until then, you must be a student of the heart."
    ~ dharma += 5
    -> act1_horse

* [Ask about the kings and the shadows.]
    "They call him Adharmendra," Vishnuyasha says, his hands trembling slightly. "A warlord who has found a way to weaponize the very rot of the Kali Yuga. He burns those who do not bow. We are safe here... for now."
    ~ karma += 5
    -> act1_horse

=== act1_horse ===
# title: The Horse at Dawn
# yuga: kali

Years pass in a blur of scripture and woodcutting. One morning, just as the sun is a bruised purple slit on the horizon, you find a white horse at the edge of the forest. 

He is magnificent—built of muscle and moonlight, with eyes that seem to hold the clarity of a mountain lake. He does not flee. He simply waits.

This is **Devadatta**.

* [Approach him slowly, hand outstretched.]
    He allows you to touch his muzzle. His hide is cold as ice, yet you feel a jolt of heat in your palms. He is not a creature of this earth alone.
    ~ dharma += 10
    -> act1_screams

* [Call for your father.]
    By the time Vishnuyasha reaches the forest edge, the horse is gone. But in the soft mud where he stood, there is a single, glowing footprint of light.
    ~ karma += 5
    -> act1_screams

=== act1_screams ===
# title: The Screams of Shambhala
# yuga: kali

The vision of the mountain peaks of the Satya Yuga vanishes like smoke in a gale. You are back in the present, your feet planted in the dry earth of Shambhala.

From the valley below, the first scream reaches you. It is sharp, absolute, and cut short with the wet sound of iron meeting bone.

In the center of the village square, three soldiers in the lacquered black armor of Adharmendra have surrounded an elder. Their blades are drawn, glowing with a faint, sickly violet light.

+ [Intervene immediately with a frontal strike.]
    ~ karma += 5
    ~ dharma += 10
    You draw your iron blade—the heavy metal vibrating with a sudden heat. 
    -> act1_battle_start

+ [Wait for a strategic opening from the shadows.]
    ~ adharma += 5
    You stay in the periphery, watching for a gap in their black armor.
    -> act1_battle_start

=== act1_battle_start ===
The lead soldier turns. His face is hidden behind a sneer of hammered steel. "Another lamb for the slaughter?" 

* [Parry and counter with precision.]
    ~ karma += 5
    Spark fly as iron meets violet steel. You step inside his guard and strike.
    -> act1_battle_result

* [Unleash a raw, overhead blow.]
    ~ adharma += 5
    You abandon finesse. The impact shatters his guard and drives him to his knees.
    -> act1_battle_result

=== act1_battle_result ===
The other soldiers hesitate. "He's not a villager!" one of them hisses.

+ [Mercy: Save the elder.]
    ~ dharma += 15
    You rush to the elder's side, letting the cowards flee into the smoke.
    -> act1_aftermath

+ [Justice: Strike them down.]
    ~ adharma += 10
    You ensure they never bring his darkness to another village.
    -> act1_aftermath

=== act1_aftermath ===
# title: The Red Snow
# yuga: kali

The threat is gone, but Shambhala is burning. The snow falling from the iron sky is grey with the ash of your childhood home. 

* [Look at your palms.]
    They are glowing with a faint, golden radiance. The mark of the Avatar has awakened.
    -> act1_mothers_wisdom

=== act1_mothers_wisdom ===
# title: The Mother's Wisdom
# yuga: kali

You find your mother, Sumati, in the ruins of the temple. She is tending to a wounded child, her face serene despite the chaos.

"Kalki," she says softly. "Violence is a mirror. If you look into it too long, you will only see the enemy's face where your own should be. Adharmendra was once a king who loved his people. He fell because he feared his own mortality more than he loved the truth."

* [Ask: "Is it wrong to fight them?"]
    "It is wrong to fight without love for what you protect," she replies. "Do not become a sword with no hand to guide it."
    ~ karma += 5
    -> act1_village_elder

* ["I will find him. I will end this."]
    She sighs, a sound of profound grief. "Then find the Man with the Axe first. Only a Chiranjeevi can teach you how to carry that weight without breaking."
    ~ adharma += 5
    -> act1_village_elder

=== act1_village_elder ===
# title: The Elder's Secret
# yuga: kali

Before he passes into the Great Sleep, the village elder pulls you close. His breath smells of iron.

"Thirty years ago... a man came. He carried an axe that never grew dull. He said he was waiting for a boy with a mark on his palm. He is at the Mahendra Peaks, Kalki. He is the last of the old world."

* [Ask about the Axe.]
    "It was not for wood," the elder coughs. "It was for the ego of kings. Go. Find Parashurama."
    ~ dharma += 5
    -> act1_devadatta_speaks

=== act1_devadatta_speaks ===
# title: The Vision of the Horse
# yuga: kali

That night, Devadatta appears again in the camp. He look at you, and for a moment, the world fades. He shows you a vision of a crowned shadow sitting on a throne of bone. He shows you a world where there is no sun, only the violet glow of the Adharma Fog.

He nudges your hand toward the North—toward the mountains.

* [Follow the Vision.]
    You realize the path is not a choice, but a duty.
    ~ dharma += 10
    -> act1_silence

=== act1_silence ===
# title: The Silence Before
# yuga: kali

The final hour of the night is absolute. In the distance, you hear the drums of Adharmendra's army. They are moving South, consolidating their grip. You must move North.

* [Prepare for the journey.]
    You sharpen your blade one last time in the silence.
    -> act1_encampment

=== act1_encampment ===
# title: Under the Crimson Moon
# yuga: kali

The survivors huddle together in the ravine. The Blood Moon of Kali hangs above like a weeping eye.

* [Listen to the wind.]
    *“Survival is not victory,”* the phantom of Parashurama whispers.
    -> act1_encampment_choice

=== act1_encampment_choice ===
Vanya approaches you. "They look to you, Kalki."

+ [Reassure them: "We reach the Peaks together."]
    ~ karma += 10
    ~ dharma += 5
    -> act2_valley_entrance

+ [Warn them: "Prepare for war."]
    ~ adharma += 5
    ~ karma += 5
    -> act2_valley_entrance
