export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  sweetComment: string;
}

export interface HiddenObject {
  id: number;
  name: string;
  hint: string;
  xPercent: number; // position on scene
  yPercent: number;
  foundMessage: string;
  iconType: 'stars' | 'vinyl' | 'clock' | 'bottle' | 'lantern' | 'compass' | 'book';
}

export interface MysteryBox {
  id: number;
  title: string;
  subtitle: string;
  type: 'confession' | 'compliment' | 'promise' | 'memory' | 'ticket' | 'truth';
  content: string;
  accentQuote: string;
}

export interface LittleThing {
  id: number;
  title: string;
  teaser: string;
  description: string;
}

export interface OpenWhenLetter {
  id: string;
  label: string;
  title: string;
  dateNote: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
}

export interface MemoryPhoto {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  imageUrl: string;
  caption: string;
}

export interface RelationshipConfig {
  partnerOne: string;
  partnerTwo: string;
  anniversaryDate: string; // ISO format e.g. "2024-04-14T20:00:00"
  anniversarySubtitle: string;
  quizQuestions: QuizQuestion[];
  hiddenObjects: HiddenObject[];
  mysteryBoxes: MysteryBox[];
  littleThings: LittleThing[];
  openWhenLetters: OpenWhenLetter[];
  memories: MemoryPhoto[];
  loveLetter: {
    headline: string;
    subheadline: string;
    salutation: string;
    paragraphs: string[];
    signature: string;
    postscript: string;
  };
}

export const DEFAULT_RELATIONSHIP_CONFIG: RelationshipConfig = {
  partnerOne: "Ishaac Jasper",
  partnerTwo: "Aluna Prameswari",
  anniversaryDate: "2026-10-03T00:00:00",
  anniversarySubtitle: "Every single day with you has been my favorite.",
  
  quizQuestions: [
    {
      id: 1,
      question: "Where did our paths cross for the very first time?",
      options: [
        "In a late nights talk",
        "At a mutual friends",
        "In a mutual base",
        "In our dream"
      ],
      correctIndex: 0,
      sweetComment: "That late-night conversation was the start of everything for us."
    },
    {
      id: 2,
      question: "Who confessed their feelings first?",
      options: [
        "You did",
        "I did",
        "We basically said it at the exact same time",
        "Neither, it was just super obvious to both of us"
      ],
      correctIndex: 1,
      sweetComment: "My heart was racing so fast, but I'm so glad I said it."
    },
    {
      id: 3,
      question: "What is my absolute favorite thing about you?",
      options: [
        "The way you laugh so hard your whole face lights up",
        "How safe and peaceful I feel whenever you're beside me",
        "Your kind heart and how deeply you care for people",
        "Every single thing above, and all the tiny details you don't even notice"
      ],
      correctIndex: 3,
      sweetComment: "I love every single little thing about you, Aluna."
    },
    {
      id: 4,
      question: "Which quiet memory do I replay whenever I miss you?",
      options: [
        "The nightdrive when we talk about anything and we giggle",
        "Sitting together in quiet comfort without having to say a word",
        "The gentle way you rested your head on my shoulder when you got sleepy",
        "When we couldn't stop laughing over the silliest little inside joke"
      ],
      correctIndex: 0,
      sweetComment: "Talking about anything and everything with you while we giggle into the night."
    },
    {
      id: 5,
      question: "What is our official melody / song that feels like home?",
      options: [
        "Sure Thing by Miguel",
        "The acoustic track from our first late-night drive",
        "Our midnight slow dance melody",
        "Every song that reminds me of your voice"
      ],
      correctIndex: 0,
      sweetComment: "“Even when the sun decline, I'ma still be by your side... This is a sure thing.”"
    },
    {
      id: 6,
      question: "Who is secretly the more clingy one?",
      options: [
        "You, even though you pretend to be super calm and independent",
        "Me, without a doubt, because 5 minutes away from you feels way too long",
        "We take turns depending on who had a longer day",
        "Both of us, equally obsessed with being in each other's space"
      ],
      correctIndex: 3,
      sweetComment: "We're both super clingy and honestly, that's my favorite part."
    },
    {
      id: 7,
      question: "What tiny habit of yours never fails to make me smile?",
      options: [
        "Your cute sleepy voice right before falling asleep",
        "How you reach for my hand without even looking when we walk",
        "The little bounce you do when you get genuinely excited",
        "All of these, every day, without exception"
      ],
      correctIndex: 3,
      sweetComment: "You do that and my heart just melts immediately."
    },
    {
      id: 8,
      question: "If we could freeze one moment in time forever, which would it be?",
      options: [
        "Our very first hug when everything finally felt right",
        "That sunset where we sat together and promised to stay close",
        "Right now, celebrating how far we've come together",
        "Every single morning we get to wake up and talk to each other"
      ],
      correctIndex: 2,
      sweetComment: "Right now. Every month with you is better than the last."
    }
  ],

  hiddenObjects: [
    {
      id: 1,
      name: "The Acoustic Guitar Pick",
      hint: "Over near the warm vinyl player...",
      xPercent: 18,
      yPercent: 42,
      foundMessage: "You found the Melody Pick. You make every day feel like my favorite song.",
      iconType: "vinyl"
    },
    {
      id: 2,
      name: "The Little Keychain Star",
      hint: "Tucked up in the glowing night sky...",
      xPercent: 82,
      yPercent: 28,
      foundMessage: "You found the Little Star. Out of everyone in the world, you shine the brightest to me.",
      iconType: "stars"
    },
    {
      id: 3,
      name: "The Vintage Pocket Watch",
      hint: "Ticking away quietly down near the center...",
      xPercent: 50,
      yPercent: 78,
      foundMessage: "You found the Timekeeper. Every minute with you goes by way too fast.",
      iconType: "clock"
    },
    {
      id: 4,
      name: "The Message in a Bottle",
      hint: "Resting near the lower left corner...",
      xPercent: 28,
      yPercent: 85,
      foundMessage: "You found the Secret Note. Inside it says: 'I love you more than yesterday.'",
      iconType: "bottle"
    },
    {
      id: 5,
      name: "The Cozy Crimson Lantern",
      hint: "Glowing softly on the right side...",
      xPercent: 74,
      yPercent: 68,
      foundMessage: "You found the Warm Lantern. Being with you always feels like coming home.",
      iconType: "lantern"
    }
  ],

  mysteryBoxes: [
    {
      id: 1,
      title: "Midnight Confession",
      subtitle: "Something I never actually told you",
      type: "confession",
      content: "The very first night we stayed up talking until sunrise, I kept checking my phone every few seconds just hoping you'd reply. I knew right then that you were going to be really special to me.",
      accentQuote: "“I think I fell for you way earlier than I ever admitted.”"
    },
    {
      id: 2,
      title: "My Favorite Thing About You",
      subtitle: "A detail you probably don't even realize",
      type: "compliment",
      content: "You have the kindest way of listening. When I talk to you, you make me feel so valued and understood. Having someone love me the way you do is the best gift in the world.",
      accentQuote: "“Your gentle heart is my favorite thing about you.”"
    },
    {
      id: 3,
      title: "Free Food Pass",
      subtitle: "Good anytime, no expiration date",
      type: "ticket",
      content: "COUPON: One late-night drive to get whatever food you're craving. Plus a movie marathon, zero complaints, and all the cuddles you want.",
      accentQuote: "“Valid forever. French fries included.”"
    },
    {
      id: 4,
      title: "A Little Promise",
      subtitle: "Just between the two of us",
      type: "promise",
      content: "I promise to always be on your team. Even on days when things are stressful, exhausting, or overwhelming, you never have to carry any of it alone. I've always got your back.",
      accentQuote: "“You and me against the world.”"
    },
    {
      id: 5,
      title: "A Simple Truth",
      subtitle: "Just in case you forgot",
      type: "truth",
      content: "No matter how tired or stressed I am after a long day, the second I hear your voice or get to see you, everything just feels better. You're my comfort person.",
      accentQuote: "“You make everything easier just by being here.”"
    },
    {
      id: 6,
      title: "A Memory I Love",
      subtitle: "One of my absolute favorites",
      type: "memory",
      content: "Remember that time we were laughing so hard that you buried your face in your hands and couldn't even speak? I looked at you right then and thought, 'Man, I really love this girl.'",
      accentQuote: "“Your laugh is the best sound in the world.”"
    }
  ],

  littleThings: [
    {
      id: 1,
      title: "How You Hold My Hand",
      teaser: "Without even thinking about it...",
      description: "Whenever we're walking together, your hand just naturally reaches for mine and locks our fingers in place. It feels so effortless and comforting."
    },
    {
      id: 2,
      title: "Your Sleepy Voice",
      teaser: "That cute little murmur...",
      description: "When you first wake up or when you're fighting to stay awake on the phone with me at night. You sound so gentle and sweet—it melts away any stress I had."
    },
    {
      id: 3,
      title: "The Way You Scrunch Your Nose",
      teaser: "When something is genuinely hilarious...",
      description: "When you laugh really hard at a silly joke and your whole nose scrunches up before you hide your face. It's the most adorable thing I've ever seen."
    },
    {
      id: 4,
      title: "Stealing My Hoodies",
      teaser: "Oversized hoodies and shirts...",
      description: "You drown in my hoodies, but honestly you look a million times cuter in them than I ever could anyway. You can keep all of them."
    },
    {
      id: 5,
      title: "How Comfortable Our Silence Is",
      teaser: "Zero awkwardness, ever...",
      description: "We can sit in the same room for hours just doing our own thing, and it never feels awkward or forced. Just knowing you're near me brings so much peace."
    },
    {
      id: 6,
      title: "Remembering The Small Things",
      teaser: "Things I mentioned weeks ago...",
      description: "You'll randomly bring up a tiny detail I mentioned offhand weeks ago, or remember my exact drink order. It shows how much you truly pay attention."
    },
    {
      id: 7,
      title: "Our Silly 2 AM Inside Jokes",
      teaser: "That nobody else would understand...",
      description: "Those random late-night moments where we both start wheezing with laughter over something completely stupid that wouldn't make sense to anyone else."
    },
    {
      id: 8,
      title: "The Little Pout You Make",
      teaser: "When you're pretending to sulk...",
      description: "That dramatic cute pout you do when you're 'mad' at me, when really you just want a big hug, some forehead kisses, and all my attention."
    },
    {
      id: 9,
      title: "The Way Your Eyes Light Up",
      teaser: "When food arrives or when you're excited...",
      description: "That little happy bounce you do when you get excited about something you love. Seeing you genuinely happy is the highlight of my week."
    },
    {
      id: 10,
      title: "Just Choosing Me Back",
      teaser: "My favorite part of every day...",
      description: "Knowing that out of everywhere in the world and everyone you could be with, you chose me. I never take that for granted, Aluna."
    }
  ],

  openWhenLetters: [
    {
      id: "miss-me",
      label: "Open when you miss me",
      title: "I'm missing you just as much.",
      dateNote: "For quiet nights when you want me near",
      salutation: "Hey baby,",
      paragraphs: [
        "If you're opening this, I bet you're missing me right now. Trust me, I'm probably sitting somewhere wishing I could just wrap my arms around you too.",
        "Whenever we're apart, everything feels a little quieter. I keep seeing things and thinking, 'Aluna would love this,' or reaching for my phone to tell you some silly story.",
        "Just remember that no matter how many miles or hours are between us, you're the first thing on my mind in the morning and the last thought before I fall asleep. We'll be together soon, I promise."
      ],
      closing: "Can't wait to hold you tight,"
    },
    {
      id: "bad-day",
      label: "Open when you're having a bad day",
      title: "Take a breath. You're safe with me.",
      dateNote: "For days when everything feels exhausting",
      salutation: "My sweet girl,",
      paragraphs: [
        "I'm really sorry today was rough on you. I wish I could be there right now to take your bag, make you something warm to drink, and just hold you while you let it all out.",
        "Bad days happen, and it's completely okay to feel drained or annoyed or upset. You don't have to put on a brave face for me. You can just rest.",
        "Let today go. Whatever went wrong doesn't change how amazing you are, and tomorrow is a fresh start. Go get some rest, okay? I love you so much."
      ],
      closing: "Always in your corner,"
    },
    {
      id: "reassurance",
      label: "Open when you need reassurance",
      title: "In case you ever doubt how much I care.",
      dateNote: "For moments when you feel unsure",
      salutation: "Hey love,",
      paragraphs: [
        "If your mind is playing tricks on you right now, or if you're feeling anxious and unsure, I want you to hear this loud and clear: I'm not going anywhere.",
        "You are never too much for me, and loving you isn't something I have to work hard at—it's the easiest thing in the world. I love the good days, the messy days, and everything in between.",
        "I choose you every single day, and that's not going to change. You're stuck with me, remember?"
      ],
      closing: "Yours, always,"
    },
    {
      id: "cant-sleep",
      label: "Open when you can't sleep",
      title: "Put your phone down and close your eyes.",
      dateNote: "For 3:00 AM thoughts and restless nights",
      salutation: "My sleepy girl,",
      paragraphs: [
        "It's late, isn't it? Your mind is probably racing through a hundred different thoughts while the room is completely dark and quiet.",
        "Unclench your jaw, relax your shoulders, and take a slow, deep breath. You've done enough for today. Everything you're worrying about can wait until tomorrow.",
        "Picture my arms around you and your head resting on my chest. Let yourself drift off. I'll see you in the morning."
      ],
      closing: "Sweet dreams, my love,"
    },
    {
      id: "doubt-yourself",
      label: "Open when you doubt yourself",
      title: "Just a reminder of how incredible you are.",
      dateNote: "When imposter syndrome kicks in",
      salutation: "To my favorite girl,",
      paragraphs: [
        "Sometimes you're so hard on yourself that you forget how brilliant, funny, and capable you actually are. So let me remind you.",
        "I see how hard you try, how much heart you put into everything, and the quiet strength you have even when things are tough. You are so much stronger than you think.",
        "Hold your head high today. I believe in you with my whole heart, and I'm so proud to be by your side."
      ],
      closing: "Your biggest cheerleader,"
    },
    {
      id: "need-love",
      label: "Open when you need to feel loved",
      title: "Remembering how much you mean to me.",
      dateNote: "When you need a little extra warmth",
      salutation: "My whole heart,",
      paragraphs: [
        "If you ever need a reminder of what you mean to me: you're the best part of my everyday life. You make ordinary days feel exciting and quiet nights feel peaceful.",
        "I love the sound of your laugh, our silly inside jokes, and how safe it feels to just sit with you and talk about anything.",
        "You are so deeply loved, Aluna. Today, tomorrow, and every day that comes next."
      ],
      closing: "Forever and always yours,"
    }
  ],

  memories: [
    {
      id: 1,
      title: "Our Floating Sanctuary",
      subtitle: "Scene 01 · Ishaac & Aluna",
      date: "September 03",
      location: "Our Dream World",
      imageUrl: "/assets/aistudio/photo_6289650610957128978_y_840ea32d.jpg",
      caption: "Holding you close with pink flowers in hand, surrounded by glowing colors—one of my favorite pictures of us."
    },
    {
      id: 2,
      title: "Playful Smiles & Photo Booth",
      subtitle: "Scene 02 · The Sweetest Chemistry",
      date: "September 14",
      location: "Our Cozy Corner",
      imageUrl: "/assets/aistudio/photo_6289650610957128993_y_83d28ebf.jpg",
      caption: "Your scrunch-face smile, yellow butterfly clip, and squishing my cheeks—being silly with you is my favorite thing."
    },
    {
      id: 3,
      title: "Close Enough To Hear Your Heart",
      subtitle: "Scene 03 · Soft Glances & Late Talks",
      date: "September 20",
      location: "Our Safe Space",
      imageUrl: "/assets/aistudio/photo_6289650610957128991_x_a98e308c.jpg",
      caption: "The way you softly point and tease me, and how time just stops whenever we look at each other."
    },
    {
      id: 4,
      title: "Matching Hoodies & Mirror Snaps",
      subtitle: "Scene 04 · Partners In Crime",
      date: "September 28",
      location: "Midnight City Strolls",
      imageUrl: "/assets/aistudio/photo_6289650610957128990_y_a4d83166.jpg",
      caption: "Matching in black hoodies and caps, arm-in-arm—my favorite partner in crime."
    }
  ],

  loveLetter: {
    headline: "A Letter For You, Aluna",
    subheadline: "Just a few honest words straight from my heart",
    salutation: "To my favorite girl,",
    paragraphs: [
      "I was thinking about the day we first started talking, and honestly, I had no idea back then that you would end up becoming this important to me.",
      "Life can get so busy and loud, but whenever I'm with you, everything just slows down. You're the person I want to text first when good things happen, and the voice that calms me down when everything else feels overwhelming.",
      "Thank you for being so patient with me, for making me laugh until my stomach hurts, and for loving me the way you do. You make ordinary days feel special just by being there beside me.",
      "Happy monthsiversary, my love. I love every little piece of our story so far, and I can't wait for all the memories we haven't made yet."
    ],
    signature: "Forever yours, Ishaac",
    postscript: "P.S. You're still the prettiest girl I've ever seen."
  }
};

const STORAGE_KEY = "only_us_relationship_config_v1";

export function loadRelationshipConfig(): RelationshipConfig {
  if (typeof window === "undefined") return DEFAULT_RELATIONSHIP_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_RELATIONSHIP_CONFIG;
    const parsed = JSON.parse(saved);
    if (parsed.partnerOne === "Alex") {
      parsed.partnerOne = "Ishaac Jasper";
    }
    if (parsed.partnerTwo === "Taylor") {
      parsed.partnerTwo = "Aluna Prameswari";
    }
    if (parsed.anniversaryDate === "2024-04-14T20:00:00") {
      parsed.anniversaryDate = "2026-10-03T00:00:00";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[0]?.options?.[0] !== "In a late nights talk") {
      parsed.quizQuestions[0].options[0] = "In a late nights talk";
      parsed.quizQuestions[0].correctIndex = 0;
      parsed.quizQuestions[0].sweetComment = "That late-night conversation changed our entire universe forever.";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[0]?.options?.[1] !== "At a mutual friends") {
      parsed.quizQuestions[0].options[1] = "At a mutual friends";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[0]?.options?.[2] !== "In a mutual base") {
      parsed.quizQuestions[0].options[2] = "In a mutual base";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[0]?.options?.[3] !== "In our dream") {
      parsed.quizQuestions[0].options[3] = "In our dream";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[1]) {
      parsed.quizQuestions[1].options[0] = "You did";
      parsed.quizQuestions[1].options[1] = "I did";
      parsed.quizQuestions[1].correctIndex = 1;
    }
    if (parsed.quizQuestions && parsed.quizQuestions[3]) {
      parsed.quizQuestions[3].options[0] = "The nightdrive when we talk about anything and we giggle";
      parsed.quizQuestions[3].correctIndex = 0;
      parsed.quizQuestions[3].sweetComment = "Talking about anything and everything with you while we giggle into the night.";
    }
    if (parsed.quizQuestions && parsed.quizQuestions[4]?.options?.[0] !== "Sure Thing by Miguel") {
      parsed.quizQuestions[4].options[0] = "Sure Thing by Miguel";
      parsed.quizQuestions[4].correctIndex = 0;
      parsed.quizQuestions[4].sweetComment = "“Even when the sun decline, I'ma still be by your side... This is a sure thing.”";
    }
    if (parsed.memories) {
      if (parsed.memories[0]) {
        parsed.memories[0].imageUrl = "/assets/aistudio/photo_6289650610957128978_y_840ea32d.jpg";
        parsed.memories[0].title = "Our Floating Sanctuary";
        parsed.memories[0].subtitle = "Scene 01 · Ishaac & Aluna";
        parsed.memories[0].date = "September 03";
        parsed.memories[0].location = "Our Dream World";
        parsed.memories[0].caption = "Surrounded by vibrant colors, glowing fish, and pink lilies—our favorite moment together in this universe.";
      }
      if (parsed.memories[1]) {
        parsed.memories[1].imageUrl = "/assets/aistudio/photo_6289650610957128993_y_83d28ebf.jpg";
        parsed.memories[1].title = "Playful Smiles & Photo Booth";
        parsed.memories[1].subtitle = "Scene 02 · The Sweetest Chemistry";
        parsed.memories[1].date = "September 14";
        parsed.memories[1].caption = "Your scrunch-face smile, yellow butterfly clip, and squishing my cheeks—the moments where being silly with you feels like pure magic.";
      }
      if (parsed.memories[2]) {
        parsed.memories[2].imageUrl = "/assets/aistudio/photo_6289650610957128991_x_a98e308c.jpg";
        parsed.memories[2].title = "Close Enough To Hear Your Heart";
        parsed.memories[2].subtitle = "Scene 03 · Soft Glances & Late Talks";
        parsed.memories[2].date = "September 20";
        parsed.memories[2].caption = "The way you point and softly tease me, and the way time just stops whenever our eyes meet.";
      }
      if (parsed.memories[3]) {
        parsed.memories[3].imageUrl = "/assets/aistudio/photo_6289650610957128990_y_a4d83166.jpg";
        parsed.memories[3].title = "Matching Hoodies & Mirror Snaps";
        parsed.memories[3].subtitle = "Scene 04 · Partners In Crime";
        parsed.memories[3].date = "September 28";
        parsed.memories[3].caption = "Matching in all-black caps and hoodies, locked arm-in-arm—our favorite reflection of us against the world.";
      }
    }
    // Always use the new natural, humanized relationship copy
    parsed.littleThings = DEFAULT_RELATIONSHIP_CONFIG.littleThings;
    parsed.openWhenLetters = DEFAULT_RELATIONSHIP_CONFIG.openWhenLetters;
    parsed.mysteryBoxes = DEFAULT_RELATIONSHIP_CONFIG.mysteryBoxes;
    parsed.hiddenObjects = DEFAULT_RELATIONSHIP_CONFIG.hiddenObjects;
    parsed.loveLetter = DEFAULT_RELATIONSHIP_CONFIG.loveLetter;
    parsed.anniversarySubtitle = DEFAULT_RELATIONSHIP_CONFIG.anniversarySubtitle;
    return { ...DEFAULT_RELATIONSHIP_CONFIG, ...parsed };
  } catch (e) {
    console.error("Error loading saved relationship config:", e);
    return DEFAULT_RELATIONSHIP_CONFIG;
  }
}

export function saveRelationshipConfig(config: RelationshipConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Error saving relationship config:", e);
  }
}

export function resetRelationshipConfig(): RelationshipConfig {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_RELATIONSHIP_CONFIG;
}
