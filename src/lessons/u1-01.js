// Unit 1 · Lesson 1 — 1A Tanışma, selamlaşma, dilekler (book pp. 7–11) · Video 1
// Source: İstanbul Yabancılar İçin Türkçe A1 (Arabic edition) + the teacher's video commentary (lesson 1 transcript, translated from Arabic)
LESSONS.push({
  id: "u1-01",
  unit: 1,
  num: 1,
  unitEn: "Ünite 1 · MERHABA (Hello) · A. Meeting, greeting, wishes",
  title: "Hello! Meeting & Greeting",
  titleTr: "Tanışma, selamlaşma, dilekler",
  covers: "Book pp. 7–11 · Hazırlık, Okuma (Tanışma), exercises 1–9",
  video: "https://www.youtube.com/watch?v=1x563pddmQk&list=PLrwS96DaM7OEcN2imsuUzuf2Wlhd6Jsz-",
  goals: [
    "Greet people at different times of day: [[Merhaba]], [[Günaydın]], [[İyi akşamlar]]",
    "Ask someone's name and say your own: [[Senin adın ne?]] · [[Benim adım …|Benim adım …]]",
    "Ask “how are you?” informally and politely: [[Nasılsın?]] / [[Nasılsınız?]]",
    "Ask where someone is from and answer: [[Nerelisin?]] · [[Türkiyeliyim]]",
    "Say goodbye the right way: [[Hoşça kal]] (the one leaving) / [[Güle güle]] (the one staying)",
    "Use everyday wishes: [[Afiyet olsun]], [[Geçmiş olsun]], [[Çok yaşa]], [[İyi yolculuklar]]…"
  ],

  dialogues: [
    {
      id: "d1", title: "Ali & Murat", titleTr: "Tanışma", note: "Two young men meet for the first time. (p. 8)",
      people: { "Ali": "m1", "Murat": "m2" },
      lines: [
        ["Ali", "Merhaba, benim adım Ali. Senin adın ne?", "Hello, my name is Ali. What's your name?", "مرحبًا، اسمي علي. ما اسمك؟"],
        ["Murat", "Benim adım Murat.", "My name is Murat.", "اسمي مراد."],
        ["Ali", "Memnun oldum.", "Pleased to meet you.", "تشرّفت."],
        ["Murat", "Ben de memnun oldum.", "Pleased to meet you too. (lit. I too was pleased)", "وأنا أيضًا تشرّفت."]
      ]
    },
    {
      id: "d2", title: "Dilek & Zeynep", note: "Two friends. [[Selam]] is the short, friendly “hi”. (p. 8)",
      people: { "Dilek": "f1", "Zeynep": "f2" },
      lines: [
        ["Dilek", "Selam Zeynep! Nasılsın?", "Hi Zeynep! How are you?", "سلام يا زينب! كيف حالك؟"],
        ["Zeynep", "İyiyim, teşekkür ederim. Sen nasılsın?", "I'm fine, thank you. How are you?", "أنا بخير، شكرًا. وأنتِ كيف حالك؟"],
        ["Dilek", "Teşekkürler, ben de iyiyim.", "Thanks, I'm fine too.", "شكرًا، وأنا أيضًا بخير."]
      ]
    },
    {
      id: "d3", title: "Hannah & Austin", note: "Where are you from? Add -lI to the country, then -(y)Im for “I am”. (p. 8)",
      people: { "Hannah": "f3", "Austin": "m3" },
      lines: [
        ["Hannah", "Nerelisin?", "Where are you from?", "من أين أنت؟"],
        ["Austin", "Nijeryalıyım. Sen nerelisin?", "I'm from Nigeria. Where are you from?", "أنا من نيجيريا. وأنتِ من أين؟"],
        ["Hannah", "Ben Almanyalıyım.", "I'm from Germany.", "أنا من ألمانيا."]
      ]
    },
    {
      id: "d4", title: "Can & the teacher", note: "A pupil greets his teacher politely with [[nasılsınız]]; the teacher answers with the friendly [[sen]]. (p. 8)",
      people: { "Can": "m5", "Öğretmen": "f4" },
      lines: [
        ["Can", "Günaydın öğretmenim, nasılsınız?", "Good morning, teacher (lit. my teacher), how are you?", "صباح الخير يا معلّمتي، كيف حال حضرتك؟"],
        ["Öğretmen", "Günaydın Can, iyiyim, sen nasılsın?", "Good morning Can, I'm fine, how are you?", "صباح الخير يا جان، أنا بخير، وأنت كيف حالك؟"],
        ["Can", "Teşekkür ederim, ben de iyiyim.", "Thank you, I'm fine too.", "شكرًا، وأنا أيضًا بخير."]
      ]
    },
    {
      id: "d5", title: "Pınar Hanım & Levent Bey", note: "A formal conversation: [[Hanım]] and [[Bey]] go after the first name, and both speakers use [[siz]]. (p. 9)",
      people: { "Pınar Hanım": "f5", "Levent Bey": "m4" },
      lines: [
        ["Pınar Hanım", "Nasılsınız Levent Bey?", "How are you, Mr Levent?", "كيف حال حضرتك يا سيد لَوَنت؟"],
        ["Levent Bey", "Teşekkür ederim, iyiyim. Siz nasılsınız?", "Thank you, I'm fine. How are you?", "شكرًا، أنا بخير. وحضرتكِ كيف حالك؟"],
        ["Pınar Hanım", "Teşekkürler, ben de iyiyim.", "Thanks, I'm fine too.", "شكرًا، وأنا أيضًا بخير."]
      ]
    },
    {
      id: "d6", title: "Öznur & Sinem", note: "Casual: [[Ne haber?]] “what's the news?” → [[İyilik]] “all good”. (p. 9)",
      people: { "Öznur": "f1", "Sinem": "f3" },
      lines: [
        ["Öznur", "Ne haber Sinem?", "What's new, Sinem? / How's it going?", "ما الأخبار يا سينَم؟"],
        ["Sinem", "İyilik, senden ne haber?", "All good. What's new with you?", "بخير، وأنتِ ما أخبارك؟"],
        ["Öznur", "Sağ ol, benden de iyilik.", "Thanks, all good with me too.", "تسلمي، وأنا أيضًا بخير."]
      ]
    },
    {
      id: "d7", title: "Nihan & Mete", note: "[[Ne var ne yok?]] is literally “what is there, what isn't?” = what's up? (p. 9)",
      people: { "Nihan": "f2", "Mete": "m2" },
      lines: [
        ["Nihan", "Ne var ne yok Mete?", "What's up, Mete?", "ما الجديد يا مِتِه؟"],
        ["Mete", "Eh işte, fena değil. Sende ne var ne yok?", "So-so, not bad. What's up with you?", "ماشي الحال، لا بأس. وأنتِ ما الجديد عندك؟"],
        ["Nihan", "İyilik sağlık.", "All well, all healthy.", "الصحة والعافية."]
      ]
    },
    {
      id: "d8", title: "Aysel & Leyla", note: "Saying goodbye: the one leaving says [[Hoşça kal]], the one staying answers [[Güle güle]]. (p. 9)",
      people: { "Aysel": "f4", "Leyla": "f5" },
      lines: [
        ["Aysel", "Hoşça kal Leyla.", "Bye, Leyla. (lit. stay well)", "ابقَي بخير يا ليلى."],
        ["Leyla", "Güle güle. Sonra görüşürüz.", "Bye-bye (lit. go smiling). See you later.", "مع السلامة. نلتقي لاحقًا."],
        ["Aysel", "Görüşürüz.", "See you.", "نلتقي."]
      ]
    },
    {
      id: "d9", title: "The teacher & Martin", note: "Everything together: name, how are you, where from, and the welcome pair [[Hoş geldin]] → [[Hoş bulduk]]. (p. 9)",
      people: { "Öğretmen": "f2", "Martin": "m1" },
      lines: [
        ["Öğretmen", "Merhaba! Senin adın ne?", "Hello! What's your name?"],
        ["Martin", "Merhaba! Benim adım Martin. Sizin adınız ne?", "Hello! My name is Martin. What's your name? (polite)"],
        ["Öğretmen", "Benim adım Filiz. Memnun oldum.", "My name is Filiz. Pleased to meet you."],
        ["Martin", "Ben de memnun oldum.", "Pleased to meet you too."],
        ["Öğretmen", "Nasılsın?", "How are you?"],
        ["Martin", "Teşekkür ederim, iyiyim. Siz nasılsınız?", "Thank you, I'm fine. How are you? (polite)"],
        ["Öğretmen", "Teşekkürler, ben de iyiyim. Nerelisin Martin?", "Thanks, I'm fine too. Where are you from, Martin?"],
        ["Martin", "İspanyalıyım.", "I'm from Spain."],
        ["Öğretmen", "Hoş geldin.", "Welcome."],
        ["Martin", "Hoş bulduk.", "Glad to be here. (the fixed reply to Hoş geldin)"]
      ]
    },
    {
      id: "d10", title: "Ümit & Aslı (exercise 1, in order)", note: "The book's exercise 1 asks you to put this dialogue in order. Try it first in the Quiz tab, then check it here. (p. 9)",
      people: { "Ümit": "m3", "Aslı": "f1" },
      lines: [
        ["Ümit", "Merhaba! Benim adım Ümit, senin adın ne?", "Hello! My name is Ümit, what's yours?"],
        ["Aslı", "Merhaba! Benim adım Aslı.", "Hello! My name is Aslı."],
        ["Ümit", "Memnun oldum.", "Pleased to meet you."],
        ["Aslı", "Ben de memnun oldum.", "Pleased to meet you too."],
        ["Ümit", "Nasılsın Aslı?", "How are you, Aslı?"],
        ["Aslı", "Teşekkürler, iyiyim, sen nasılsın?", "Thanks, I'm fine, how are you?"],
        ["Ümit", "Sağ ol, ben de iyiyim.", "Thanks, I'm fine too."],
        ["Aslı", "Görüşmek üzere. Hoşça kal.", "See you soon. Bye."],
        ["Ümit", "Görüşürüz. Güle güle.", "See you. Bye-bye."]
      ]
    }
  ],

  // t: Turkish · pr: say-it hint (CAPS = stressed syllable) · ar: gloss from the book's Arabic edition
  vocab: [
    { t: "Merhaba", pr: "mer-ha-BA", en: "hello", ar: "مرحبًا", pic: "👋", cat: "Greetings" },
    { t: "Selam", pr: "se-LAM", en: "hi (casual)", ar: "سلام", pic: "✋", cat: "Greetings", extra: true },
    { t: "Günaydın", pr: "gyoo-nai-DUN", en: "good morning", ar: "صباح الخير", pic: "🌅", cat: "Greetings" },
    { t: "İyi günler", pr: "ee-YEE gyoon-LER", en: "good day / have a nice day", ar: "نهارك سعيد", pic: "☀️", cat: "Greetings" },
    { t: "İyi akşamlar", pr: "ee-YEE ak-sham-LAR", en: "good evening", ar: "مساء الخير", pic: "🌆", cat: "Greetings" },
    { t: "İyi geceler", pr: "ee-YEE ge-je-LER", en: "good night", ar: "تصبح على خير", pic: "🌙", cat: "Greetings" },
    { t: "Hoş geldin", pr: "HOSH gel-DEEN", en: "welcome", ar: "أهلًا وسهلًا", pic: "🏡", cat: "Greetings" },
    { t: "Hoş bulduk", pr: "HOSH bul-DUK", en: "glad to be here (reply to “welcome”)", ar: "أهلًا بك (ردّ)", pic: "🧳", cat: "Greetings" },

    { t: "Senin adın ne?", pr: "se-NEEN a-DUN ne", en: "what's your name?", ar: "ما اسمك؟", pic: "🏷️", cat: "Meeting" },
    { t: "Benim adım …", pr: "be-NEEM a-DUM", en: "my name is …", ar: "اسمي …", pic: "🙋", cat: "Meeting" },
    { t: "Sizin adınız ne?", pr: "si-ZEEN a-du-NUZ ne", en: "what's your name? (polite)", ar: "ما اسم حضرتك؟", pic: "🎩", cat: "Meeting" },
    { t: "Memnun oldum", pr: "mem-NUN ol-DUM", en: "pleased to meet you", ar: "تشرّفت", pic: "🤝", cat: "Meeting" },
    { t: "Ben de", pr: "BEN de", en: "me too", ar: "وأنا أيضًا", pic: "🙌", cat: "Meeting" },
    { t: "Nerelisin?", pr: "ne-re-LEE-sin", en: "where are you from?", ar: "من أين أنت؟", pic: "🧭", cat: "Meeting" },
    { t: "ad", pr: "ad", en: "name", ar: "اسم", pic: "📛", cat: "Meeting" },

    { t: "Nasılsın?", pr: "NA-sul-sun", en: "how are you?", ar: "كيف حالك؟", pic: "🙂", cat: "How are you" },
    { t: "Nasılsınız?", pr: "NA-sul-su-nuz", en: "how are you? (polite / to several people)", ar: "كيف حالكم / حال حضرتك؟", pic: "🙂🎩", cat: "How are you" },
    { t: "İyiyim", pr: "ee-YEE-yim", en: "I'm fine / I'm well", ar: "أنا بخير", pic: "👍", cat: "How are you" },
    { t: "Teşekkür ederim", pr: "te-shek-KYUR e-de-RIM", en: "thank you", ar: "شكرًا", pic: "🙏", cat: "How are you" },
    { t: "Teşekkürler", pr: "te-shek-kyur-LER", en: "thanks", ar: "شكرًا", pic: "🙏", cat: "How are you" },
    { t: "Sağ ol", pr: "SAA ol", en: "thanks (casual; lit. be healthy)", ar: "تسلم / شكرًا", pic: "😊", cat: "How are you" },
    { t: "Ne haber?", pr: "NE ha-ber", en: "what's new? / how's it going?", ar: "ما الأخبار؟", pic: "📰", cat: "How are you" },
    { t: "İyilik", pr: "ee-yee-LEEK", en: "all good (lit. goodness)", ar: "بخير", pic: "😌", cat: "How are you" },
    { t: "Ne var ne yok?", pr: "NE var NE yok", en: "what's up? (lit. what is there, what isn't)", ar: "ما الجديد؟", pic: "🤷", cat: "How are you" },
    { t: "Eh işte", pr: "EH eesh-te", en: "so-so", ar: "ماشي الحال", pic: "😐", cat: "How are you" },
    { t: "Fena değil", pr: "fe-NA de-YEEL", en: "not bad", ar: "ليس سيئًا", pic: "👌", cat: "How are you" },
    { t: "İyilik sağlık", pr: "ee-yee-LEEK saa-LUK", en: "all well, all healthy", ar: "الصحة والعافية", pic: "💪", cat: "How are you" },

    { t: "Hoşça kal", pr: "HOSH-cha kal", en: "goodbye (said by the person leaving; lit. stay well)", ar: "ابقَ بخير / مع السلامة", pic: "🚶", cat: "Goodbye" },
    { t: "Güle güle", pr: "gyoo-LE gyoo-LE", en: "goodbye (said to the person leaving; lit. go smiling)", ar: "مع السلامة", pic: "👋😄", cat: "Goodbye" },
    { t: "Görüşürüz", pr: "gyo-ryu-shyu-RYUZ", en: "see you", ar: "نلتقي", pic: "👀", cat: "Goodbye" },
    { t: "Sonra görüşürüz", pr: "SON-ra gyo-ryu-shyu-RYUZ", en: "see you later", ar: "نلتقي لاحقًا", pic: "⏰", cat: "Goodbye" },
    { t: "Görüşmek üzere", pr: "gyo-ryush-MEK yu-ze-RE", en: "see you soon", ar: "إلى اللقاء", pic: "🔜", cat: "Goodbye" },

    { t: "Afiyet olsun", pr: "a-fee-YET ol-SUN", en: "enjoy your meal", ar: "بالهناء والشفاء", pic: "🍽️", cat: "Wishes" },
    { t: "İyi dersler", pr: "ee-YEE ders-LER", en: "have a good lesson", ar: "درسًا موفّقًا", pic: "📚", cat: "Wishes" },
    { t: "Bol şanslar", pr: "BOL shans-LAR", en: "good luck", ar: "حظًّا سعيدًا", pic: "🍀", cat: "Wishes" },
    { t: "Tebrikler", pr: "teb-reek-LER", en: "congratulations", ar: "مبروك", pic: "🎓", cat: "Wishes" },
    { t: "Çok yaşa", pr: "CHOK ya-SHA", en: "bless you (after a sneeze; lit. live long)", ar: "يرحمك الله", pic: "🤧", cat: "Wishes" },
    { t: "Lütfen", pr: "LYUT-fen", en: "please", ar: "من فضلك", pic: "🥺", cat: "Wishes" },
    { t: "Özür dilerim", pr: "o-ZYUR dee-le-RIM", en: "I'm sorry / I apologise", ar: "أعتذر", pic: "💐", cat: "Wishes" },
    { t: "Geçmiş olsun", pr: "gech-MEESH ol-SUN", en: "get well soon (lit. may it be past)", ar: "سلامتك", pic: "🏥", cat: "Wishes" },
    { t: "Mutlu yıllar", pr: "mut-LU yul-LAR", en: "happy birthday / happy new year (lit. happy years)", ar: "كل عام وأنت بخير", pic: "🎂", cat: "Wishes" },
    { t: "Tamam", pr: "ta-MAM", en: "OK", ar: "حسنًا", pic: "👍", cat: "Wishes" },
    { t: "İyi yolculuklar", pr: "ee-YEE yol-ju-luk-LAR", en: "have a good trip", ar: "رحلة سعيدة", pic: "🧳✈️", cat: "Wishes" },
    { t: "Rica ederim", pr: "ree-JA e-de-RIM", en: "you're welcome (reply to thanks)", ar: "عفوًا", pic: "🤗", cat: "Wishes" },

    { t: "ben", en: "I", ar: "أنا", pic: "🙋", cat: "People" },
    { t: "sen", en: "you (one friend)", ar: "أنتَ / أنتِ", pic: "👉", cat: "People" },
    { t: "siz", en: "you (polite, or more than one)", ar: "أنتم / حضرتك", pic: "👉🎩", cat: "People" },
    { t: "öğretmen", pr: "o-ret-MEN", en: "teacher", ar: "معلّم", pic: "👩‍🏫", cat: "People" },
    { t: "öğretmenim", pr: "o-ret-me-NEEM", en: "my teacher (how pupils address a teacher)", ar: "معلّمي", pic: "🧑‍🎓", cat: "People", extra: true },
    { t: "Hanım", pr: "ha-NUM", en: "Mrs / Ms (after a woman's first name)", ar: "السيدة", pic: "👩", cat: "People" },
    { t: "Bey", pr: "BEY", en: "Mr (after a man's first name)", ar: "السيد", pic: "👨", cat: "People" },

    { t: "Türkiye", pr: "TYUR-kee-ye", en: "Turkey", ar: "تركيا", pic: "🇹🇷", cat: "Countries" },
    { t: "Almanya", pr: "al-MAN-ya", en: "Germany", ar: "ألمانيا", pic: "🇩🇪", cat: "Countries" },
    { t: "Japonya", pr: "zha-PON-ya", en: "Japan", ar: "اليابان", pic: "🇯🇵", cat: "Countries" },
    { t: "Nijerya", pr: "nee-ZHER-ya", en: "Nigeria", ar: "نيجيريا", pic: "🇳🇬", cat: "Countries" },
    { t: "İspanya", pr: "ees-PAN-ya", en: "Spain", ar: "إسبانيا", pic: "🇪🇸", cat: "Countries" },
    { t: "Çin", pr: "cheen", en: "China", ar: "الصين", pic: "🇨🇳", cat: "Countries" },
    { t: "Fransa", pr: "FRAN-sa", en: "France", ar: "فرنسا", pic: "🇫🇷", cat: "Countries" },
    { t: "Avusturya", pr: "a-vus-TUR-ya", en: "Austria", ar: "النمسا", pic: "🇦🇹", cat: "Countries" },
    { t: "Türkiyeliyim", pr: "tyur-kee-ye-LEE-yim", en: "I'm from Turkey", ar: "أنا من تركيا", pic: "🇹🇷🙋", cat: "Countries" },
    { t: "Türk", pr: "tyurk", en: "Turkish (nationality)", ar: "تركي", pic: "🇹🇷", cat: "Countries" }
  ],

  grammar: [
    {
      id: "g-ad",
      title: "My name, your name: [[Benim adım]] · [[Senin adın]]",
      body: [
        "Turkish says <i>my</i> and <i>your</i> twice: once with a word in front (<b>benim</b> = my, <b>senin</b> = your) and once with an ending on the noun. [[ad]] (name) → [[adım]] (my name) → [[adın]] (your name).",
        "Because the ending already tells you whose name it is, the front word is often dropped: [[Adın ne?]] is just as correct as [[Senin adın ne?]].",
        "There is <b>no word for “is”</b> in [[Senin adın ne?]]. Word for word it is <i>your name what?</i> The question word [[ne]] (what) sits where the answer goes: <i>Benim adım <b>Ali</b>.</i>",
        "Speaking politely or to more than one person, use [[sizin]] + -ınız ([[adınız]]): [[Sizin adınız ne?]]"
      ],
      table: { head: ["", "Turkish", "Meaning", "Arabic"], say: 1, rows: [
        ["🙋", "Benim adım Ali.", "My name is Ali.", "اسمي علي"],
        ["👉", "Senin adın ne?", "What's your name?", "ما اسمك؟"],
        ["🎩", "Sizin adınız ne?", "What's your name? (polite)", "ما اسم حضرتك؟"]
      ] }
    },
    {
      id: "g-sensiz",
      title: "Friendly [[sen]] or polite [[siz]]?",
      body: [
        "Turkish has two words for <i>you</i>. [[sen]] is for one friend, a child, a classmate or family. [[siz]] is for someone you don't know well, someone older, your teacher, or <b>more than one person</b>.",
        "The verb ending follows: [[Nasılsın?]] (sen) → [[Nasılsınız?]] (siz). The teacher in the video: “The -nız ending is plural, but used to one person it is a sign of respect, like saying <i>ḥaḍratak</i> (your honour) in Arabic.”",
        "With [[siz]] you often add a title <b>after</b> the first name: [[Pınar Hanım]] (Mrs Pınar), [[Levent Bey]] (Mr Levent). Never use them with the surname alone.",
        "Pupils call their teacher [[öğretmenim]], literally <i>my teacher</i>, and use [[siz]] with them."
      ],
      widget: {
        type: "combo", label: "Choose who you're talking to, then what you want to say",
        rows: [{ k: "sen", label: "🧑 sen · a friend" }, { k: "siz", label: "🎩 siz · polite / several people" }],
        cols: [{ k: "how", label: "How are you?" }, { k: "name", label: "What's your name?" }, { k: "from", label: "Where are you from?" }, { k: "bye", label: "Welcome!" }],
        out: {
          "sen|how": ["Nasılsın?", "How are you?", "nasıl (how) + -sın (you are)"],
          "siz|how": ["Nasılsınız?", "How are you? (polite / plural)", "nasıl + -sınız"],
          "sen|name": ["Senin adın ne?", "What's your name?", "senin … -ın"],
          "siz|name": ["Sizin adınız ne?", "What's your name? (polite)", "sizin … -ınız"],
          "sen|from": ["Nerelisin?", "Where are you from?", "nere (where) + -li (from) + -sin (you are)"],
          "siz|from": ["Nerelisiniz?", "Where are you from? (polite)", "nere + -li + -siniz"],
          "sen|bye": ["Hoş geldin!", "Welcome!", "Reply: Hoş bulduk!"],
          "siz|bye": ["Hoş geldiniz!", "Welcome! (polite / plural)", "Reply: Hoş bulduk!"]
        }
      }
    },
    {
      id: "g-im",
      title: "“I am …” is an ending: [[iyi|iyi]] → [[iyiyim]]",
      body: [
        "Turkish has no separate verb <i>to be</i> in the present. You add a personal ending to the word itself: [[iyi]] (good) + <b>-(y)Im</b> → [[iyiyim]] (I am good / I'm fine).",
        "The capital <b>I</b> in -(y)Im means the vowel changes to match the word's <b>last vowel</b>. This is <b>vowel harmony</b>, the most important rule in Turkish: <b>a/ı → ı · e/i → i · o/u → u · ö/ü → ü</b>.",
        "The <b>(y)</b> is a buffer: it only appears when the word ends in a vowel, so two vowels never touch: [[iyi]] → iyi<b>y</b>im, but [[Alman]] → Alman<b>ım</b>.",
        "The same harmony makes <i>you are</i>: <b>-sIn</b>. That is exactly what [[Nasılsın?]] is: [[nasıl]] (how) + <b>sın</b> (you are) = <i>how are you?</i>"
      ],
      widget: {
        type: "harmony", label: "Build it yourself · pick a word, then “I am” or “you are”",
        suffixes: ["im", "sin"],
        words: [
          { t: "iyi", en: "good, well" }, { t: "nasıl", en: "how" }, { t: "Türk", en: "Turkish" },
          { t: "Alman", en: "German" }, { t: "öğretmen", en: "teacher" }, { t: "öğrenci", en: "student" },
          { t: "doktor", en: "doctor" }, { t: "Japonyalı", en: "from Japan" }, { t: "Türkiyeli", en: "from Turkey" }
        ]
      }
    },
    {
      id: "g-li",
      title: "Where from? [[-lI|-li]]: [[Nijerya]] → [[Nijeryalıyım]]",
      body: [
        "Add <b>-lI</b> to a place to make <i>a person from there</i>: [[Japonya]] → [[Japonyalı]] (someone from Japan). The vowel follows harmony again: <b>-lı, -li, -lu, -lü</b>: [[Çinli]], [[İstanbullu]], [[Ürdünlü]].",
        "Then add <b>-(y)Im</b> for <i>I am</i>: [[Japonyalı]] + yım → [[Japonyalıyım]] (I'm from Japan). With the buffer <b>y</b> because -lı ends in a vowel.",
        "The question uses the same pieces: [[nere]] (where) + <b>li</b> + <b>sin</b> → [[Nerelisin?]] <i>Where are you from?</i>",
        "Some countries also have a nationality word: [[Türk]], [[Alman]], [[Fransız]]. So <i>Ben Almanyalıyım ve Almanım</i> means “I'm from Germany and I'm German” (exercise 6, p. 11). The teacher's examples from the video are marked <i>bonus</i>: tap them too!"
      ],
      widget: {
        type: "origin",
        items: [
          { flag: "🇹🇷", c: "Türkiye", en: "Turkey", nat: ["Türk", "Turkish"] },
          { flag: "🇩🇪", c: "Almanya", en: "Germany", nat: ["Alman", "German"] },
          { flag: "🇯🇵", c: "Japonya", en: "Japan", nat: ["Japon", "Japanese"] },
          { flag: "🇳🇬", c: "Nijerya", en: "Nigeria" },
          { flag: "🇪🇸", c: "İspanya", en: "Spain", nat: ["İspanyol", "Spanish"] },
          { flag: "🇨🇳", c: "Çin", en: "China" },
          { flag: "🇫🇷", c: "Fransa", en: "France", nat: ["Fransız", "French"] },
          { flag: "🇦🇹", c: "Avusturya", en: "Austria" },
          { flag: "🇸🇾", c: "Suriye", en: "Syria", bonus: true },
          { flag: "🇰🇪", c: "Kenya", en: "Kenya", bonus: true },
          { flag: "🇺🇸", c: "Amerika", en: "America", bonus: true },
          { flag: "🇵🇸", c: "Filistin", en: "Palestine", bonus: true },
          { flag: "🇯🇴", c: "Ürdün", en: "Jordan", bonus: true },
          { flag: "🏙️", c: "İstanbul", en: "Istanbul", bonus: true }
        ]
      }
    },
    {
      id: "g-bye",
      title: "Two goodbyes: [[Hoşça kal]] and [[Güle güle]]",
      body: [
        "Turkish goodbyes depend on <b>who is leaving</b>. The person who leaves says [[Hoşça kal]] (<i>stay well</i>). The person who stays answers [[Güle güle]] (<i>go smiling</i>).",
        "[[Görüşürüz]] (<i>we'll see each other</i>) works for both sides, and so do [[Sonra görüşürüz]] and [[Görüşmek üzere]].",
        "Several greetings come in fixed pairs. Learn them together: [[Hoş geldin]] → [[Hoş bulduk]] · [[Memnun oldum]] → [[Ben de memnun oldum]] · [[Teşekkür ederim]] → [[Rica ederim]] · [[Ne haber?]] → [[İyilik]]."
      ],
      table: { head: ["When", "Turkish", "Meaning", "Reply"], say: 1, rows: [
        ["🌅 morning", "Günaydın!", "Good morning!", "Günaydın!"],
        ["☀️ daytime", "İyi günler!", "Good day!", "İyi günler!"],
        ["🌆 evening", "İyi akşamlar!", "Good evening!", "İyi akşamlar!"],
        ["🌙 bedtime", "İyi geceler!", "Good night!", "İyi geceler!"],
        ["🚪 arriving", "Hoş geldin!", "Welcome!", "Hoş bulduk!"],
        ["🚶 leaving", "Hoşça kal!", "Stay well!", "Güle güle!"]
      ] }
    }
  ],

  sounds: {
    intro: "Turkish is written exactly as it is spoken: one letter, one sound. Most letters are easy for English speakers, but these are the ones that appear in this lesson and need practice. Tap each one, listen, and repeat.",
    letters: [
      { l: "ı", name: "dotless ı", tip: "No English equivalent. Say “ee” but pull your lips back and relax them, like the e in “taken” said quickly. Never confuse it with i (with a dot).", ex: ["Nasılsın", "adım", "Nijeryalıyım", "yıllar"] },
      { l: "ş", name: "ş (şe)", tip: "Like English sh in “show”.", ex: ["teşekkür", "akşam", "Görüşürüz", "Bol şanslar"] },
      { l: "ç", name: "ç (çe)", tip: "Like English ch in “church”.", ex: ["Hoşça kal", "Çin", "Çok yaşa", "Geçmiş olsun"] },
      { l: "c", name: "c (ce)", tip: "Careful! Turkish c is like English j in “jam”, never like k or s.", ex: ["geceler", "Can", "Rica ederim"] },
      { l: "ğ", name: "yumuşak ge (soft g)", tip: "Not pronounced as a g at all. It lengthens the vowel before it: Sağ ol sounds like “saa-ol”, öğretmen like “ööretmen”. The teacher: treat it almost as if it isn't there.", ex: ["Sağ ol", "öğretmen", "değil"] },
      { l: "ü", name: "ü", tip: "Say “ee” and round your lips as if for “oo”. Like German ü or French u.", ex: ["Günaydın", "Güle güle", "Görüşürüz", "Mutlu yıllar"] },
      { l: "ö", name: "ö", tip: "Say “e” (as in “bed”) and round your lips. Like German ö.", ex: ["öğretmen", "Görüşürüz", "Özür dilerim"] },
      { l: "j", name: "j (je)", tip: "Like the s in “measure” or the French j. It appears mostly in foreign words.", ex: ["Japonya", "Nijerya"] }
    ],
    pairs: [
      { a: ["kır", "countryside"], b: ["kir", "dirt"], note: "ı vs i" },
      { a: ["üç", "three"], b: ["uç", "tip, end"], note: "ü vs u" },
      { a: ["göl", "lake"], b: ["gol", "goal"], note: "ö vs o" },
      { a: ["çam", "pine"], b: ["cam", "glass"], note: "ç vs c" },
      { a: ["şu", "that"], b: ["su", "water"], note: "ş vs s" },
      { a: ["Nasılsın?", "how are you? (sen)"], b: ["Nasılsınız?", "how are you? (siz)"], note: "sen vs siz" },
      { a: ["adım", "my name"], b: ["adın", "your name"], note: "-m vs -n" }
    ]
  },

  // Listening game: is the line friendly (sen) or polite/plural (siz)? rules are tried in order
  classify: {
    label: "🎩 sen or siz?",
    q: "Is this line friendly (sen) or polite / plural (siz)?",
    options: ["Polite / plural (siz)", "Friendly (sen)"],
    rules: ["nasılsınız|sizin|adınız|siz |geldiniz", "nasılsın|senin|sen |nerelisin|geldin|sende |senden"]
  },

  tips: [
    { icon: "🔁", t: "Repeat after me", d: "The teacher's method is <i>talqīn</i>: repeat every word aloud right after you hear it. In this app, press 🔁 Shadow on any dialogue and copy each line in the pause." },
    { icon: "🔤", t: "Master the alphabet first", d: "“If you learn the letters well, you will learn quickly and pronounce correctly.” Turkish has <b>29 letters</b>: <b>8 vowels</b> (ünlü) and <b>21 consonants</b> (ünsüz). The next lesson covers them all." },
    { icon: "⚖️", t: "Kalın and ince vowels", d: "The vowels split into two families: <b>kalın</b> (thick, back): a ı o u, and <b>ince</b> (thin, front): e i ö ü. Almost every ending in Turkish chooses its vowel from the same family as the word. You'll see this in [[Nasılsın]], [[iyiyim]], [[Japonyalıyım]]." },
    { icon: "🤫", t: "ğ is (almost) silent", d: "The soft g ([[yumuşak ge]]) is not pronounced. It only lengthens the vowel before it: [[Sağ ol]] → “saa-ol”, [[öğretmen]] → “ööretmen”." },
    { icon: "🌸", t: "Hoşça kal = stay well", d: "[[hoş]] means nice or pleasant, like [[güzel]]. [[Hoşça kal]] is a wish: <i>stay well</i>. The traveller says it; the one who stays replies [[Güle güle]]." },
    { icon: "🎩", t: "Respect with -nız", d: "[[Nasılsınız?]] is plural, but to one person it shows respect, just as you might say <i>ḥaḍratak</i> in Arabic. Use it with teachers and with [[Hanım]] / [[Bey]]." },
    { icon: "👤", t: "Names have meanings too", d: "[[Dilek]] means <i>wish</i> (the same word as [[dilekler]], wishes) and is a girl's name. [[Can]] means <i>soul, life</i> (rūḥ) and is a boy's name. [[Zeynep]] is the Turkish form of Zaynab." },
    { icon: "🕌", t: "Selam comes from Arabic", d: "[[Selam]] is short for <i>es-selâmü aleyküm</i>. It's a casual “hi” between friends." },
    { icon: "😄", t: "Ne haber? İyilik!", d: "[[Ne haber?]] (what news?) gets the reply [[İyilik]] (goodness). The teacher compares it to answering “al-ḥamdu lillāh”. [[Ne var ne yok?]] (what is there, what isn't?) is the same idea; answer [[Eh işte]] (so-so, Syrian <i>māshī l-ḥāl</i>) or [[Fena değil]] (not bad)." },
    { icon: "🙏", t: "Three ways to say thanks", d: "[[Teşekkür ederim]] (full, polite) · [[Teşekkürler]] (shorter) · [[Sağ ol]] (casual, like colloquial Arabic <i>tislam</i>)." }
  ],

  // Custom practice items (vocabulary quizzes are generated automatically)
  practice: [
    { type: "mcq", q: "Your friend is leaving your house. What do YOU say?", options: ["Hoşça kal", "Güle güle", "Hoş geldin"], answer: 1, explain: "The one who stays says [[Güle güle]]. The one who leaves says [[Hoşça kal]].", sayAnswer: true },
    { type: "mcq", q: "You are leaving your teacher's office. What do you say?", options: ["Güle güle", "Hoşça kal", "Hoş bulduk"], answer: 1, sayAnswer: true },
    { type: "mcq", q: "Someone says “Hoş geldin!”. You reply…", options: ["Hoş bulduk!", "Güle güle!", "Memnun oldum!"], answer: 0, sayAnswer: true },
    { type: "mcq", q: "Someone says “Memnun oldum.” You reply…", options: ["Teşekkürler.", "Ben de memnun oldum.", "Benim adım memnun."], answer: 1, sayAnswer: true },
    { type: "mcq", q: "Which question do you ask your TEACHER?", options: ["Nasılsın?", "Nasılsınız?", "Ne haber?"], answer: 1, explain: "Use the polite [[siz]] form, -nız, with a teacher.", sayAnswer: true },
    { type: "mcq", q: "It's 8 a.m. You greet your colleague with…", options: ["İyi geceler!", "Günaydın!", "İyi akşamlar!"], answer: 1, sayAnswer: true },
    { type: "mcq", q: "Your friend sneezes. You say…", options: ["Afiyet olsun!", "Çok yaşa!", "Tebrikler!"], answer: 1, explain: "[[Çok yaşa]] = live long! (like <i>yarḥamuka llāh</i>).", sayAnswer: true },
    { type: "mcq", q: "Your friend is ill in hospital. You say…", options: ["Geçmiş olsun!", "Bol şanslar!", "İyi yolculuklar!"], answer: 0, sayAnswer: true },
    { type: "mcq", q: "Your friend passed an exam. You say…", options: ["Özür dilerim!", "Tebrikler!", "Lütfen!"], answer: 1, sayAnswer: true },
    { type: "mcq", q: "Someone is about to eat. You say…", options: ["Afiyet olsun!", "Mutlu yıllar!", "İyi dersler!"], answer: 0, sayAnswer: true },
    { type: "mcq", q: "Which one is a MAN's title?", options: ["Hanım", "Bey", "Öğretmen"], answer: 1 },
    { type: "mcq", q: "How do you say “I'm from Nigeria”?", options: ["Nijeryalıyım.", "Nijeryalısın.", "Nijeryayım."], answer: 0, explain: "Nijerya + lı (from) + yım (I am).", sayAnswer: true },
    { type: "mcq", q: "Which ending is correct? Türk___ (I am Turkish)", options: ["Türkım", "Türküm", "Türkyim"], answer: 1, explain: "Last vowel ü → ü. No buffer y after a consonant." },
    { type: "fill", sentence: "Benim ___ Ali.", en: "My name is Ali.", options: ["adım", "adın", "ad"], answer: 0 },
    { type: "fill", sentence: "Senin ___ ne?", en: "What's your name?", options: ["adım", "adın", "adınız"], answer: 1 },
    { type: "fill", sentence: "İyiyim, teşekkür ederim. ___ nasılsın?", en: "I'm fine, thank you. How are YOU?", options: ["Ben", "Sen", "Siz"], answer: 1 },
    { type: "fill", sentence: "Teşekkürler, ben ___ iyiyim.", en: "Thanks, I'm fine too.", options: ["de", "ne", "mi"], answer: 0 },
    { type: "fill", sentence: "Ne var ne ___?", en: "What's up?", options: ["yok", "var", "haber"], answer: 0 },
    { type: "fill", sentence: "Nasılsınız Levent ___?", en: "How are you, Mr Levent?", options: ["Bey", "Hanım", "öğretmenim"], answer: 0 },
    { type: "order", words: ["Benim", "adım", "Murat."], en: "My name is Murat." },
    { type: "order", words: ["Senin", "adın", "ne?"], en: "What's your name?" },
    { type: "order", words: ["Ben", "de", "memnun", "oldum."], en: "Pleased to meet you too." },
    { type: "order", words: ["Teşekkür", "ederim,", "iyiyim."], en: "Thank you, I'm fine." },
    { type: "order", lines: true, q: "Exercise 1 (p. 9): put Ümit and Aslı's dialogue in order", words: [
      "Ümit: Merhaba! Benim adım Ümit, senin adın ne?", "Aslı: Merhaba! Benim adım Aslı.", "Ümit: Memnun oldum.", "Aslı: Ben de memnun oldum.",
      "Ümit: Nasılsın Aslı?", "Aslı: Teşekkürler, iyiyim, sen nasılsın?", "Ümit: Sağ ol, ben de iyiyim.", "Aslı: Görüşmek üzere. Hoşça kal.", "Ümit: Görüşürüz. Güle güle."
    ], explain: "Name → pleased to meet you → how are you → goodbye. The teacher set lines 3–9 as homework." },
    { type: "reply", prompt: "Nerelisin?", en: "Choose a logical reply", options: ["Japonyalıyım.", "Benim adım Ali.", "Güle güle."], answer: 0 },
    { type: "reply", prompt: "Ne haber?", en: "Choose a logical reply", options: ["İyilik, senden ne haber?", "Hoş bulduk.", "Tebrikler."], answer: 0 },
    { type: "reply", prompt: "Teşekkür ederim.", en: "Choose a logical reply", options: ["Rica ederim.", "Görüşürüz.", "Merhaba."], answer: 0 },
    { type: "reply", prompt: "Ne var ne yok?", en: "Choose a logical reply", options: ["Eh işte, fena değil.", "Benim adım Mete.", "Lütfen."], answer: 0 },
    { type: "type", q: "Type the Turkish: “Good morning”", answers: ["Günaydın"], explain: "Use the ü and ı buttons if your keyboard has no Turkish letters." },
    { type: "type", q: "Type the Turkish: “How are you?” (to a friend)", answers: ["Nasılsın", "Nasılsın?"] },
    { type: "type", q: "Make it “I am …”: iyi → ?", answers: ["iyiyim"], explain: "iyi ends in a vowel → buffer y → [[iyiyim]]." }
  ],

  roleplayIntro: "Your new classmate speaks and you answer out loud with your own name and country. Then reveal the model answer and compare. Afterwards, do it again as if your partner were your teacher: use [[siz]] and [[Nasılsınız?]].",
  roleplay: [
    { them: "Merhaba!", themEn: "Hello!", you: "Merhaba!", youEn: "Hello!", hint: "Greet them back" },
    { them: "Benim adım Murat. Senin adın ne?", themEn: "My name is Murat. What's your name?", you: "Benim adım … (your name)", youEn: "My name is …", hint: "Say your name" },
    { them: "Memnun oldum.", themEn: "Pleased to meet you.", you: "Ben de memnun oldum.", youEn: "Pleased to meet you too.", hint: "Say “me too, pleased to meet you”" },
    { them: "Nasılsın?", themEn: "How are you?", you: "Teşekkür ederim, iyiyim. Sen nasılsın?", youEn: "Thank you, I'm fine. How are you?", hint: "Say you're fine and ask back" },
    { them: "Ben de iyiyim. Nerelisin?", themEn: "I'm fine too. Where are you from?", you: "… -lıyım / -liyim (e.g. Nijeryalıyım). Sen nerelisin?", youEn: "I'm from … Where are you from?", hint: "Say where you're from with -lI + -(y)Im, then ask back" },
    { them: "Ben Türkiyeliyim. Hoş geldin!", themEn: "I'm from Turkey. Welcome!", you: "Hoş bulduk!", youEn: "Glad to be here!", hint: "Give the fixed reply to “welcome”" },
    { them: "Hoşça kal!", themEn: "Bye! (I'm leaving)", you: "Güle güle! Görüşürüz.", youEn: "Bye-bye! See you.", hint: "They are leaving and you stay" }
  ],

  // English translation of the teacher's video (from the Arabic auto-transcript). Full text: transcripts/en/u1-01.md
  notes: {
    intro: "An English translation of the teacher's commentary in <a href=\"https://www.youtube.com/watch?v=1x563pddmQk\" target=\"_blank\" rel=\"noopener\">Video 1</a>. The video is in Arabic; the source is YouTube's automatic Arabic transcript, which often mangles the Turkish words, so the Turkish has been restored from the book. Tap any bold Turkish word to hear it.",
    summary: [
      "The course is the <i>İstanbul</i> A1 book. The teacher will go through it flexibly: conversation, grammar, practice and lots of repetition.",
      "Unit 1 (<b>Merhaba</b>) covers greetings, wishes, the alphabet, [[bu]] / [[şu]] / [[o]], the plural [[-lAr|-lar]], the question particle [[mı]] and [[Burası neresi?]].",
      "Turkish has <b>29 letters: 8 vowels and 21 consonants</b>. Vowels are <b>kalın</b> (a ı o u) or <b>ince</b> (e i ö ü). The soft [[ğ]] is practically silent.",
      "Key phrases: [[Merhaba]], [[Günaydın]], [[Nasılsın?]], [[İyiyim]], [[Nerelisin?]], [[Hoşça kal]], [[Güle güle]], [[Memnun oldum]], [[Teşekkür ederim]].",
      "Homework: put the Ümit–Aslı dialogue (exercise 1, p. 9) in order."
    ],
    sections: [
      { h: "1. Welcome and how the course works", ref: "start of video", p: [
        "Dear students, I am your teacher, and I will be explaining the <i>İstanbul</i> book to you. This is the introduction, and it is the first lesson of the İstanbul book.",
        "As we said, we will take things flexibly. God willing, we will hold conversations, apply the grammar rules, do exercises and all of that. Are you ready?"
      ] },
      { h: "2. What's in Unit 1", ref: "book p. 7", p: [
        "Each unit has a title and a topic, and God willing we will cover every one. Unit 1 is about [[selamlaşma]], greeting. It means two people greeting each other: a greeting always happens between at least two people. Then there are some [[dilekler]], wishes. Then we have the vocabulary, and then we start the reading of Unit 1.",
        "The skills (<b>beceriler</b>) are: [[tanışma]], getting to know someone; [[dilekler]], wishes; and recognising people and things. [[kişi]] means a person, and a “thing” means something that isn't a person, an object.",
        "Dear students, I hope you repeat after me as you take the lesson. Take it from the beginning: we teach by repetition (<i>talqīn</i>), God willing.",
        "The grammar (<b>dil bilgisi</b>) of the unit: the Turkish alphabet; then [[bu]], [[şu]], [[o]], which mean <i>this</i> and <i>that</i>: [[bu]] is for something near, [[şu]] for something further away, and [[o]] for something even further. Then the plural suffix [[-lAr|-lar / -ler]]. Then the question particle [[mı]], which works like <i>hal</i> in Arabic. Then [[Burası neresi?]], “where is this place?”: [[burası]] means <i>here, this place</i>.",
        "Then the vocabulary: the classroom ([[sınıf]]), jobs ([[meslekler]]) and the home ([[ev]])."
      ] },
      { h: "3. The Turkish alphabet", ref: "book p. 12", p: [
        "The first and most important thing to look at is the letters. We are on page 12. We are studying the introduction to the Turkish language. There was a first lesson like this one about spelling and reading correctly, so I hope you watch the videos on the Turkish alphabet.",
        "The grammar: as we said, the Turkish language has <b>29 letters</b>.",
        "Among them are the vowels: in Turkish there are letters with a voice and letters without one. There are <b>eight vowels</b>. And the other twenty-one? They are <b>consonants</b>, silent letters.",
        "Then there's this letter, [[ğ]], the soft g. We drop it or ignore it within the word, mostly as if it weren't there.",
        "So what's left? The consonants: we take out these green letters, the consonants. And what do we call them in Turkish? We call them [[ünsüz]], meaning “without a voice”. The other group, the vowels, are called [[ünlü]].",
        "The vowels are divided into two groups. One group is called [[kalın]], meaning thick: <b>a, ı, o, u</b>. The other group is called [[ince]], meaning thin or delicate. We also call these the soft letters: <b>e, i, ö, ü</b>. [[kalın]] is thick and [[ince]] is the opposite. Do you see the difference between the two groups? They are opposites."
      ] },
      { h: "4. Greetings and wishes", ref: "book p. 8, top box", p: [
        "Now let's do the reading, from the beginning of the unit. I hope you learn the letters well, because if you learn them well, you will learn quickly and pronounce correctly.",
        "[[Tanışma]] means getting acquainted. Then names and [[selam]]: a greeting happens between at least two people. Then [[dilekler]], wishes. Let's speak:",
        "[[Merhaba]]: hello. [[Günaydın]]: good morning. Repeat it: gün-ay-dın, [[Günaydın]].",
        "[[Nasılsın?]]: how are you? [[İyiyim]]: I'm fine. [[Nerelisin?]]: where are you from?",
        "[[Hoşça kal]]: stay well. That is, remain in good health; it's a wish. [[hoş]] is the nice, pleasant thing, like [[güzel]] (beautiful). So: stay well, stay nice. If someone is travelling, you hear [[Hoşça kal]], and the reply is [[Güle güle]]: goodbye, go smiling.",
        "[[Memnun oldum]]: I'm honoured, pleased to meet you. [[Teşekkür ederim]]: thank you."
      ] },
      { h: "5. The example box: a short conversation", ref: "book p. 8", p: [
        "Here is a dialogue between two people: [[Senin adın ne?]] What's your name? [[Benim adım Ali.]] My name is Ali.",
        "[[Nasılsın?]] How are you? [[Teşekkür ederim, iyiyim.]] Thank you, I'm fine.",
        "[[Nerelisin?]] Where are you from? [[Japonyalıyım.]] I'm from Japan.",
        "[[Memnun oldum.]] Pleased to meet you. [[Ben de memnun oldum.]] [[Ben de]] means “me too”: me too, pleased to meet you. [[Hoşça kal.]] Stay well. [[Güle güle.]] Goodbye."
      ] },
      { h: "6. Preparation exercise (Hazırlık çalışması)", ref: "book p. 8, the photos", p: [
        "[[Merhaba!]] Hello. [[Günaydın!]] Good morning.",
        "[[İyi günler!]] Literally “good days”: may your days be good.",
        "[[Hoş geldin!]] Welcome. [[İyi akşamlar!]] Good evening.",
        "[[Hoşça kal!]] This is what we say when we want to say goodbye: look at the girl with the suitcase, she's leaving."
      ] },
      { h: "7. Reading: Ali and Murat", ref: "book p. 8", p: [
        "This book is the core book if you want to learn Turkish. We'll go through it as flexibly as we can and practise reading again and again.",
        "There is a dialogue here between Ali and Murat. What does Ali say? [[Merhaba, benim adım Ali. Senin adın ne?]] Hello, my name is Ali. What's your name? Murat answers: [[Benim adım Murat.]]",
        "Ali: [[Memnun oldum.]] Pleased to meet you. Murat: [[Ben de memnun oldum.]] As I said a moment ago, [[ben de]] means “me too”: me too, I'm pleased."
      ] },
      { h: "8. Reading: Dilek and Zeynep", ref: "book p. 8", p: [
        "[[Dilek]] is a girl's name. It means a wish, the same word as in [[dilekler]], wishes, but here it's a girl's name. [[Zeynep]] is Zaynab.",
        "What does Dilek say? [[Selam Zeynep!]] [[Selam]] is short for <i>es-selâmü aleyküm</i>. [[Nasılsın?]] Hi Zeynep, how are you?",
        "Zeynep: [[İyiyim, teşekkür ederim.]] I'm fine, thank you. [[Sen nasılsın?]] And how are you?",
        "Dilek: [[Teşekkürler, ben de iyiyim.]] Thanks, I'm fine too."
      ] },
      { h: "9. Reading: Hannah and Austin", ref: "book p. 8", p: [
        "Here we have a man and a woman. Hannah asks [[Nerelisin?]] Where are you from? Austin answers: [[Nijeryalıyım.]] I'm from Nigeria.",
        "[[Sen nerelisin?]] And where are you from? Of course, you can say any country and adjust the ending to match the sound (vowel harmony): [[Suriyeliyim]] (I'm from Syria), [[Kenyalıyım]] (Kenya), [[Amerikalıyım]] (America), [[Filistinliyim]] (Palestine)…",
        "Hannah answers: [[Ben Almanyalıyım.]] I'm from Germany."
      ] },
      { h: "10. Reading: Can and the teacher", ref: "book p. 8", p: [
        "[[Can]] is a boy's name. In Turkish the word [[can]] means soul, life (<i>rūḥ</i>). He is a pupil. It's a man's name and doesn't suit a woman.",
        "What does he say? [[Günaydın öğretmenim]]: good morning, my teacher. [[Nasılsınız?]]: how are you? This form is plural, but when it's said to one person it's a form of respect or formality. Good morning, teacher, how are you?",
        "The teacher: [[Günaydın Can, iyiyim, sen nasılsın?]] Good morning Can, I'm fine, how are you? Can: [[Teşekkür ederim, ben de iyiyim.]] Thank you, I'm fine too."
      ] },
      { h: "11. Reading: Pınar Hanım and Levent Bey", ref: "book p. 9", p: [
        "[[Hanım]] is a title for ladies. It's formal: we use it when we don't know the person well, when there isn't a close acquaintance. In the same way [[Bey]] is for men. We use them when there is formality and respect.",
        "She says: [[Nasılsınız Levent Bey?]] How are you, Mr Levent? He answers: [[Teşekkür ederim, iyiyim.]] Thank you, I'm fine.",
        "[[Siz nasılsınız?]] And how are you? Here [[siz]] is also the plural form, used for formality and respect, like saying <i>ḥaḍratak</i>, “your honour”: how is your honour?",
        "Pınar Hanım: [[Teşekkürler, ben de iyiyim.]] Thank you, I'm fine too."
      ] },
      { h: "12. Reading: Öznur and Sinem", ref: "book p. 9", p: [
        "Öznur and Sinem, two people. [[Ne haber Sinem?]] [[Ne haber]] means “what news?”: how are things, how are you?",
        "[[İyilik]] means goodness: everything is fine, all is well. Sometimes we use [[iyilik]] the way we say <i>al-ḥamdu lillāh</i> (thank God).",
        "[[Senden ne haber?]] And what's your news? How are you?",
        "And the answer: [[Sağ ol]]: thanks, like colloquial Arabic <i>tislam</i>. [[Benden de iyilik.]] Me too, thank God, the same situation. All good."
      ] },
      { h: "13. Reading: Nihan and Mete", ref: "book p. 9", p: [
        "Nihan says to Mete: [[Ne var ne yok?]] Literally: what is there and what isn't? You want to ask someone how things are going, what's new with them. In colloquial Arabic, as Syrians say, you'd answer <i>māshī l-ḥāl</i>, “it's going OK”.",
        "Mete: [[Eh işte, fena değil.]] So-so, not bad: everything is OK. [[Sende ne var ne yok?]] And what's up with you, how are things?",
        "Nihan: [[İyilik sağlık.]] Goodness and health. We shorten it to just that: all well, thank God."
      ] },
      { h: "14. Reading: Aysel and Leyla", ref: "book p. 9", p: [
        "[[Hoşça kal Leyla.]] Stay well, Leyla. Leyla's answer: [[Güle güle.]] Goodbye.",
        "[[Sonra görüşürüz.]] See you later, we'll meet afterwards. [[Görüşürüz.]] See you."
      ] },
      { h: "15. Exercise 1 and homework", ref: "book p. 9, exercise 1", p: [
        "[[Aşağıdaki diyaloğu sıralayalım]]: let's put this dialogue in order. There's a number here: we have to order this dialogue.",
        "It's a long dialogue, so the lesson is getting long: as much as I can fit into twenty-five minutes. But we're doing it flexibly, as we said, and the exercises are your homework.",
        "The dialogue begins with number 1, Ümit: [[Merhaba! Benim adım Ümit, senin adın ne?]] If he says this, what is the second line, number 2? Which line goes in second place? [[Merhaba! Benim adım Aslı.]] And then lines 3 to 9: you read them and order them yourselves, dear students.",
        "Don't forget to subscribe to the channel and like the video so we can keep bringing you information and lessons, and don't forget to share the channel. See you next time, God willing."
      ] }
    ],
    source: "Source: the Arabic auto-generated transcript of Video 1 (kept unchanged in <code>transcripts/ar/u1-01.txt</code>), translated into English in <code>transcripts/en/u1-01.md</code>. A few words were unclear in the auto-transcript (for example the teacher's name) and have been left out rather than guessed."
  }
});
