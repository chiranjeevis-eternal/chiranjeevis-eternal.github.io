// --- THE CAMPFIRE INTERACTION ENGINE ---
// Deep lore conversations and resource management during travel intervals.

=== camp_post_parashurama ===
# title: Campfire at the Mahendra Slopes
# yuga: kali
# background: travel_mountains

You make camp on the high slopes of the Mahendra Peaks. The wind is biting, but Parashurama sits bare-chested near the small fire, seemingly immune to the cold. The journey to find the Vanara requires rest.

* [Speak with Parashurama about what lies ahead.]
    He does not stop scraping the whetstone against his axe. "The next Chiranjeevi is Hanuman. Do not approach him with a sword in your mind. He will test your devotion, not your martial prowess."
    ~ aff_parashurama += 5
    -> camp_post_parashurama_end

* [Ask Parashurama about his burden.]
    "You carry the blood of kings, Lord Parashurama," you say. "Is it heavy?"
    He stops. His eyes drag up to meet yours. "A mountain is heavy. Blood is just slippery. Never forget the difference, Kalki." 
    ~ aff_parashurama += 10
    -> camp_post_parashurama_end

* [Meditate and conserve your Essence.]
    ~ essence += 20
    You turn your gaze inward, gathering the fragments of your Atman. The fire warms you.
    -> camp_post_parashurama_end

=== camp_post_parashurama_end ===
As dawn paints the peaks in bruised violet, you break camp and move further north.
-> act2_hanuman_arrival
