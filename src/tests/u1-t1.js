// Unit 1 · Test — "Neler Öğrendik?" (What have we learned?), book p. 19
// One mark per item. Answers checked against the book and lessons u1-01 … u1-03.
window.TEST = {
  id: "u1-t1",
  unit: 1,
  after: 3, // shown after Lesson 3 on the course home
  title: "Unit 1 test · What have we learned?",
  titleTr: "Neler öğrendik?",
  covers: ["u1-01", "u1-02", "u1-03"],
  pages: "Book p. 19",
  intro: "Do the whole page first without looking anything up, then check each section. If you lose marks, the results list the lessons to revise before you start Unit 2.",
  sections: [
    {
      id: "s1", type: "match", marks: 5,
      instr: "Aşağıdaki cümleleri eşleştirelim.",
      instrEn: "Match each sentence with the right reply.",
      items: [
        { a: "Nasılsın?", b: "İyiyim.", why: "How are you? → I'm fine.", lesson: "u1-01" },
        { a: "Nerelisin?", b: "Ankaralıyım.", why: "Where are you from? → I'm from Ankara (Ankara + lı + yım).", lesson: "u1-01" },
        { a: "Görüşürüz.", b: "Görüşmek üzere.", why: "See you. → See you soon.", lesson: "u1-01" },
        { a: "Ne iş yapıyorsun?", b: "Ben öğrenciyim.", why: "What do you do (lit. what work are you doing)? → I'm a student. (öğrenci + y + im)", lesson: "u1-01" },
        { a: "Merhaba!", b: "Merhaba!", why: "Hello! → Hello!", lesson: "u1-01" }
      ]
    },
    {
      id: "s2", type: "dialogue", marks: 5,
      instr: "Doğru seçeneği işaretleyelim.",
      instrEn: "Choose the line that fits the gap.",
      items: [
        { lines: [["Ahmet", "___"], ["Lale", "İyiyim. Teşekkür ederim."]], o: ["Adınız ne?", "Merhaba!", "Nasılsın?"], a: 2, why: "Lale answers “I'm fine”, so Ahmet asked how she is.", lesson: "u1-01" },
        { lines: [["Serkan", "Adınız ne?"], ["Fatma", "___"]], o: ["Teşekkür ederim.", "Benim adım Fatma.", "Memnun oldum."], a: 1, lesson: "u1-01" },
        { lines: [["İrem", "Memnun oldum."], ["Hande", "___"]], o: ["Ben de memnun oldum.", "İyiyim.", "Almanyalıyım."], a: 0, why: "The fixed reply: Ben de memnun oldum.", lesson: "u1-01" },
        { lines: [["Özcan", "Benim adım Özcan. Senin adın ne?"], ["Sena", "___"], ["Özcan", "Memnun oldum."], ["Sena", "___"]], o: ["Senin adın Sena. / Görüşürüz.", "Benim adım Sena. / Ben de memnun oldum.", "Teşekkür ederim. / Benim adım Sena."], a: 1, lesson: "u1-01" },
        { lines: [["İlker", "Nasılsın?"], ["Selma", "___"], ["İlker", "Ben de iyiyim. Teşekkür ederim."]], o: ["İyiyim. Sen?", "İyiyim.", "Sen?"], a: 0, why: "İlker says “I'm fine too”, so Selma must have asked him back: Sen?", lesson: "u1-01" }
      ]
    },
    {
      id: "s3", type: "type", marks: 12,
      instr: "Aşağıdaki kelimeleri çoğul yapalım.",
      instrEn: "Make each word plural (-lar / -ler).",
      items: [
        { p: "masa", a: "masalar", lesson: "u1-03" }, { p: "kalem", a: "kalemler", lesson: "u1-03" },
        { p: "sandalye", a: "sandalyeler", lesson: "u1-03" }, { p: "vazo", a: "vazolar", lesson: "u1-03" },
        { p: "öğrenci", a: "öğrenciler", lesson: "u1-03" }, { p: "öğretmen", a: "öğretmenler", lesson: "u1-03" },
        { p: "saat", a: "saatler", why: "Exception (note 2, p. 16): saat takes -ler.", lesson: "u1-03" }, { p: "kitap", a: "kitaplar", lesson: "u1-03" },
        { p: "silgi", a: "silgiler", lesson: "u1-03" }, { p: "sözlük", a: "sözlükler", lesson: "u1-03" },
        { p: "okul", a: "okullar", lesson: "u1-03" }, { p: "sınıf", a: "sınıflar", lesson: "u1-03" }
      ],
      explain: "Last vowel a ı o u → -lar; e i ö ü → -ler. Watch out for saat → saatler."
    },
    {
      id: "s4", type: "tf", marks: 9,
      instr: "Doğru ise “D”, yanlış ise “Y” koyalım.",
      instrEn: "Mark each one D (doğru, correct) or Y (yanlış, wrong).",
      items: [
        { s: "Bu ne? Bu öğretmen.", ok: false, why: "A teacher is a person: Bu kim? Bu öğretmen.", lesson: "u1-03" },
        { s: "Saatler", ok: true, why: "saat is an exception and takes -ler.", lesson: "u1-03" },
        { s: "Üç kalemler", ok: false, why: "No plural after a number: üç kalem.", lesson: "u1-03" },
        { s: "Burası okul.", ok: true, lesson: "u1-03" },
        { s: "Bu sınıf mu?", ok: false, why: "Last vowel ı → mı: Bu sınıf mı?", lesson: "u1-03" },
        { s: "Bunlar kitap.", ok: true, why: "After bunlar the noun can stay singular.", lesson: "u1-03" },
        { s: "Nasılsın? Fransalıyım.", ok: false, why: "“How are you?” isn't answered with “I'm from France”.", lesson: "u1-01" },
        { s: "Bu kim? Bu Ali.", ok: true, lesson: "u1-03" },
        { s: "Şunlar masalar.", ok: true, why: "Correct: the plural noun is also possible after şunlar.", lesson: "u1-03" }
      ]
    },
    {
      id: "s5", type: "type", marks: 6,
      instr: "Ülkeleri yazalım.",
      instrEn: "Unscramble the countries. Example: ürTikey → Türkiye. The capital letter is the first letter.",
      items: [
        { p: "İatlay", a: "İtalya", why: "Italy", lesson: "u1-02" },
        { p: "uRsay", a: "Rusya", why: "Russia", lesson: "u1-02" },
        { p: "ırMsı", a: "Mısır", why: "Egypt (from Arabic مصر)", lesson: "u1-02" },
        { p: "ngeİlitre", a: "İngiltere", why: "England", lesson: "u1-02" },
        { p: "oKer", a: "Kore", why: "Korea", lesson: "u1-02" },
        { p: "anyaAlm", a: "Almanya", why: "Germany", lesson: "u1-01" }
      ]
    },
    {
      id: "s6", type: "choose", marks: 4,
      instr: "Nerede, ne zaman, ne söylüyoruz? İşaretleyelim.",
      instrEn: "Where and when do we say what? Choose the right wish.",
      items: [
        { s: "LOKANTA", en: "restaurant", o: ["Afiyet olsun!", "Geçmiş olsun!", "Görüşürüz."], a: 0, lesson: "u1-01" },
        { s: "GECE", en: "night", o: ["Günaydın!", "Tebrikler!", "İyi geceler!"], a: 2, lesson: "u1-01" },
        { s: "HASTANE", en: "hospital", o: ["Güle güle!", "Geçmiş olsun!", "Bol şanslar!"], a: 1, lesson: "u1-01" },
        { s: "DOĞUM GÜNÜ", en: "birthday", o: ["Mutlu yıllar!", "Afiyet olsun!", "Geçmiş olsun!"], a: 0, lesson: "u1-01" }
      ]
    }
  ],
  selfCheck: [
    ["Bir kişiyle tanışabilirim.", "I can introduce myself to someone."],
    ["Adımı, soyadımı, ülkemi söyleyebilirim.", "I can say my name, surname and country."],
    ["Nesneleri ve kişileri sorabilirim.", "I can ask about objects and people."],
    ["Nesnelerin yerini sorabilirim ve söyleyebilirim.", "I can ask and say where things are."]
  ]
};
