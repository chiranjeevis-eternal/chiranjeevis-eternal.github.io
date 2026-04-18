=== act2_hanuman_arrival ===
# title: The Wind Before the Rain
# yuga: kali
# audio: hanuman_wind

As you leave the Valley of Ash and approach the lower slopes of the Mahendra range, the weather shifts. The stagnant Adharma Fog is suddenly torn apart by a violent, cleansing gale that smells of crushed jasmine and mountain ozone.

Parashurama stops in his tracks, his eyes narrowing. "A Treta wind," he mutters, his grip tightening on his axe. "The Old Monkey still knows how to make an entrance."

At the gates of an abandoned rock-temple, a figure stands silhouetted against the setting sun. He is massive, his fur the color of burnished gold, draped in a simple saffron cloth. 

This is **Hanuman**, the first of the Chiranjeevis to find you after your Guru.

* [Bow immediately.]
    ~ dharma += 10
    You drop to one knee. The sheer force of his presence—vibrating with the energy of a thousand lifetimes of devotion—is humbling. 
    -> act2_hanuman_vision

* [Ask why he has come.]
    ~ karma += 5
    "I have been waiting for the first scent of Tulsi on the wind, Avatar," he says, his voice a deep, resonant bell. "It has been too long since I walked beside the line of Vishnu."
    -> act2_hanuman_vision

=== act2_hanuman_vision ===
# title: The Burning of Lanka
# yuga: kali

Hanuman places a heavy, warm palm upon your forehead. 

"Knowledge is a weapon, but memories are the sharpening stone. See what we did when the world was younger. See the fire that does not consume."

* [Enter the memory.]
    The rock-temple dissolves. The cold air is replaced by a furnace-like heat.
    -> vision_hanuman_1

=== act2_hanuman_choice ===
// Reached after Hanuman vision in visions.ink
Hanuman watches you with an expression of infinite patience.

"Courage is not the absence of fear, Kalki. It is the decision that something else is more important than fear. Will you be the fire that cleanses, or the fire that destroys?"

* [“I will be the fire that cleanses.”]
    ~ dharma += 15
    # stat_change: dharma_up
    He nods, and the 🟠 icon on your hud pulses with light. "Then I am your shadow. I will move where you move."
    -> act2_hanuman_companion

* [“I will be the fire that destroys the wicked.”]
    ~ adharma += 5
    ~ karma += 10
    # stat_change: karma_up
    "A dangerous path," he warns softly. "But perhaps a necessary one for this age."
    -> act2_hanuman_companion

=== act2_hanuman_companion ===
Hanuman joins your company. 
~ comp_hanuman = true
# companion_joined: hanuman

-> act2_vyasa_arrival
