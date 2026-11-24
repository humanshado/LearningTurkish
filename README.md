# Learning Turkish: interactive course

Interactive lessons for **İstanbul Yabancılar İçin Türkçe A1** (the İstanbul University coursebook, Arabic edition). They follow the
[video series](https://www.youtube.com/playlist?list=PLrwS96DaM7OEcN2imsuUzuf2Wlhd6Jsz-), whose Arabic commentary is translated into English as teacher's notes.

Each lesson page has the following sections:

| Section | What you do |
|---|---|
| 💬 Dialogues | Read the book's dialogues with illustrations, audio and translation. **Shadow mode** pauses after each line so you can repeat it. **Hide text** turns a dialogue into a listening test. |
| 🗂️ Vocabulary | Browse word cards by category (with say-it hints and the book's Arabic glosses), then study them as flashcards in either direction (spaced repetition). |
| 🧩 Grammar | Read the rules, with builders you can click: a vowel-harmony engine that builds -(y)Im, -lI, -lAr and mI forms and explains the vowel choice, the alphabet board, a bu/şu/o distance scene and country cards. |
| 🗣️ Pronunciation | Practise the special letters, minimal pairs, a "which did you hear?" game, and record yourself. |
| 🎧 Listening | Audio-only quizzes on words and dialogue lines, a lesson-specific ear game (sen or siz? kalın or ince? bu, şu or o?) and dictation. |
| ✍️ Quiz | Multiple choice, fill-in-the-blank, sentence building, dialogue ordering, logical replies, typed answers (with ç ğ ı İ ö ş ü buttons) and matching. |
| 🎙️ Speaking | Role-play a conversation with model answers. |
| 💡 Teacher's tips | The memory aids and warnings from the video and the book. |
| 📝 Teacher's notes | An English translation of the teacher's Arabic video commentary, section by section. |
| 🔁 Review | See your progress and the words that are due for review. |

The chips at the top of every page show or hide the English, the say-it hints and the Arabic glosses, and change the audio speed.
Audio comes from the browser's Turkish text-to-speech voice. Progress is saved in your browser's localStorage.

## Tests

Each unit ends with a test page (`src/tests/<id>.js`) with three tabs:

- **📘 Book test:** an interactive version of the unit's *Neler Öğrendik?* page, one mark per item, with explanations.
- **🎯 Mastery test:** about 30 new randomised questions on each attempt, drawn from all the unit's lessons.
- **📈 Results:** your attempt history, your best scores, and the lessons to revise first.

Section types: `match`, `dialogue`, `type`, `tf` and `choose`. To add a test, copy `src/tests/u1-t1.js`, set `covers` to the lesson ids and `after` to the lesson it follows.

## Teacher's notes (video transcripts)

```
transcripts/ar/u1-01.txt   the Arabic auto-transcript of the video, unchanged
transcripts/en/u1-01.md    the English translation (generated from the lesson's notes)
```

To add notes for a lesson: translate the transcript into the lesson's `notes` field (see `src/lessons/u1-01.js`), then run
`node tools/notes_md.js u1-02 > transcripts/en/u1-02.md`. Lessons without notes show a placeholder in the 📝 tab.

## Use it

Enable **GitHub Pages**: Settings → Pages → Deploy from a branch → `main`, folder `/docs`.
Then open `https://humanshado.github.io/LearningTurkish/`. You can also open `docs/index.html` locally.

## Structure

```
src/engine.js          shared lesson engine (all features, incl. vowel harmony)
src/style.css          shared styles
src/lessons/u1-01.js   lesson content: Unit 1, lesson 1 (one file per lesson)
src/tests/u1-t1.js     Unit 1 test
build.py               builds docs/ (site + index) or dist/ (--standalone pages)
docs/                  built site served by GitHub Pages
```

## Add a lesson

1. Copy `src/lessons/u1-03.js` to `src/lessons/u2-01.js` and replace the content: dialogues, vocab, grammar, sounds, classify, tips, practice and roleplay (and notes once the transcript is available).
2. Run `python3 build.py`. The new lesson appears on the course home page.

## Progress

- [x] Unit 1 · Lesson 1: Meeting, greeting, wishes (1A, pp. 7–11), with Video 1 teacher's notes
- [x] Unit 1 · Lesson 2: The Turkish alphabet (1B, pp. 12–13 + classroom language p. 18)
- [x] Unit 1 · Lesson 3: Bu ne? O kim? bu/şu/o, plural, question mI, Burası neresi? (1C, pp. 14–18)
- [x] Unit 1 · Test: Neler öğrendik? (p. 19)
- [ ] Teacher's notes for the remaining Unit 1 videos (send the transcripts)
- [ ] Units 2–6
