// Unit 1 · Lesson 2 — 1B Alfabe (book pp. 12–13) + Sınıf dili (p. 18)
// Source: İstanbul Yabancılar İçin Türkçe A1 (Arabic edition). Video notes: add when the transcript is available.
(function () {
  const BACK = "aıou", V = "aeıioöuü";
  const lastV = w => { const s = w.toLocaleLowerCase("tr"); for (let i = s.length - 1; i >= 0; i--) if (V.includes(s[i])) return s[i]; };
  const vocab = [
    // A–Z words from exercise 3 (p. 12)
    { t: "arkadaş", pr: "ar-ka-DASH", en: "friend", ar: "صديق", pic: "🧑‍🤝‍🧑", cat: "A–Z words" },
    { t: "baba", pr: "ba-BA", en: "father", ar: "أب", pic: "👨", cat: "A–Z words" },
    { t: "ceviz", pr: "je-VEEZ", en: "walnut", ar: "جوز", pic: "🌰", cat: "A–Z words" },
    { t: "çocuk", pr: "cho-JUK", en: "child", ar: "طفل", pic: "🧒", cat: "A–Z words" },
    { t: "ders", pr: "ders", en: "lesson", ar: "درس", pic: "📖", cat: "A–Z words" },
    { t: "ev", pr: "ev", en: "house, home", ar: "بيت", pic: "🏠", cat: "A–Z words" },
    { t: "fare", pr: "fa-RE", en: "mouse", ar: "فأر", pic: "🐭", cat: "A–Z words" },
    { t: "gül", pr: "gyul", en: "rose", ar: "وردة", pic: "🌹", cat: "A–Z words" },
    { t: "ağaç", pr: "aa-ACH", en: "tree", ar: "شجرة", pic: "🌳", cat: "A–Z words" },
    { t: "havuç", pr: "ha-VUCH", en: "carrot", ar: "جزر", pic: "🥕", cat: "A–Z words" },
    { t: "ızgara", pr: "uz-ga-RA", en: "grill", ar: "مشواة", pic: "🍢", cat: "A–Z words" },
    { t: "iş", pr: "eesh", en: "work, job", ar: "عمل", pic: "💼", cat: "A–Z words" },
    { t: "jilet", pr: "zhee-LET", en: "razor blade", ar: "شفرة حلاقة", pic: "🪒", cat: "A–Z words" },
    { t: "kalem", pr: "ka-LEM", en: "pen, pencil", ar: "قلم", pic: "✏️", cat: "A–Z words" },
    { t: "lale", pr: "la-LE", en: "tulip", ar: "زهرة التوليب", pic: "🌷", cat: "A–Z words" },
    { t: "masa", pr: "ma-SA", en: "table", ar: "طاولة", pic: "🪑", cat: "A–Z words" },
    { t: "numara", pr: "nu-ma-RA", en: "number", ar: "رقم", pic: "🔢", cat: "A–Z words" },
    { t: "otobüs", pr: "o-to-BYUS", en: "bus", ar: "حافلة", pic: "🚌", cat: "A–Z words" },
    { t: "öğretmen", pr: "o-ret-MEN", en: "teacher", ar: "معلّم", pic: "👩‍🏫", cat: "A–Z words" },
    { t: "para", pr: "pa-RA", en: "money", ar: "مال", pic: "💵", cat: "A–Z words" },
    { t: "resim", pr: "re-SEEM", en: "picture", ar: "صورة", pic: "🖼️", cat: "A–Z words" },
    { t: "saç", pr: "sach", en: "hair", ar: "شعر", pic: "💇", cat: "A–Z words" },
    { t: "şişe", pr: "shee-SHE", en: "bottle", ar: "زجاجة", pic: "🍾", cat: "A–Z words" },
    { t: "tahta", pr: "tah-TA", en: "board (blackboard), wood", ar: "سبّورة / خشب", pic: "🟫", cat: "A–Z words" },
    { t: "uçurtma", pr: "u-churt-MA", en: "kite", ar: "طائرة ورقية", pic: "🪁", cat: "A–Z words" },
    { t: "ütü", pr: "yu-TYU", en: "iron (for clothes)", ar: "مكواة", pic: "👔", cat: "A–Z words" },
    { t: "vazo", pr: "va-ZO", en: "vase", ar: "مزهرية", pic: "🏺", cat: "A–Z words" },
    { t: "yemek", pr: "ye-MEK", en: "food, meal", ar: "طعام", pic: "🍲", cat: "A–Z words" },
    { t: "zeytin", pr: "zey-TEEN", en: "olive", ar: "زيتون", pic: "🫒", cat: "A–Z words" },
    // exercise 4 (p. 12): unscramble
    { t: "silgi", pr: "seel-GEE", en: "eraser", ar: "ممحاة", pic: "🧽", cat: "Classroom" },
    { t: "sözlük", pr: "soz-LYUK", en: "dictionary", ar: "قاموس", pic: "📘", cat: "Classroom" },
    { t: "kapı", pr: "ka-PU", en: "door", ar: "باب", pic: "🚪", cat: "Classroom" },
    { t: "kitap", pr: "kee-TAP", en: "book", ar: "كتاب", pic: "📕", cat: "Classroom" },
    { t: "defter", pr: "def-TER", en: "notebook", ar: "دفتر", pic: "📓", cat: "Classroom" },
    { t: "çanta", pr: "chan-TA", en: "bag", ar: "حقيبة", pic: "🎒", cat: "Classroom" },
    { t: "bilgisayar", pr: "beel-gee-sa-YAR", en: "computer", ar: "حاسوب", pic: "💻", cat: "Classroom" },
    // talking about letters
    { t: "alfabe", pr: "al-fa-BE", en: "alphabet", ar: "الأبجدية", pic: "🔤", cat: "Letters" },
    { t: "harf", pr: "harf", en: "letter (of the alphabet)", ar: "حرف", pic: "🅰️", cat: "Letters" },
    { t: "ünlü", pr: "yun-LYU", en: "vowel (lit. voiced)", ar: "حرف صوتي", pic: "🔊", cat: "Letters" },
    { t: "ünsüz", pr: "yun-SYUZ", en: "consonant (lit. voiceless)", ar: "حرف ساكن", pic: "🔇", cat: "Letters" },
    { t: "kalın", pr: "ka-LUN", en: "thick, back (vowel)", ar: "غليظ / ثقيل", pic: "🟦", cat: "Letters" },
    { t: "ince", pr: "een-JE", en: "thin, front (vowel)", ar: "رقيق", pic: "🟪", cat: "Letters" },
    // classroom language (Sınıf dili, p. 18)
    { t: "Affedersiniz.", pr: "af-fe-DER-see-neez", en: "Excuse me.", ar: "عفوًا / المعذرة", pic: "🙋", cat: "Classroom language" },
    { t: "… ne demek?", pr: "ne de-MEK", en: "what does … mean?", ar: "ماذا يعني …؟", pic: "❓", cat: "Classroom language" },
    { t: "soru", pr: "so-RU", en: "question", ar: "سؤال", pic: "❔", cat: "Classroom language" },
    { t: "cevap", pr: "je-VAP", en: "answer", ar: "جواب", pic: "💬", cat: "Classroom language" },
    { t: "Anlamıyorum.", pr: "an-LA-mu-yo-rum", en: "I don't understand.", ar: "لا أفهم.", pic: "😕", cat: "Classroom language" },
    { t: "Anladım.", pr: "an-la-DUM", en: "I understood. / Got it.", ar: "فهمت.", pic: "💡", cat: "Classroom language" },
    { t: "Üzgünüm.", pr: "yuz-GYU-nyum", en: "I'm sorry.", ar: "آسف.", pic: "😔", cat: "Classroom language" },
    { t: "Nasıl yazılıyor?", pr: "NA-sul ya-ZU-lu-yor", en: "how is it spelled / written?", ar: "كيف يُكتب؟", pic: "✍️", cat: "Classroom language" },
    { t: "Tekrar lütfen.", pr: "tek-RAR LYUT-fen", en: "Again, please.", ar: "مرة أخرى من فضلك.", pic: "🔁", cat: "Classroom language", extra: true }
  ];

  LESSONS.push({
    id: "u1-02",
    unit: 1,
    num: 2,
    unitEn: "Ünite 1 · MERHABA (Hello) · B. The alphabet",
    title: "The Turkish Alphabet",
    titleTr: "Türk alfabesi",
    covers: "Book pp. 12–13 · Dil bilgisi, exercises 1–4, Dinleme 2 · plus Sınıf dili (p. 18)",
    video: "https://www.youtube.com/playlist?list=PLrwS96DaM7OEcN2imsuUzuf2Wlhd6Jsz-",
    goals: [
      "Say the 29 letters of the Turkish alphabet and their names",
      "Tell the 8 vowels (<b>ünlü</b>) from the 21 consonants (<b>ünsüz</b>)",
      "Sort the vowels into <b>kalın</b> (a ı o u) and <b>ince</b> (e i ö ü), the key to vowel harmony",
      "Pronounce the special letters ç, ş, ğ, ı, ö, ü, c and j",
      "Spell your name aloud: [[Mehmet]] → [[me, e, he, me, e, te|M–E–H–M–E–T]]",
      "Use classroom language: [[Affedersiniz]], [[Soru ne demek?]], [[Anlamıyorum]], [[Anladım]]"
    ],

    dialogues: [
      {
        id: "d1", title: "Classroom language", titleTr: "Sınıf dili", note: "Magda doesn't understand a word and asks the teacher. (p. 18)",
        people: { "Magda": "f3", "Öğretmen": "t" },
        lines: [
          ["Magda", "Affedersiniz.", "Excuse me.", "عفوًا."],
          ["Öğretmen", "Evet, Magda.", "Yes, Magda.", "نعم يا ماغدا."],
          ["Magda", "Soru ne demek?", "What does “soru” mean?", "ماذا تعني كلمة \"soru\"؟"],
          ["Öğretmen", "Ben soru soruyorum. Sen cevap veriyorsun.", "I ask a question. You give an answer.", "أنا أسأل سؤالًا. أنتِ تجيبين."],
          ["Magda", "Üzgünüm. Anlamıyorum.", "I'm sorry. I don't understand.", "آسفة. لا أفهم."],
          ["Öğretmen", "Tamam. Soru: Senin adın ne? Cevap: Benim adım Magda.", "OK. Question: What's your name? Answer: My name is Magda.", "حسنًا. السؤال: ما اسمك؟ الجواب: اسمي ماغدا."],
          ["Magda", "Tamam. Anladım. Teşekkürler.", "OK. I understand now. Thanks.", "حسنًا. فهمت. شكرًا."]
        ]
      },
      {
        id: "d2", title: "Spelling a name", titleTr: "Adımızın harfleri", note: "A practice dialogue made for this app from exercise 2 (p. 12): we say the letter names one by one.",
        people: { "Öğretmen": "t", "Mehmet": "m2" },
        lines: [
          ["Öğretmen", "Merhaba! Adın ne?", "Hello! What's your name?", "مرحبًا! ما اسمك؟"],
          ["Mehmet", "Benim adım Mehmet.", "My name is Mehmet.", "اسمي محمد."],
          ["Öğretmen", "Nasıl yazılıyor?", "How is it spelled?", "كيف يُكتب؟"],
          ["Mehmet", "Me, e, he, me, e, te.", "M – E – H – M – E – T.", "م – ي – ح – م – ي – ت"],
          ["Öğretmen", "Teşekkürler Mehmet. Anladım.", "Thanks, Mehmet. Got it.", "شكرًا يا محمد. فهمت."]
        ]
      }
    ],

    vocab,

    grammar: [
      {
        id: "g-abc",
        title: "29 letters: [[Türkçede yirmi dokuz harf vardır.|Türkçede 29 harf vardır.]]",
        body: [
          "The Turkish alphabet uses Latin letters, but it has <b>29</b> of them: no <b>q, w, x</b>, and six extra letters: <b>ç, ğ, ı, ö, ş, ü</b>.",
          "Of the 29 letters, <b>8 are vowels</b> ([[ünlü]], “voiced”) and <b>21 are consonants</b> ([[ünsüz]], “voiceless”).",
          "<b>One letter = one sound</b>, always. Once you know the letters you can read any Turkish word aloud correctly, even if you don't know what it means.",
          "Consonants are named with an <b>e</b>: [[be]], [[ce]], [[çe]], [[de]]… Vowels are just said: [[a]], [[ı]], [[o]]… The odd one out is ğ: [[yumuşak ge]] (soft g)."
        ],
        widget: {
          type: "alphabet",
          words: { A: ["arkadaş", "friend"], B: ["baba", "father"], C: ["ceviz", "walnut"], Ç: ["çocuk", "child"], D: ["ders", "lesson"], E: ["ev", "house"], F: ["fare", "mouse"], G: ["gül", "rose"], Ğ: ["ağaç", "tree"], H: ["havuç", "carrot"], I: ["ızgara", "grill"], İ: ["iş", "work"], J: ["jilet", "razor blade"], K: ["kalem", "pen"], L: ["lale", "tulip"], M: ["masa", "table"], N: ["numara", "number"], O: ["otobüs", "bus"], Ö: ["öğretmen", "teacher"], P: ["para", "money"], R: ["resim", "picture"], S: ["saç", "hair"], Ş: ["şişe", "bottle"], T: ["tahta", "board"], U: ["uçurtma", "kite"], Ü: ["ütü", "iron"], V: ["vazo", "vase"], Y: ["yemek", "food"], Z: ["zeytin", "olive"] },
          tips: { C: "Like English <b>j</b> in “jam”.", Ç: "Like English <b>ch</b> in “church”.", Ğ: "Never starts a word. It's silent and lengthens the vowel before it: ağaç ≈ “aaach”.", I: "Dotless ı: a short, unrounded “uh”. Its capital is <b>I</b>.", İ: "Dotted i: like “ee”. Its capital keeps the dot: <b>İ</b>.", J: "Like the <b>s</b> in “measure”.", Ö: "Like German ö: say “e” with rounded lips.", Ş: "Like English <b>sh</b>.", Ü: "Like German ü: say “ee” with rounded lips.", R: "A tapped r, lightly rolled. At the end of a word it's soft and breathy.", Y: "Always a consonant, like y in “yes”.", V: "Softer than English v, between v and w.", H: "Always pronounced, like h in “hat”, even in the middle of a word." }
        }
      },
      {
        id: "g-vowels",
        title: "The 8 vowels: [[kalın]] and [[ince]]",
        body: [
          "The teacher divides the vowels into two families. <b>Kalın</b> (thick, back) vowels are made at the back of the mouth: <b>a, ı, o, u</b>. <b>İnce</b> (thin, front) vowels are made at the front: <b>e, i, ö, ü</b>.",
          "They come in matching pairs: <b>a ↔ e</b>, <b>ı ↔ i</b>, <b>o ↔ ö</b>, <b>u ↔ ü</b>. Each pair is the same mouth shape, moved from back to front.",
          "Why it matters: endings copy the family of the word's <b>last vowel</b>. That's <b>vowel harmony</b>. You saw it in lesson 1 ([[Japonyalıyım]] / [[Türkiyeliyim]]) and you'll use it in lesson 3 for plurals and questions.",
          "The second split is <b>unrounded</b> (lips flat: a, e, ı, i) vs <b>rounded</b> (lips round: o, ö, u, ü). The 4-way endings like -(y)Im and mI use both splits."
        ],
        table: { head: ["", "Unrounded (düz)", "", "Rounded (yuvarlak)", ""], say: -1, rows: [
          ["<b>Kalın</b> · back", "<span class='kv' style='padding:0 6px;border-radius:6px'>a</span> ([[araba|araba]])", "<span class='kv' style='padding:0 6px;border-radius:6px'>ı</span> ([[ızgara]])", "<span class='kv' style='padding:0 6px;border-radius:6px'>o</span> ([[otobüs]])", "<span class='kv' style='padding:0 6px;border-radius:6px'>u</span> ([[uçurtma]])"],
          ["<b>İnce</b> · front", "<span class='iv' style='padding:0 6px;border-radius:6px'>e</span> ([[ev]])", "<span class='iv' style='padding:0 6px;border-radius:6px'>i</span> ([[iş]])", "<span class='iv' style='padding:0 6px;border-radius:6px'>ö</span> ([[öğretmen]])", "<span class='iv' style='padding:0 6px;border-radius:6px'>ü</span> ([[ütü]])"]
        ] }
      },
      {
        id: "g-iI",
        title: "Two i's: ı/I and i/İ",
        body: [
          "Turkish has two different letters that English writes as one: dotless <b>ı</b> (capital <b>I</b>) and dotted <b>i</b> (capital <b>İ</b>). The dot stays on the capital!",
          "They are different sounds and change meaning: [[kır]] (countryside) vs [[kir]] (dirt). In names and places: [[Izgara]] but [[İstanbul]], [[İspanya]], [[İzmir]].",
          "Typing tip: if your keyboard has no Turkish letters, the Quiz and Dictation pages have buttons for ç ğ ı İ ö ş ü."
        ],
        table: { head: ["", "Word", "Meaning"], say: 1, rows: [
          ["ı / I", "ızgara", "grill"], ["i / İ", "iş", "work"], ["I (capital ı)", "Izgara", "Grill"], ["İ (capital i)", "İstanbul", "Istanbul"]
        ] }
      },
      {
        id: "g-spell",
        title: "Spelling aloud: [[Nasıl yazılıyor?]]",
        body: [
          "To spell a word, say the letter <b>names</b>: [[Mehmet]] → <b>me – e – he – me – e – te</b>. To ask how something is written: [[Nasıl yazılıyor?]]",
          "Turkish spelling is so regular that you rarely need to spell, except for names. Practise with your own name in the Speaking tab.",
          "Exercise 1 (p. 12) asks you to fill the gaps in the alphabet in order. Try it in the Quiz tab."
        ],
        widget: {
          type: "combo", label: "Pick a name and hear it spelled",
          rows: [{ k: "spell", label: "🔤 spell it" }, { k: "say", label: "🗣️ say it" }],
          cols: [{ k: "mehmet", label: "Mehmet" }, { k: "ayse", label: "Ayşe" }, { k: "cagri", label: "Çağrı" }, { k: "ozge", label: "Özge" }, { k: "ilker", label: "İlker" }],
          out: {
            "spell|mehmet": ["Me, e, he, me, e, te.", "M – E – H – M – E – T"], "say|mehmet": ["Mehmet", "Mehmet (boy's name)"],
            "spell|ayse": ["A, ye, şe, e.", "A – Y – Ş – E"], "say|ayse": ["Ayşe", "Ayşe (girl's name)", "ş = sh"],
            "spell|cagri": ["Çe, a, yumuşak ge, re, ı.", "Ç – A – Ğ – R – I"], "say|cagri": ["Çağrı", "Çağrı (name)", "ğ is silent: “chaa-ruh”"],
            "spell|ozge": ["Ö, ze, ge, e.", "Ö – Z – G – E"], "say|ozge": ["Özge", "Özge (girl's name)"],
            "spell|ilker": ["İ, le, ke, e, re.", "İ – L – K – E – R"], "say|ilker": ["İlker", "İlker (boy's name)", "capital İ keeps its dot"]
          }
        }
      }
    ],

    sounds: {
      intro: "Every Turkish letter has exactly one sound. Here are the eight vowels and the consonants that are new or different for English speakers. Tap, listen and repeat; then play the minimal-pairs game.",
      letters: [
        { l: "a · e", name: "a and e (kalın / ince pair)", tip: "a as in “father” (short); e as in “bed”.", ex: ["baba", "ev", "masa", "ders"] },
        { l: "ı · i", name: "ı and i (kalın / ince pair)", tip: "ı is a relaxed, unrounded “uh” made at the back; i is “ee” made at the front.", ex: ["ızgara", "iş", "kapı", "silgi"] },
        { l: "o · ö", name: "o and ö (kalın / ince pair)", tip: "o as in “more” (short); ö is the same with the tongue pushed forward, like German ö.", ex: ["otobüs", "öğretmen", "vazo", "sözlük"] },
        { l: "u · ü", name: "u and ü (kalın / ince pair)", tip: "u as in “put”; ü is “ee” with rounded lips.", ex: ["uçurtma", "ütü", "çocuk", "gül"] },
        { l: "c · ç", name: "c (j) and ç (ch)", tip: "c = j in “jam”; ç = ch in “church”.", ex: ["ceviz", "cevap", "çocuk", "havuç"] },
        { l: "ş · j", name: "ş (sh) and j (zh)", tip: "ş = sh in “ship”; j = s in “measure”.", ex: ["şişe", "arkadaş", "jilet"] },
        { l: "ğ", name: "yumuşak ge", tip: "Silent; it makes the vowel before it longer. Never at the start of a word.", ex: ["ağaç", "öğretmen", "Çağrı"] },
        { l: "r", name: "r", tip: "A quick tap of the tongue. At the end of a word it fades into a soft hiss.", ex: ["resim", "numara", "bilgisayar"] }
      ],
      pairs: [
        { a: ["kır", "countryside"], b: ["kir", "dirt"], note: "ı vs i" },
        { a: ["kul", "servant"], b: ["kül", "ash"], note: "u vs ü" },
        { a: ["ol", "be!"], b: ["öl", "die!"], note: "o vs ö" },
        { a: ["acı", "bitter, pain"], b: ["açı", "angle"], note: "c vs ç" },
        { a: ["şu", "that"], b: ["su", "water"], note: "ş vs s" },
        { a: ["dağ", "mountain"], b: ["da", "also"], note: "ğ (long a) vs short a" },
        { a: ["kalın", "thick"], b: ["kalem", "pen"], note: "ı vs e" }
      ]
    },

    // Listening game: hear a word, decide whether its LAST vowel is kalın or ince
    classify: {
      label: "⚖️ kalın or ince?",
      q: "Listen. Is the LAST vowel of this word kalın (a ı o u) or ince (e i ö ü)?",
      options: ["Kalın (a ı o u)", "İnce (e i ö ü)"],
      items: vocab.filter(v => v.cat === "A–Z words" || v.cat === "Classroom").map(v => ({ say: v.t, en: `${v.en} · last vowel: ${lastV(v.t)}`, a: BACK.includes(lastV(v.t)) ? 0 : 1 }))
    },

    tips: [
      { icon: "🔤", t: "Learn the letters first", d: "The teacher's advice: “If you learn the letters well, you will learn quickly and pronounce correctly.” Spend a few days here before moving on." },
      { icon: "8️⃣", t: "29 = 8 + 21", d: "<b>8 vowels</b> ([[ünlü]], with a voice) and <b>21 consonants</b> ([[ünsüz]], without a voice). [[ün]] is an old word for voice, so ün-<i>lü</i> is “with a voice” and ün-<i>süz</i> “without a voice”. The same pair of endings is everywhere: -lI = with (you met it in [[Japonyalı]]), -sIz = without." },
      { icon: "⚖️", t: "Kalın vs ince", d: "Thick (back) <b>a ı o u</b>, thin (front) <b>e i ö ü</b>. Memorise these two groups of four: almost every ending in Turkish depends on them." },
      { icon: "🤫", t: "ğ is (almost) silent", d: "Treat [[ğ]] as if it weren't there; just make the vowel before it a bit longer: [[ağaç]], [[öğretmen]]." },
      { icon: "⚠️", t: "c is not k or s", d: "Turkish [[c]] is always the j-sound: [[ceviz]] = “jeviz”, [[cevap]] = “jevap”. Arabic speakers: it's ج as in standard Arabic, never the Egyptian g." },
      { icon: "🔠", t: "The dot stays on İ", d: "Capital of i is <b>İ</b>; capital of ı is <b>I</b>. So it's [[İstanbul]], not Istanbul, in Turkish." },
      { icon: "🎯", t: "Stress is usually on the last syllable", d: "Most Turkish words are stressed at the end: [[arkadaş]], [[öğretmen]], [[kalem]]. Many place names are the exception: [[Ankara]] (AN-ka-ra), [[Türkiye]] (TÜR-ki-ye)." },
      { icon: "🙋", t: "Survival phrases", d: "[[Affedersiniz]] to get attention, [[… ne demek?|ne demek?]] to ask a meaning, [[Anlamıyorum]] when you're lost, [[Tekrar lütfen]] for “again, please”." }
    ],

    practice: [
      { type: "mcq", q: "How many letters does the Turkish alphabet have?", options: ["26", "28", "29", "32"], answer: 2 },
      { type: "mcq", q: "How many of them are vowels?", options: ["5", "6", "8", "10"], answer: 2 },
      { type: "mcq", q: "Which letter is NOT in the Turkish alphabet?", options: ["ğ", "q", "ç", "j"], answer: 1, explain: "Turkish has no q, w or x." },
      { type: "mcq", q: "Which group are the kalın (thick) vowels?", options: ["e i ö ü", "a ı o u", "a e ı i"], answer: 1 },
      { type: "mcq", q: "Which group are the ince (thin) vowels?", options: ["e i ö ü", "a ı o u", "o ö u ü"], answer: 0 },
      { type: "mcq", q: "What is the capital of “i”?", options: ["I", "İ", "Ī"], answer: 1, explain: "The dot stays: i → İ. Dotless ı → I." },
      { type: "mcq", q: "How do you pronounce c in “ceviz”?", options: ["like k", "like s", "like j in “jam”", "like ch"], answer: 2 },
      { type: "mcq", q: "What does ğ do in “ağaç”?", options: ["It sounds like g", "It's silent and lengthens the a", "It sounds like k"], answer: 1 },
      { type: "mcq", q: "Which word starts with an ince vowel?", options: ["otobüs", "ütü", "araba", "ızgara"], answer: 1 },
      { type: "mcq", q: "The last vowel of “öğretmen” is…", options: ["ö (ince)", "e (ince)", "a (kalın)"], answer: 1 },
      { type: "mcq", q: "You don't understand. You say…", options: ["Anladım.", "Anlamıyorum.", "Affedersiniz."], answer: 1, sayAnswer: true },
      { type: "mcq", q: "You want to ask what “soru” means. You say…", options: ["Soru nasıl?", "Soru ne demek?", "Soru nereli?"], answer: 1, sayAnswer: true },
      { type: "fill", sentence: "a, b, c, ç, d, e, f, g, ___, h", en: "Exercise 1: which letter comes next?", options: ["ğ", "ı", "j"], answer: 0 },
      { type: "fill", sentence: "h, ı, ___, j, k", en: "Exercise 1: which letter comes next?", options: ["i", "l", "g"], answer: 0 },
      { type: "fill", sentence: "n, o, ___, p, r", en: "Exercise 1: which letter comes next?", options: ["ö", "q", "u"], answer: 0 },
      { type: "fill", sentence: "s, ___, t, u, ü, v", en: "Exercise 1: which letter comes next?", options: ["ş", "w", "x"], answer: 0 },
      { type: "fill", sentence: "u, ü, v, y, ___", en: "The last letter of the alphabet", options: ["z", "w", "x"], answer: 0 },
      { type: "type", q: "Exercise 4 (p. 12): unscramble “lkema”", answers: ["kalem"], explain: "kalem = pen" },
      { type: "type", q: "Exercise 4: unscramble “asam”", answers: ["masa"] },
      { type: "type", q: "Exercise 4: unscramble “iglis”", answers: ["silgi"], explain: "silgi = eraser" },
      { type: "type", q: "Exercise 4: unscramble “ükszlö”", answers: ["sözlük"], explain: "sözlük = dictionary" },
      { type: "type", q: "Exercise 4: unscramble “pıka”", answers: ["kapı"] },
      { type: "type", q: "Exercise 4: unscramble “athta”", answers: ["tahta"] },
      { type: "type", q: "Exercise 4: unscramble “pikat”", answers: ["kitap"] },
      { type: "type", q: "Exercise 4: unscramble “erdfte”", answers: ["defter"] },
      { type: "type", q: "Exercise 4: unscramble “naçat”", answers: ["çanta"] },
      { type: "type", q: "Exercise 4: unscramble “aslibraygi”", answers: ["bilgisayar"] },
      { type: "type", q: "Dinleme 2 (p. 13): listen and write the word", say: "çocuk", answers: ["çocuk"] },
      { type: "type", q: "Dinleme 2: listen and write the word", say: "şişe", answers: ["şişe"] },
      { type: "type", q: "Dinleme 2: listen and write the word", say: "öğretmen", answers: ["öğretmen"] },
      { type: "order", words: ["Ben", "soru", "soruyorum."], en: "I ask a question." },
      { type: "order", words: ["Üzgünüm.", "Anlamıyorum."], en: "I'm sorry. I don't understand." },
      { type: "reply", prompt: "Affedersiniz.", en: "Choose the teacher's logical reply", options: ["Evet?", "Güle güle.", "Hoş bulduk."], answer: 0 },
      { type: "reply", prompt: "Nasıl yazılıyor?", en: "Your name is Ali. Choose a reply", options: ["A, le, i.", "Ali'yim.", "Anladım."], answer: 0 }
    ],

    roleplayIntro: "The teacher asks you questions in class. Answer out loud, then reveal the model answer. For the spelling turns, use the letter names: be, ce, çe…",
    partner: "t",
    roleplay: [
      { them: "Merhaba! Adın ne?", themEn: "Hello! What's your name?", you: "Benim adım … (your name)", youEn: "My name is …", hint: "Say your name" },
      { them: "Nasıl yazılıyor?", themEn: "How is it spelled?", you: "(spell your name: e.g. Me, e, he, me, e, te)", youEn: "Spell it with the letter names", hint: "Spell your name letter by letter" },
      { them: "Teşekkürler. Bu harf ne?  Ş.", themEn: "Thanks. What's this letter? Ş.", you: "Şe.", youEn: "It's ş (sh).", hint: "Say the letter name" },
      { them: "Ünlü mü, ünsüz mü? A.", themEn: "Vowel or consonant? A.", you: "Ünlü. Kalın ünlü.", youEn: "A vowel. A thick (back) vowel.", hint: "Vowel or consonant? Kalın or ince?" },
      { them: "Ünlü mü, ünsüz mü? Ü.", themEn: "Vowel or consonant? Ü.", you: "Ünlü. İnce ünlü.", youEn: "A vowel. A thin (front) vowel.", hint: "Vowel or consonant? Kalın or ince?" },
      { them: "Sözlük ne demek?", themEn: "What does “sözlük” mean?", you: "Üzgünüm, anlamıyorum. Tekrar lütfen.", youEn: "Sorry, I don't understand. Again, please.", hint: "Say you don't understand and ask again" },
      { them: "Sözlük: dictionary.", themEn: "Sözlük: dictionary.", you: "Tamam. Anladım. Teşekkürler.", youEn: "OK. Got it. Thanks.", hint: "Say you understand and thank the teacher" }
    ]
  });
})();
