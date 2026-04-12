=== act1_screams ===
# title: The Screams of Shambhala
# yuga: kali

The vision of the mountain peaks of the Satya Yuga vanishes like smoke in a gale. You are back in the present, your feet planted in the dry earth of Shambhala, but the weight of Parashurama's axe still feels as though it lingers in the phantom heat of your palms.

From the valley below, the first scream reaches you. It is sharp, absolute, and cut short with the wet sound of iron meeting bone.

{ prologue_village_approach == "sprint":
    You are already moving, your heart hammering against your ribs like a trapped bird. You reach the first circle of huts in a blur of motion, your lungs burning with the sharp intake of ash and mountain air. The stench here is unbearable—the smell of burning grain mixed with something deeper, more visceral.
- else:
    You descend with measured steps, a shadow moving between the ancient pines. You reach the edge of the clearing, your eyes scanning the chaos for the source of the sound. You are a predator now, watching the prey from the safety of the dark.
}

In the center of the village square, three soldiers in the lacquered black armor of [Adharmendra](https://en.wikipedia.org/wiki/Adharma) have surrounded an elder. Their blades are drawn, glowing with a faint, sickly violet light—the mark of the Adharma Fog. The elder—your teacher, the man who taught you the names of the stars—is on his knees, blood staining his white dhoti.

+ [Intervene immediately with a frontal strike.]
    ~ karma += 5
    ~ dharma += 10
    ~ kalki_first_blood = true
    The time for observation died with that first scream. You draw your blade—the cold, heavy iron vibrating with a sudden, localized heat as it catches the firelight. You step into the square, your voice a low thunder that halts the soldiers in their tracks.
    -> act1_battle_start

+ [Wait for a strategic opening from the shadows.]
    ~ adharma += 5
    You stay in the periphery, watching their footwork. They are disciplined, but arrogant—drunk on the ease of their conquest. They do not expect a counter-strike in this sanctuary. You wait for the lead soldier to turn his back, his attention fixed on the elder's throat.
    -> act1_battle_start

=== act1_battle_start ===
The lead soldier turns. His face is hidden behind a mask of hammered steel, shaped into a sneer of eternal contempt. 

"Another lamb for the slaughter?" he mocks, his voice sounding like dry leaves skittering over stone. He raises his violet-edged blade, the Adharma Fog rolling off the steel in oily waves.

The world slows. You feel the presence of the [Chiranjeevis](https://en.wikipedia.org/wiki/Chiranjivi) watching you from across the divide of time. This is the first true test of the Avatar.

+ [Parry his strike and counter with precision.]
    ~ karma += 5
    As he lunges, you don't retreat. You step into his guard, the iron of your blade meeting his violet steel with a shower of white sparks. The force of the impact vibrates up your arm, but you feel the strength of a hundred ancestors behind your grip. You twist the blade, catching his hilt, and deliver a short, brutal punch to the steel of his face-mask.
    -> act1_battle_result

+ [Unleash a devastating, overhead blow.]
    ~ adharma += 5
    ~ karma -= 5
    You abandon finesse for raw, terrifying power. You bring your sword down in a vertical arc that screams through the air. The soldier barely manages to raise his blade in time. The impact is not a clang; it is a crunch. His sword shatters, and the force of your strike drives him to his knees, his armor cracking beneath the weight of your wrath.
    -> act1_battle_result

=== act1_battle_result ===
The other two soldiers hesitate. They see one of their own—a seasoned killer of the Kali Yuga—bested in a single breath by a village youth. The violet light on their blades flickers, momentarily weakened by the sudden surge of your presence.

"He's not a villager!" one of them hisses, his voice cracking with a fear he hasn't felt in decades.

Behind them, the elder looks up, his eyes wide despite the blood-loss. "Kalki..." he whispers. "The wheel... it turns..."

But the battle is not over. The lead soldier, though wounded, reaches into his belt for a small, obsidian vial. He intends to unleash a concentrated burst of the Adharma Fog to mask their retreat.

+ [Mercy: Allow them to flee. Save the elder.]
    ~ dharma += 15
    ~ karma += 10
    You lower your blade and rush to the elder's side, ignoring the soldiers as they smash the vial and vanish into a cloud of violet smoke. Their lives are not worth the second it would take to save your teacher. You press your hands against the wound, feeling the warmth of his life-blood. "I am here," you promise.
    -> act1_aftermath

+ [Justice: Strike them down before they can escape.]
    ~ adharma += 10
    ~ karma -= 10
    You do not let them leave. As the lead soldier reaches for the vial, you are already mid-swing. Your blade cuts through the violet fog, meeting flesh and bone. One by one, they fall, their black armor clattering against the stones of the square. Shambhala will not be a sanctuary for those who bring the darkness of Kali.
    -> act1_aftermath

=== act1_aftermath ===
# title: The Red Snow
# yuga: kali

The immediate threat is gone, but the valley is no longer silent. The sound of burning thatch and the distant cries of other villagers fill the air. The snow falling from the iron sky is no longer white; it is grey with the ash of your childhood home.

As you stand in the square, the heavy iron of your sword feels lighter. Or perhaps you have simply grown accustomed to the weight. 

Something is different. The air around you seems to vibrate with a soft, steady hum. 

+ [Look at your hands.]
    Your palms are glowing with a faint, golden radiance that refuses to be suppressed by the falling ash. The mark of the Avatar is no longer a hidden memory; it is a physical reality.
    -> act1_next_step

+ [Look at the sky.]
    For the briefest of seconds, the iron clouds part. A single ray of pure, blinding sunlight strikes the center of the village square, illuminating the blood and the ash alike.
    -> act1_next_step

=== act1_next_step ===
The first battle of the Age of Kali is over, but the war has only just begun. You know now that the Chiranjeevis were not just waiting for you to be born. They were waiting for you to wake up.

-> act1_encampment

=== act1_encampment ===
# title: The Encampment
# yuga: kali

You must gather those who remain and find a way to the Mahendra mountains. The path will be long, and the disciples of Adharmendra will be searching for the light you have just unleashed.

-> the_end
