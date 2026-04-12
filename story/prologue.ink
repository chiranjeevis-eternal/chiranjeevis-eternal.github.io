=== prologue_p1 ===
# title: The World Without Dharma
# yuga: kali

The sky above the hidden valley of Shambhala is not blue. It has not been blue for a century. It is the colour of bruised iron, choked by the invisible weight of a world decaying beyond the mountains. The great tectonic spine of the Himalayas, which has shielded this sanctuary since the dawn of the Treta Yuga, offers no protection against the creeping rot of the age.

You are standing at the edge of the sacred eastern treeline. The wind, usually carrying the crisp scent of pine, crushed juniper, and high-altitude lotus, is completely dead. The air sits heavy in your lungs, stagnant and thick.

It carries the faint, metallic tang of blood spilt a thousand miles away. You are young in this physical vessel—a man barely cresting into adulthood—but the memories locked deep within your blood are older than the continental plates shifting beneath your feet. You feel the unravelling of the Kali Yuga in your very bones. The great wheel of time is grinding to a halt, and it demands blood to turn again.

You wear no armor yet, only the woven cotton of a village ascetic, but a heavy iron blade hangs at your hip. It was forged in silence by elders who refused to meet your eye when they handed it to you. They knew what you were born to do.

+ [Observe the terrible silence of the valley.]
    You close your eyes and push your awareness outward, letting your senses bleed into the periphery. The forest, normally teeming with the chatter of life, the rustle of macaques, and the calls of snow leopards, has gone utterly still. Even the cicadas have silenced their droning. The insects have buried themselves deep in the dirt. It is the terrifying, vacuum-like silence of an environment holding its breath before a blinding strike. You are not alone on this mountain.
    -> prologue_p2

+ [Rest your hand upon your unsheathed blade.]
    ~ karma -= 5
    ~ adharma += 5
    Your fingers instinctively curl around the leather-bound hilt of your sword. It is a reflex born of forgotten lifetimes—the muscle memory of a king who died on a chariot, of a prince who walked into exile. You are reacting to a shadow you cannot yet see. The iron feels cold, hungry, vibrating slightly in your grip. It knows that its long sleep is over. The time for meditation has passed; the time for butchery has arrived.
    -> prologue_p2

=== prologue_p2 ===
# title: The Scent of Smoke
# yuga: kali

A sound breaks the stillness. A sharp, singular crack that echoes off the granite face of the northern gorge. 

Behind you, down in the valley where the elders' thatched huts cluster tightly beside the freezing river, a thin column of thick, oily black smoke begins to rise into the bruised sky. 

It is not a hearth fire. The color is wrong. The smell is wrong—it smells of burning pitch and wet thatch. The warlord’s men—the faceless, brutal disciples of the lieutenant [Adharmendra](https://en.wikipedia.org/wiki/Adharma)—must have breached the valley's ancient wards before dawn. They did not come with war horns or demands for tribute. They moved like dark water seeping through cracks in a fortress wall. Efficient. Silent. Soulless.

You watch an ember drift lazily upward, catching the anemic low light of the morning sun. The invasion of Shambhala has begun. The sanctuary is compromised.

+ [Sprint toward the village without hesitation.]
    ~ dharma += 10
    ~ karma += 5
    ~ prologue_village_approach = "sprint"
    There is no time for complex strategy; there is only immediate duty. You abandon the safety of the treeline and sprint down the rocky incline. Your boots kick up clouds of dry dust. Your mind clears of all philosophical burdens, focusing entirely on the geometry of the descent and the position of the smoke. You will throw yourself between the swords of the invaders and the fragile bodies of the elders who raised you. 
    -> vision_parashurama_1

+ [Wait in the shadows. Keep the high ground.]
    ~ adharma += 5
    ~ prologue_village_approach = "shadows"
    Caution is the armor of the survivor. To rush in blindly is to invite an arrow into the throat. You step backward into the thicket, letting the darkness of the ancient pines swallow you completely. If Adharmendra's soldiers want to conquer Shambhala, they will eventually have to secure the high ground where you stand. You regulate your breathing, slow your heart rate, and wait for the enemy to break formation and come to you.
    -> vision_parashurama_1
