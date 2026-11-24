/* Turkish lesson engine — renders any lesson object in window.LESSONS.
   Shared by every lesson page of the İstanbul A1 course (and by the unit test pages). */
(function () {
  "use strict";
  const T = window.TEST || null;
  const L = T ? testLesson(T) : window.LESSONS[window.LESSONS.length - 1];
  // A test page loads the lessons it covers; merge them into one pseudo-lesson (items keep their source lesson id)
  function testLesson(t) {
    const ls = window.LESSONS, seen = new Set(), tag = (arr, id) => (arr || []).map(x => Object.assign({ src: id }, x));
    return {
      id: t.id, title: t.title, unit: t.unit, num: 0,
      vocab: ls.flatMap(l => tag(l.vocab, l.id)).filter(v => !seen.has(v.t) && seen.add(v.t)),
      practice: ls.flatMap(l => tag(l.practice, l.id)),
      dialogues: ls.flatMap(l => (l.dialogues || []).map(d => Object.assign({ src: l.id }, d))),
      lessons: ls.map(l => ({ id: l.id, num: l.num, title: l.title }))
    };
  }
  const $ = (s, el = document) => el.querySelector(s);
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const BOOK = "İstanbul Yabancılar İçin Türkçe A1";

  /* ---------- storage (best-effort) ---------- */
  const KEY = "turkish-course-v1";
  const DEF = { en: true, ar: false, pr: true, rate: 0.85 };
  let S = { lessons: {}, words: {}, prefs: Object.assign({}, DEF) };
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
  S.prefs = Object.assign({}, DEF, S.prefs);
  const LS = S.lessons[L.id] = S.lessons[L.id] || { done: {}, best: {} };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* ---------- text helpers ---------- */
  const tk = (txt, cls = "") => `<span class="tk ${cls}" lang="tr">${esc(txt)}</span>`;
  const gl = (txt) => txt ? `<span class="arg" lang="ar" dir="rtl">${esc(txt)}</span>` : "";
  // [[Merhaba]] or [[Merhaba|shown text]] inside prose → bold Turkish that speaks when tapped
  const tz = (html) => String(html).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, say, show) => `<b class="say" lang="tr" data-say="${esc(say)}">${show || say}</b>`);
  const tlow = (s) => s.toLocaleLowerCase("tr");
  const norm = (s) => tlow(s).replace(/[.,!?¿;:"“”'’()…\-–]/g, " ").replace(/\s+/g, " ").trim();

  /* ---------- vowel harmony ---------- */
  const VOWELS = "aeıioöuü", BACK = "aıou";
  const lastV = (w) => { const s = tlow(w); for (let i = s.length - 1; i >= 0; i--) if (VOWELS.includes(s[i])) return s[i]; return "e"; };
  const two = (w) => BACK.includes(lastV(w)) ? "a" : "e";
  const four = (w) => ({ a: "ı", ı: "ı", e: "i", i: "i", o: "u", u: "u", ö: "ü", ü: "ü" })[lastV(w)];
  const endsV = (w) => VOWELS.includes(tlow(w).slice(-1));
  const SUFFIX = {
    pl: { name: "plural -lAr", rule: "2-way", make: w => w + "l" + two(w) + "r" },
    q: { name: "question mI", rule: "4-way", make: w => w + " m" + four(w) + "?" },
    neg: { name: "değil (not)", rule: "none", make: w => w + " değil" },
    li: { name: "from -lI", rule: "4-way", make: w => w + "l" + four(w) },
    im: { name: "I am -(y)Im", rule: "4-way", make: w => w + (endsV(w) ? "y" : "") + four(w) + "m" },
    sin: { name: "you are -sIn", rule: "4-way", make: w => w + "s" + four(w) + "n" },
    liyim: { name: "I'm from -lIyIm", rule: "4-way", make: w => { const x = w + "l" + four(w); return x + "y" + four(x) + "m"; } },
    lisin: { name: "you're from? -lIsIn", rule: "4-way", make: w => { const x = w + "l" + four(w); return x + "s" + four(x) + "n"; } }
  };

  /* ---------- speech ---------- */
  let voice = null; const synth = window.speechSynthesis;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices().filter(v => /^tr/i.test(v.lang));
    voice = vs.find(v => /Google|Microsoft|Yelda|Emel|Tolga|Filiz|Seda|Cem/i.test(v.name)) || vs[0] || null;
    const b = $("#voice-banner"); if (b) b.style.display = voice ? "none" : "block";
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
  function cleanForTTS(t) { return String(t).replace(/\(.*?\)/g, "").replace(/…+|\.{3,}/g, " ").replace(/[\/←→]/g, ", ").replace(/\s–\s/g, ", ").trim(); }
  function speak(text, btn, rate) {
    return new Promise(res => {
      if (!synth) { res(); return; }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(cleanForTTS(text));
      u.lang = voice ? voice.lang : "tr-TR"; if (voice) u.voice = voice;
      u.rate = rate || S.prefs.rate;
      document.querySelectorAll(".speaking").forEach(e => e.classList.remove("speaking"));
      if (btn) btn.classList.add("speaking");
      const end = () => { if (btn) btn.classList.remove("speaking"); res(); };
      u.onend = end; u.onerror = end;
      synth.speak(u);
      setTimeout(end, 15000);
    });
  }
  const playBtn = (txt, extra = "") => `<button class="play ${extra}" data-say="${esc(txt)}" title="Listen" aria-label="Listen">🔊</button>`;
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-say]"); if (b) { e.stopPropagation(); speak(b.dataset.say, b.classList.contains("play") ? b : b.querySelector(".play")); }
  });

  /* ---------- avatars (simple SVG illustrations) ---------- */
  const PAL = { m1: ["#2f6db5", "#3b2a1e"], m2: ["#1f8a8a", "#1b1b1b"], m3: ["#5b4fb5", "#6b4a2b"], m4: ["#2c3e50", "#2c2c2c"], m5: ["#b5563a", "#d9b36c"], f1: ["#a3407e", "#7a2a5c"], f2: ["#6b4e9b", "#3e2a63"], f3: ["#c0392b", "#d9a74a"], f4: ["#3f7a5a", "#245039"], f5: ["#d35400", "#5a3a22"], t: ["#7f8c8d", "#555"] };
  function avatar(kind, size = 46) {
    const [c1, c2] = PAL[kind] || ["#888", "#555"];
    const male = kind[0] === "m" || kind === "t";
    const head = male
      ? `<path d="M15 21 Q24 9 33 21 L33 23 L15 23Z" fill="${c2}"/><circle cx="24" cy="24" r="8" fill="#e9b98f"/>${kind === "t" ? `<rect x="18" y="22" width="5" height="3" rx="1" fill="none" stroke="#333"/><rect x="25" y="22" width="5" height="3" rx="1" fill="none" stroke="#333"/>` : ""}`
      : `<path d="M12 30 Q10 10 24 9 Q38 10 36 30 Q30 36 24 36 Q18 36 12 30Z" fill="${c2}"/><circle cx="24" cy="23" r="7.5" fill="#e9b98f"/>`;
    return `<svg class="av" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="${c1}22"/><path d="M8 48 Q8 34 24 34 Q40 34 40 48Z" fill="${c1}"/>${head}</svg>`;
  }

  /* ---------- sections ---------- */
  const SECTIONS = [
    ["overview", "Overview", "🏠"], ["dialogues", "Dialogues", "💬"], ["vocabulary", "Vocabulary", "🗂️"],
    ["grammar", "Grammar", "🧩"], ["sounds", "Pronunciation", "🗣️"], ["listening", "Listening", "🎧"],
    ["practice", "Quiz", "✍️"], ["speaking", "Speaking", "🎙️"], ["tips", "Teacher's tips", "💡"],
    ["notes", "Teacher's notes", "📝"], ["review", "Review", "🔁"]
  ];
  const learnable = SECTIONS.filter(s => !["overview", "review"].includes(s[0]));

  function renderShell() {
    document.title = `${L.title} · Turkish A1`;
    document.body.innerHTML = `
    <header class="top">
      <div class="top-inner">
        <div class="brand"><small>${window.COURSE_HOME ? `<a href="${window.COURSE_HOME}">← Course</a> · ` : ""}${BOOK} · Unit ${L.unit} · Lesson ${L.num}</small><b>${esc(L.title)}</b></div>
        <div class="toggles">
          <button class="chip" id="t-en">EN Meaning</button>
          <button class="chip" id="t-pr">🔤 Say-it hints</button>
          <button class="chip" id="t-ar">ع Arabic</button>
          <button class="chip" id="t-rate">🐢 Speed</button>
        </div>
      </div>
      <div class="progress"><div id="pbar"></div></div>
      <nav class="tabs" id="tabs">${SECTIONS.map(([id, n, ic]) => `<a href="#${id}" data-tab="${id}">${ic} ${n}<span class="tick"></span></a>`).join("")}</nav>
    </header>
    <main id="main"></main>
    <footer>Based on <i>${BOOK}</i> (İstanbul Üniversitesi) and the teacher's video commentary · Audio is your device's Turkish text-to-speech voice, so check pronunciation against the video.</footer>`;
    wirePrefs();
  }
  function wirePrefs() {
    const setChips = () => {
      [["#t-en", "en"], ["#t-pr", "pr"], ["#t-ar", "ar"]].forEach(([s, k]) => { const b = $(s); if (b) b.classList.toggle("on", S.prefs[k]); });
      $("#t-rate").textContent = S.prefs.rate < 0.75 ? "🐢 Slow" : S.prefs.rate < 0.95 ? "🚶 Normal" : "🐇 Fast";
      document.body.classList.toggle("no-en", !S.prefs.en);
      document.body.classList.toggle("no-pr", !S.prefs.pr);
      document.body.classList.toggle("show-ar", S.prefs.ar);
    };
    [["#t-en", "en"], ["#t-pr", "pr"], ["#t-ar", "ar"]].forEach(([s, k]) => { const b = $(s); if (b) b.onclick = () => { S.prefs[k] = !S.prefs[k]; save(); setChips(); }; });
    $("#t-rate").onclick = () => { S.prefs.rate = S.prefs.rate < 0.75 ? 0.85 : S.prefs.rate < 0.95 ? 1.0 : 0.6; save(); setChips(); };
    setChips();
  }
  function updateProgress() {
    const n = learnable.filter(s => LS.done[s[0]]).length;
    $("#pbar").style.width = (100 * n / learnable.length) + "%";
    document.querySelectorAll("#tabs a").forEach(a => { $(".tick", a).textContent = LS.done[a.dataset.tab] ? "✓" : ""; });
  }
  function doneButton(id, next) {
    const el = h(`<div class="row done-btn"><button class="btn primary">${LS.done[id] ? "✓ Completed" : "Mark as complete"} → ${next ? "next: " + SECTIONS.find(s => s[0] === next)[1] : ""}</button></div>`);
    $("button", el).onclick = () => { LS.done[id] = true; save(); updateProgress(); if (next) location.hash = next; };
    return el;
  }
  const nextOf = id => { const i = SECTIONS.findIndex(s => s[0] === id); return SECTIONS[i + 1] && SECTIONS[i + 1][0]; };
  const voiceBanner = () => h(`<details class="banner" id="voice-banner" style="display:none"><summary>🔈 <b>No Turkish voice found on this device</b>, so audio won't play. Tap for how to add one.</summary><p style="margin:8px 0 0">You can still read and do the quizzes. <b>Windows:</b> Settings → Time &amp; language → Speech → Add voices → Turkish. <b>Android:</b> install Google Speech Services and add Turkish. <b>iPhone/Mac:</b> Settings → Accessibility → Spoken Content → Voices → Turkish. Chrome and Edge on a desktop usually include one already.</p></details>`);

  const views = {};
  function route() {
    const id = (location.hash || "#overview").slice(1);
    const view = views[id] ? id : "overview";
    document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("active", a.dataset.tab === view));
    const a = $(`#tabs a[data-tab="${view}"]`); if (a) a.scrollIntoView({ block: "nearest", inline: "center" });
    if (synth) synth.cancel();
    const main = $("#main"); main.innerHTML = "";
    main.appendChild(voiceBanner()); pickVoice();
    views[view](main);
    if (!["overview", "review"].includes(view)) main.appendChild(doneButton(view, nextOf(view)));
    window.scrollTo(0, 0);
  }

  /* ---------- Overview ---------- */
  views.overview = (m) => {
    m.appendChild(h(`<div class="stack">
      <div class="card hero"><div>
        <div class="muted">${esc(L.unitEn)}</div>
        <div>${tk(L.titleTr, "big")}</div>
        <h2>${esc(L.title)}</h2>
        <p class="lead">${esc(L.covers)} · <a href="${L.video}" target="_blank" rel="noopener">Watch the video ↗</a></p>
      </div><div style="display:flex;gap:4px">${avatar("m1", 70)}${avatar("f1", 70)}</div></div>
      <div class="card"><h3 style="margin-top:0">By the end of this lesson you can…</h3><ul class="goals">${L.goals.map(g => `<li>${tz(g)}</li>`).join("")}</ul></div>
      <div><h3>Your path</h3><div class="path">${learnable.map(([id, n, ic], i) => `<a href="#${id}"><div class="step ${LS.done[id] ? "done" : ""}"><span class="num">${LS.done[id] ? "✓" : i + 1}</span><span>${ic} ${n}</span></div></a>`).join("")}</div></div>
      <div class="card muted" style="font-size:14px">💡 <b>How to use this page:</b> watch the video first, then work through the tabs in order. Tap any 🔊 or Turkish line to hear it. Use the chips at the top to hide the English, hide the pronunciation hints, or show the Arabic glosses from the book's Arabic edition. Your progress is saved in this browser.</div>
    </div>`));
  };

  /* ---------- Dialogues ---------- */
  views.dialogues = (m) => {
    m.appendChild(h(`<div><h2>Dialogues</h2><p class="lead">Listen, then read along. <b>▶ Play</b> reads the whole conversation. <b>🔁 Shadow</b> pauses after each line so you can repeat it, as the teacher asks. <b>🙈 Hide text</b> turns it into a listening test.</p></div>`));
    if (!L.dialogues.length) m.appendChild(h(`<div class="card muted">This lesson has no dialogue.</div>`));
    L.dialogues.forEach(d => {
      const names = Object.keys(d.people);
      const card = h(`<div class="card" style="margin-bottom:16px">
        <div class="dlg-head"><div><b>${esc(d.title)}</b>${d.titleTr ? " · " + tk(d.titleTr) : ""}<div class="muted" style="font-size:14px">${tz(esc(d.note || ""))}</div></div>
          <div class="row"><button class="btn small" data-act="play">▶ Play</button><button class="btn small" data-act="shadow">🔁 Shadow</button><button class="btn small" data-act="hide">🙈 Hide text</button></div></div>
        <div class="scene">${names.map(n => `<figure>${avatar(d.people[n], 64)}<figcaption>${esc(n)}</figcaption></figure>`).join(`<div style="font-size:30px;align-self:center">🤝</div>`)}</div>
        <div class="shadow-cue"></div>
        <div class="bubbles">${d.lines.map((ln, i) => {
          const side = names.indexOf(ln[0]) === 0 ? "left" : "right"; const g = d.people[ln[0]][0];
          return `<div class="bub ${side} ${g}" data-i="${i}">${avatar(d.people[ln[0]], 38)}<div class="body"><div class="who">${esc(ln[0])}</div>${tk(ln[1], "line")}<div class="en">${esc(ln[2])}</div>${gl(ln[3])}</div></div>`;
        }).join("")}</div></div>`);
      const bubs = [...card.querySelectorAll(".bub")]; const cue = $(".shadow-cue", card);
      let runId = 0;
      bubs.forEach((b, i) => b.querySelector(".body").onclick = () => { runId++; b.classList.add("revealed"); highlight(i); speak(d.lines[i][1]); });
      const highlight = i => bubs.forEach((b, j) => b.classList.toggle("active", j === i));
      async function run(shadow) {
        const my = ++runId;
        for (let i = 0; i < d.lines.length; i++) {
          if (my !== runId) return;
          highlight(i); cue.textContent = shadow ? "Listen…" : "";
          await speak(d.lines[i][1]);
          if (my !== runId) return;
          if (shadow) {
            const secs = Math.max(2, Math.round(d.lines[i][1].length / 10));
            for (let s = secs; s > 0; s--) { if (my !== runId) return; cue.textContent = `🎤 Your turn: repeat it (${s})`; await new Promise(r => setTimeout(r, 1000)); }
          } else await new Promise(r => setTimeout(r, 350));
        }
        highlight(-1); cue.textContent = shadow ? "✓ Well done! Try again with the text hidden." : "";
      }
      card.querySelector('[data-act="play"]').onclick = () => run(false);
      card.querySelector('[data-act="shadow"]').onclick = () => run(true);
      card.querySelector('[data-act="hide"]').onclick = (e) => { card.classList.toggle("hidetext"); bubs.forEach(b => b.classList.remove("revealed")); e.target.textContent = card.classList.contains("hidetext") ? "👁 Show text" : "🙈 Hide text"; };
      m.appendChild(card);
    });
  };

  /* ---------- Vocabulary ---------- */
  const boxOf = w => S.words[w.t] || 0;
  const setBox = (w, b) => { S.words[w.t] = Math.max(0, Math.min(5, b)); save(); };
  views.vocabulary = (m) => {
    const cats = ["All", ...new Set(L.vocab.map(v => v.cat))];
    let cat = "All", mode = "list";
    m.appendChild(h(`<div><h2>Vocabulary</h2><p class="lead">${L.vocab.length} words and phrases. Learn them in <b>List</b> mode, then test yourself with <b>Flashcards</b>. Flashcard results go into your spaced-review deck: words you miss come back more often.</p></div>`));
    const bar = h(`<div class="row" style="justify-content:space-between;margin-bottom:6px"><div class="filters"></div><div class="row"><button class="chip on" data-m="list">📋 List</button><button class="chip" data-m="flash">🃏 Flashcards</button></div></div>`);
    const box = h(`<div></div>`); m.append(bar, box);
    const drawFilters = () => { $(".filters", bar).innerHTML = cats.map(c => `<button class="chip ${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join(""); };
    bar.onclick = e => { const c = e.target.closest("[data-c]"), mm = e.target.closest("[data-m]");
      if (c) { cat = c.dataset.c; } if (mm) { mode = mm.dataset.m; bar.querySelectorAll("[data-m]").forEach(x => x.classList.toggle("on", x === mm)); }
      if (c || mm) draw(); };
    const list = () => L.vocab.filter(v => cat === "All" || v.cat === cat);
    function draw() {
      drawFilters(); box.innerHTML = "";
      if (mode === "list") {
        box.appendChild(h(`<div class="grid">${list().map(v => `<div class="card vcard" data-say="${esc(v.t)}" style="cursor:pointer">${playBtn(v.t)}<span class="box">${"●".repeat(boxOf(v))}${"○".repeat(5 - boxOf(v))}</span><div class="pic">${v.pic}</div>${tk(v.t)}${v.pr ? `<div class="pr">${esc(v.pr)}</div>` : ""}<div>${esc(v.en)}</div>${gl(v.ar)}${v.extra ? `<span class="tag">from the video</span>` : ""}</div>`).join("")}</div>`));
      } else flash(box, shuffle(list()));
    }
    draw();
  };
  function flash(box, deck) {
    let i = 0, dir = "tr", known = 0;
    const wrap = h(`<div class="flash-wrap"><div class="row" style="justify-content:center"><button class="chip on" data-d="tr">Turkish → English</button><button class="chip" data-d="en">English → Turkish</button></div><div class="muted" id="fc-count" style="margin-top:8px"></div><div class="flash"><div class="flash-inner"><div class="face front"></div><div class="face back"></div></div></div><div class="row" style="justify-content:center" id="fc-btns"><button class="btn" data-r="0">😕 Again</button><button class="btn primary" data-r="1">😀 Got it</button></div><p class="muted" style="font-size:13px">Tap the card to flip it.</p></div>`);
    box.appendChild(wrap);
    const card = $(".flash", wrap);
    function show() {
      if (i >= deck.length) { wrap.innerHTML = `<div class="card" style="text-align:center"><div class="score">${known}/${deck.length}</div><p>Words you marked “Again” will come up more often in the <a href="#review">Review</a> tab.</p><button class="btn primary" id="fc-again">Shuffle &amp; go again</button></div>`; $("#fc-again", wrap).onclick = () => { box.innerHTML = ""; flash(box, shuffle(deck)); }; return; }
      const v = deck[i]; card.classList.remove("flipped");
      $("#fc-count", wrap).textContent = `Card ${i + 1} of ${deck.length}`;
      const trFace = `<div class="pic">${v.pic}</div>${tk(v.t)}${v.pr ? `<div class="pr">${esc(v.pr)}</div>` : ""}${playBtn(v.t)}`;
      const enFace = `<div class="pic">${v.pic}</div><div style="font-size:22px;font-weight:600">${esc(v.en)}</div>${gl(v.ar)}`;
      $(".front", wrap).innerHTML = dir === "tr" ? `${tk(v.t)}${playBtn(v.t)}` : enFace;
      $(".back", wrap).innerHTML = dir === "tr" ? `${enFace}${v.pr ? `<div class="pr">${esc(v.pr)}</div>` : ""}` : trFace;
      if (dir === "tr") speak(v.t);
    }
    card.onclick = (e) => { if (e.target.closest(".play")) return; card.classList.toggle("flipped"); if (dir === "en" && card.classList.contains("flipped")) speak(deck[i].t); };
    $("#fc-btns", wrap).onclick = e => { const r = e.target.closest("[data-r]"); if (!r) return; const v = deck[i]; if (r.dataset.r === "1") { known++; setBox(v, boxOf(v) + 1); } else setBox(v, 0); i++; show(); };
    wrap.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { dir = b.dataset.d; wrap.querySelectorAll("[data-d]").forEach(x => x.classList.toggle("on", x === b)); show(); });
    show();
  }

  /* ---------- Grammar ---------- */
  views.grammar = (m) => {
    m.appendChild(h(`<div><h2>Grammar</h2><p class="lead">The rules behind the dialogues. Try each interactive box. Every Turkish word you build is read aloud. Tap any <b class="say" data-say="Türkçe">bold Turkish word</b> to hear it.</p></div>`));
    L.grammar.forEach(g => {
      const c = h(`<div class="card gblock" style="margin-bottom:16px"><h3>${tz(esc(g.title))}</h3>${g.body.map(p => `<p>${tz(p)}</p>`).join("")}</div>`);
      if (g.table) c.appendChild(tableEl(g.table));
      const w = g.widget, W = { harmony: harmonyWidget, origin: originWidget, combo: comboWidget, alphabet: alphabetWidget, demo: demoWidget };
      if (w && W[w.type]) c.appendChild(W[w.type](w));
      m.appendChild(c);
    });
  };
  // table: { head:[...], rows:[[...]], say: <column index holding Turkish to play> }
  function tableEl(t) {
    const sc = t.say == null ? 1 : t.say;
    return h(`<div style="overflow-x:auto"><table class="g"><tr>${t.head.map(x => `<th>${x}</th>`).join("")}</tr>${t.rows.map(r => `<tr>${r.map((cell, j) => j === sc ? `<td class="tkcell">${tk(cell)} ${playBtn(cell)}</td>` : `<td>${tz(cell)}</td>`).join("")}</tr>`).join("")}</table></div>`);
  }
  // vowel-harmony builder: pick a word and a suffix; the engine computes the form and explains the vowel choice
  function harmonyWidget(w) {
    let n = 0, k = w.suffixes[0];
    const el = h(`<div class="widget"><div class="label">${esc(w.label || "Build it yourself · pick a word, then a suffix")}</div><div class="row words"></div><div class="row sfxs" style="margin-top:8px"></div><div class="result"></div><div class="cap" style="text-align:center"></div></div>`);
    function draw(sayIt) {
      $(".words", el).innerHTML = w.words.map((x, i) => `<button class="chip ${i === n ? "on" : ""}" data-n="${i}">${esc(x.t)} <span class="muted">· ${esc(x.en)}</span></button>`).join("");
      $(".sfxs", el).innerHTML = w.suffixes.map(s => `<button class="chip ${s === k ? "on" : ""}" data-k="${s}">${esc(SUFFIX[s].name)}</button>`).join("");
      const x = w.words[n], sf = SUFFIX[k], exc = x.exc && x.exc[k];
      const out = exc || sf.make(x.t), v = lastV(x.t);
      const base = esc(x.t), i = tlow(x.t).lastIndexOf(v);
      const marked = i >= 0 ? `${esc(x.t.slice(0, i))}<u class="lv">${esc(x.t[i])}</u>${esc(x.t.slice(i + 1))}` : base;
      const tail = out.startsWith(x.t) ? out.slice(x.t.length) : "";
      $(".result", el).innerHTML = `<span class="tk">${tail ? `${esc(x.t)}<span class="sfx">${esc(tail)}</span>` : esc(out)}</span> ${playBtn(out)}`;
      const kind = BACK.includes(v) ? "kalın (back)" : "ince (front)";
      const why = exc ? `⚠️ Exception: ${esc(x.why || "this word breaks the usual rule")}`
        : sf.rule === "none" ? "değil is a separate word and never changes."
        : sf.rule === "2-way" ? `last vowel <b>${v}</b> is ${kind} → <b>${BACK.includes(v) ? "-lar" : "-ler"}</b>`
        : `last vowel <b>${v}</b> → <b>${four(x.t)}</b> (a/ı→ı · e/i→i · o/u→u · ö/ü→ü)${k === "im" && endsV(x.t) ? " · the word ends in a vowel, so a buffer <b>y</b> goes in first" : ""}`;
      $(".cap", el).innerHTML = `<div>${marked} → ${why}</div>${x.en && w.mean ? `<div class="muted" style="font-size:14px">${esc(w.mean(x, k) || "")}</div>` : ""}`;
      if (sayIt) speak(out);
    }
    el.onclick = e => { const a = e.target.closest("[data-n]"), b = e.target.closest("[data-k]"); if (a) n = +a.dataset.n; if (b) k = b.dataset.k; if (a || b) draw(true); };
    draw(false); return el;
  }
  // generic two-axis builder: pick a row, pick a column, see/hear the result
  function comboWidget(w) {
    let r = w.rows[0].k, c = w.cols[0].k;
    const el = h(`<div class="widget"><div class="label">${esc(w.label)}</div><div class="row rows"></div><div class="row cols" style="margin-top:8px"></div><div class="result" style="font-size:34px"></div><div class="cap" style="text-align:center"></div></div>`);
    function draw(sayIt) {
      $(".rows", el).innerHTML = w.rows.map(x => `<button class="chip ${x.k === r ? "on" : ""}" data-r="${x.k}">${esc(x.label)}</button>`).join("");
      $(".cols", el).innerHTML = w.cols.map(x => `<button class="chip ${x.k === c ? "on" : ""}" data-c="${x.k}">${esc(x.label)}</button>`).join("");
      const o = w.out[r + "|" + c]; if (!o) return;
      $(".result", el).innerHTML = `${tk(o[0])} ${playBtn(o[0])}`;
      $(".cap", el).innerHTML = `<b>${esc(o[1])}</b>${o[2] ? `<div class="muted" style="font-size:13px;margin-top:4px">${tz(o[2])}</div>` : ""}`;
      if (sayIt) speak(o[0]);
    }
    el.onclick = e => { const a = e.target.closest("[data-r]"), b = e.target.closest("[data-c]"); if (a) r = a.dataset.r; if (b) c = b.dataset.c; if (a || b) draw(true); };
    draw(false); return el;
  }
  // country cards: tap to cycle country → -lI (person from) → -lIyIm (I'm from…) → nationality
  function originWidget(w) {
    const el = h(`<div class="widget"><div class="label">Tap a country: country → person from (-lI) → “I'm from…” (-lIyIm)${w.items.some(i => i.nat) ? " → nationality" : ""}</div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))"></div></div>`);
    const g = $(".grid", el);
    w.items.forEach(it => {
      const li = SUFFIX.li.make(it.c), liyim = SUFFIX.liyim.make(it.c);
      const st = [[it.c, it.en, "country"], [li, `a person from ${it.en}`, "-lI"], [liyim, `I am from ${it.en}`, "-lIyIm"]];
      if (it.nat) st.push([it.nat[0], it.nat[1], "nationality"]);
      let s = 0; const c = h(`<div class="ncard"></div>`);
      const draw = () => { c.innerHTML = `<div class="flag">${it.flag}</div>${tk(st[s][0])}<div style="font-size:14px">${esc(st[s][1])}</div><div class="stage">${st[s][2]}${it.bonus ? " · bonus" : ""}</div>`; };
      c.onclick = () => { s = (s + 1) % st.length; draw(); speak(st[s][0]); };
      draw(); g.appendChild(c);
    });
    return el;
  }
  // the 29-letter alphabet: tap a letter to hear its name and an example word
  const ABC = [["A", "a"], ["B", "be"], ["C", "ce"], ["Ç", "çe"], ["D", "de"], ["E", "e"], ["F", "fe"], ["G", "ge"], ["Ğ", "yumuşak ge"], ["H", "he"], ["I", "ı"], ["İ", "i"], ["J", "je"], ["K", "ke"], ["L", "le"], ["M", "me"], ["N", "ne"], ["O", "o"], ["Ö", "ö"], ["P", "pe"], ["R", "re"], ["S", "se"], ["Ş", "şe"], ["T", "te"], ["U", "u"], ["Ü", "ü"], ["V", "ve"], ["Y", "ye"], ["Z", "ze"]];
  function alphabetWidget(w) {
    const el = h(`<div class="widget"><div class="label">Tap a letter · <span class="kv">kalın vowel</span> <span class="iv">ince vowel</span> consonant</div><div class="abc"></div><div class="cap" style="text-align:center;min-height:70px;margin-top:10px"></div></div>`);
    $(".abc", el).innerHTML = ABC.map(([L2, nm]) => { const lo = tlow(L2); const cls = "aıou".includes(lo) ? "kv" : "eiöü".includes(lo) ? "iv" : ""; return `<button class="abtn ${cls}" data-l="${L2}">${L2}${lo}</button>`; }).join("");
    el.onclick = e => {
      const b = e.target.closest("[data-l]"); if (!b) return;
      const [L2, nm] = ABC.find(x => x[0] === b.dataset.l), ex = (w.words || {})[L2];
      el.querySelectorAll(".abtn").forEach(x => x.classList.toggle("sel", x === b));
      $(".cap", el).innerHTML = `<div style="font-size:28px"><b>${L2} ${tlow(L2)}</b> <span class="muted" style="font-size:16px">name: “${esc(nm)}”</span></div>${ex ? `<div>${tk(ex[0])} ${playBtn(ex[0])} <span class="muted">${esc(ex[1])}</span></div>` : ""}${w.tips && w.tips[L2] ? `<div class="muted" style="font-size:14px">${tz(w.tips[L2])}</div>` : ""}`;
      speak(ex ? `${nm}. ${ex[0]}` : nm);
    };
    return el;
  }
  // bu / şu / o: how far is the object?
  function demoWidget(w) {
    let d = 0, o = 0, pl = false;
    const D = [["bu", "bunlar", "near (yakın)", 1], ["şu", "şunlar", "further away (uzak)", 4], ["o", "onlar", "far away (çok uzak)", 8]];
    const el = h(`<div class="widget"><div class="label">${esc(w.label || "How far away is it? Pick a distance and an object")}</div><div class="row ds"></div><div class="row os" style="margin-top:8px"></div><div class="row" style="margin-top:8px"><button class="chip" data-pl="1">➕ plural (more than one)</button></div><div class="dscene"></div><div class="result" style="font-size:34px;min-height:0"></div><div class="cap" style="text-align:center"></div></div>`);
    function draw(sayIt) {
      $(".ds", el).innerHTML = D.map((x, i) => `<button class="chip ${i === d ? "on" : ""}" data-d="${i}">${x[0]} · ${x[2]}</button>`).join("");
      $(".os", el).innerHTML = w.objects.map((x, i) => `<button class="chip ${i === o ? "on" : ""}" data-o="${i}">${x.pic} ${esc(x.t)}</button>`).join("");
      el.querySelector("[data-pl]").classList.toggle("on", pl);
      const ob = w.objects[o], pic = pl ? ob.pic.repeat(3) : ob.pic;
      $(".dscene", el).innerHTML = `<span style="font-size:34px">🙋</span><span class="gap" style="flex:${D[d][3]}"></span><span style="font-size:34px">${pic}</span><span class="gap" style="flex:${9 - D[d][3]}"></span>`;
      const q = `${pl ? D[d][1] : D[d][0]} ne?`.replace(/^./, c => c.toLocaleUpperCase("tr"));
      const a = `${(pl ? D[d][1] : D[d][0]).replace(/^./, c => c.toLocaleUpperCase("tr"))} ${ob.t}.`;
      $(".result", el).innerHTML = `${tk(q)} → ${tk(a)} ${playBtn(q + " " + a)}`;
      $(".cap", el).innerHTML = `<b>${pl ? "What are these/those?" : "What is this/that?"}</b> → <b>${pl ? "These/those are" : "This/that is"} ${pl ? "" : "a "}${esc(ob.en)}${pl ? "s" : ""}.</b>${pl ? `<div class="muted" style="font-size:13px">With bunlar/şunlar/onlar the noun usually stays singular: ${esc(a)} (you can also just answer ${esc(SUFFIX.pl.make(ob.t).replace(/^./, c => c.toLocaleUpperCase("tr")))}.)</div>` : ""}`;
      if (sayIt) speak(q + " " + a);
    }
    el.onclick = e => { const a = e.target.closest("[data-d]"), b = e.target.closest("[data-o]"), p = e.target.closest("[data-pl]"); if (a) d = +a.dataset.d; if (b) o = +b.dataset.o; if (p) pl = !pl; if (a || b || p) draw(true); };
    draw(false); return el;
  }

  /* ---------- Pronunciation ---------- */
  views.sounds = (m) => {
    const sd = L.sounds;
    m.appendChild(h(`<div><h2>Pronunciation</h2><p class="lead">${tz(esc(sd.intro))}</p></div>`));
    const g = h(`<div class="stack"></div>`);
    sd.letters.forEach(x => g.appendChild(h(`<div class="card letter"><div class="glyph" data-say="${esc(x.ex[0])}">${esc(x.l)}</div><div><b>${esc(x.name)}</b><p style="margin:4px 0 8px">${tz(esc(x.tip))}</p>${x.ex.map(w => `<span class="ex" data-say="${esc(w)}">${tk(w)}<button class="play" style="width:28px;height:28px;font-size:12px">🔊</button></span>`).join("")}</div></div>`)));
    m.appendChild(g);
    m.appendChild(h(`<h3>Minimal pairs: hear the difference</h3>`));
    const pg = h(`<div class="stack"></div>`);
    sd.pairs.forEach(p => pg.appendChild(h(`<div class="card pair"><div class="side" data-say="${esc(p.a[0])}">${tk(p.a[0])}<div class="en">${esc(p.a[1])}</div></div><div class="vs">${esc(p.note)}<br>vs</div><div class="side" data-say="${esc(p.b[0])}">${tk(p.b[0])}<div class="en">${esc(p.b[1])}</div></div></div>`)));
    m.appendChild(pg);
    m.appendChild(h(`<h3>🎯 Which one did you hear?</h3>`));
    const game = h(`<div class="card" style="text-align:center"><button class="play big-play" id="pg-play">▶</button><div class="row" style="justify-content:center" id="pg-opts"></div><div id="pg-fb" class="muted" style="margin-top:10px">Press play, then choose the word you heard.</div><div class="muted" id="pg-score" style="font-size:13px"></div></div>`);
    let cur, right = 0, total = 0;
    const next = () => { const p = sd.pairs[Math.floor(Math.random() * sd.pairs.length)]; cur = { p, pick: Math.random() < .5 ? "a" : "b" }; $("#pg-opts", game).innerHTML = shuffle(["a", "b"]).map(k => `<button class="opt" data-k="${k}">${tk(p[k][0])} <span class="en">${esc(p[k][1])}</span></button>`).join(""); };
    $("#pg-play", game).onclick = (e) => speak(cur.p[cur.pick][0], e.currentTarget, 0.7);
    $("#pg-opts", game).onclick = e => { const b = e.target.closest("[data-k]"); if (!b) return; total++; const ok = b.dataset.k === cur.pick; if (ok) right++;
      $("#pg-fb", game).innerHTML = ok ? `<span style="color:var(--good)">✓ Correct!</span>` : `<span style="color:var(--bad)">✗ It was ${tk(cur.p[cur.pick][0])}</span>`;
      $("#pg-score", game).textContent = `Score: ${right}/${total}`; next(); };
    next(); m.appendChild(game);
    m.appendChild(recorderCard("Record yourself", "Say a word or a dialogue line, then play it back and compare it with the 🔊 model."));
  };

  /* ---------- recorder (works where the microphone is allowed) ---------- */
  function recorderCard(title, sub) {
    const el = h(`<div class="card" style="margin-top:16px"><b>🎙️ ${title}</b><p class="muted" style="margin:4px 0 10px;font-size:14px">${sub}</p><div class="rec"><button class="btn" id="rec-btn">● Record</button><span id="rec-state" class="muted"></span><audio id="rec-audio" controls style="display:none;height:36px"></audio></div></div>`);
    let mr = null, chunks = [];
    $("#rec-btn", el).onclick = async () => {
      const st = $("#rec-state", el), btn = $("#rec-btn", el);
      if (mr && mr.state === "recording") { mr.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mr = new MediaRecorder(stream); chunks = [];
        mr.ondataavailable = e => chunks.push(e.data);
        mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); const a = $("#rec-audio", el); a.src = URL.createObjectURL(new Blob(chunks)); a.style.display = "inline-block"; btn.textContent = "● Record again"; st.innerHTML = ""; a.play().catch(() => {}); };
        mr.start(); btn.textContent = "■ Stop"; st.innerHTML = `<span class="dot"></span> recording…`;
      } catch (e) { st.innerHTML = "The microphone isn't available on this page. Open the course from your GitHub Pages site to record, or simply say it out loud."; }
    };
    return el;
  }

  /* ---------- quiz runner ---------- */
  function runQuiz(m, items, quizId, onDone) {
    let i = 0, score = 0; const wrong = [], wrongItems = [];
    const q = h(`<div class="quiz card"></div>`); m.appendChild(q);
    function show() {
      if (i >= items.length) {
        const pct = Math.round(100 * score / items.length);
        LS.best[quizId] = Math.max(LS.best[quizId] || 0, pct); save();
        q.innerHTML = `<div style="text-align:center"><div class="score">${score} / ${items.length}</div><p>${pct >= 90 ? "Harika! Excellent! 🌟" : pct >= 70 ? "Aferin! Good work 👍" : "Keep practising. Review the tabs and try again 💪"} · Best: ${LS.best[quizId]}%</p>${wrong.length ? `<div style="text-align:left"><b>Review these:</b><ul>${wrong.map(w => `<li>${w}</li>`).join("")}</ul></div>` : ""}<button class="btn primary" id="qa">Try again</button></div>`;
        $("#qa", q).onclick = () => { q.remove(); runQuiz(m, shuffle(items), quizId, onDone); };
        if (onDone) onDone(pct, wrongItems, score, items.length); return;
      }
      const it = items[i];
      q.innerHTML = `<div class="qhead"><span>Question ${i + 1} of ${items.length}</span><span>Score ${score}</span></div><div class="qbar"><div style="width:${100 * i / items.length}%"></div></div><div class="qbody"></div>`;
      const body = $(".qbody", q);
      const finish = (ok, correctText, explain) => {
        if (ok) score++; else { wrong.push(esc(correctText)); wrongItems.push(it); }
        if (it.word) setBox(it.word, ok ? boxOf(it.word) + 1 : 0);
        body.appendChild(h(`<div class="feedback ${ok ? "good" : "bad"}">${ok ? "✓ Doğru! Correct!" : "✗ Not quite. Answer: " + esc(correctText)}${explain ? `<span class="ex-text">${tz(explain)}</span>` : ""}</div>`));
        const nb = h(`<div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn primary">Next →</button></div>`);
        $("button", nb).onclick = () => { i++; show(); }; body.appendChild(nb); $("button", nb).focus();
      };
      if (it.type === "order") return orderQ(body, it, finish);
      if (it.type === "match") return matchQ(body, it, finish);
      if (it.type === "type") return typeQ(body, it, finish);
      let head = "";
      if (it.type === "mcq") head = `<div class="qtext">${tz(esc(it.q))}</div>`;
      if (it.type === "fill") { const [a, b = ""] = it.sentence.split("___"); head = `<div class="qtext">Fill in the blank</div><div class="qsentence"><span class="tk">${esc(a)}<span class="blank">?</span>${esc(b)}</span></div><div class="en" style="text-align:center">${esc(it.en)}</div>`; }
      if (it.type === "reply") head = `<div class="qtext">${esc(it.en)}</div><div class="qsentence">${tk(it.prompt)} ${playBtn(it.prompt)}</div>`;
      if (it.type === "listen") head = `<div class="qtext">${esc(it.q || "Listen. What did you hear?")}</div><button class="play big-play" data-say="${esc(it.say)}">▶</button>`;
      const opts = it.options.map((o, k) => ({ o, k }));
      body.innerHTML = head + `<div class="opts">${opts.map(({ o, k }) => `<button class="opt" data-k="${k}">${tz(esc(o))}</button>`).join("")}</div>`;
      if (it.type === "listen") setTimeout(() => speak(it.say, $(".big-play", body)), 250);
      body.querySelector(".opts").onclick = e => {
        const b = e.target.closest(".opt"); if (!b || e.target.closest(".say")) return;
        const k = +b.dataset.k, ok = k === it.answer;
        body.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === it.answer) x.classList.add("correct"); });
        if (!ok) b.classList.add("wrong");
        if (it.type === "fill") speak(it.sentence.replace("___", it.options[it.answer]));
        else if (it.type === "reply" || (it.type === "mcq" && it.sayAnswer)) speak(it.options[it.answer]);
        finish(ok, it.options[it.answer], it.explain);
      };
    }
    show();
  }
  function orderQ(body, it, finish) {
    const lines = !!it.lines, pool = shuffle(it.words.map((w, k) => ({ w, k }))); let ans = [];
    body.innerHTML = `<div class="qtext">${lines ? esc(it.q || "Put the lines in order") : `Build the sentence: <span class="en" style="color:var(--ink)">“${esc(it.en)}”</span>`}</div><div class="muted" style="font-size:13px">Tap the ${lines ? "lines" : "words"} in order. Tap a placed ${lines ? "line" : "word"} to take it back.</div><div class="tiles answer ${lines ? "lines" : ""}"></div><div class="tiles pool ${lines ? "lines" : ""}"></div><div class="row" style="justify-content:flex-end"><button class="btn small" id="o-clear">Clear</button><button class="btn primary" id="o-check">Check</button></div>`;
    const draw = () => {
      $(".answer", body).innerHTML = ans.map((x, j) => `<button class="tile" data-a="${j}">${lines ? `<b>${j + 1}.</b> ` : ""}${esc(x.w)}</button>`).join("");
      $(".pool", body).innerHTML = pool.filter(x => !ans.includes(x)).map(x => `<button class="tile" data-p="${x.k}">${esc(x.w)}</button>`).join("");
    };
    body.onclick = e => {
      const p = e.target.closest("[data-p]"), a = e.target.closest("[data-a]");
      if (p) { ans.push(pool.find(x => x.k === +p.dataset.p)); draw(); if (!lines) speak(ans[ans.length - 1].w); }
      if (a) { ans.splice(+a.dataset.a, 1); draw(); }
    };
    $("#o-clear", body).onclick = () => { ans = []; draw(); };
    $("#o-check", body).onclick = (e) => {
      if (ans.length < it.words.length) return;
      // equal words may be swapped freely
      const ok = ans.every((x, j) => x.w === it.words[j]); body.onclick = null; e.target.disabled = true; $("#o-clear", body).disabled = true;
      if (!lines) speak(it.words.join(" "));
      finish(ok, lines ? it.words.map((w, j) => `${j + 1}. ${w}`).join("  ") : it.words.join(" "), it.explain);
    };
    draw();
  }
  function matchQ(body, it, finish) {
    const left = shuffle(it.pairs.map((p, k) => ({ t: p[0], k }))), right = shuffle(it.pairs.map((p, k) => ({ t: p[1], k })));
    let sel = null, matched = 0, mistakes = 0;
    body.innerHTML = `<div class="qtext">${esc(it.q || "Match each Turkish word with its meaning")}</div><div class="match">${left.map((l, j) => `<button class="mi" data-side="l" data-k="${l.k}">${tk(l.t)}</button><button class="mi" data-side="r" data-k="${right[j].k}">${esc(right[j].t)}</button>`).join("")}</div>`;
    body.querySelector(".match").onclick = e => {
      const b = e.target.closest(".mi"); if (!b || b.classList.contains("ok")) return;
      if (b.dataset.side === "l") speak(it.pairs[+b.dataset.k][0]);
      if (!sel || sel.dataset.side === b.dataset.side) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
      if (sel.dataset.k === b.dataset.k) { sel.classList.replace("sel", "ok"); b.classList.add("ok"); matched++; sel = null;
        if (matched === it.pairs.length) finish(mistakes <= 1, mistakes <= 1 ? "" : `${mistakes} mismatches. Try the match again later`); }
      else { mistakes++; const s = sel; s.classList.remove("sel"); [s, b].forEach(x => x.classList.add("no")); setTimeout(() => [s, b].forEach(x => x.classList.remove("no")), 500); sel = null; }
    };
  }
  // typed answer; accepts any of it.answers (case and punctuation ignored). Special-letter buttons for phones/keyboards without Turkish.
  const TRKEYS = ["ç", "ğ", "ı", "İ", "ö", "ş", "ü"];
  const keyRow = () => `<div class="row trkeys">${TRKEYS.map(c => `<button class="chip" data-ch="${c}">${c}</button>`).join("")}</div>`;
  function wireKeys(el) { el.addEventListener("click", e => { const k = e.target.closest("[data-ch]"); if (!k) return; const host = k.closest("li,.qbody"); const inp = host && host.querySelector("input"); if (!inp || inp.disabled) return; const s = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, s) + k.dataset.ch + inp.value.slice(inp.selectionEnd ?? s); inp.focus(); inp.setSelectionRange(s + 1, s + 1); }); }
  function typeQ(body, it, finish) {
    body.innerHTML = `<div class="qtext">${tz(esc(it.q))}</div>${it.say ? `<div style="text-align:center">${playBtn(it.say, "big-play")}</div>` : ""}<div class="row"><input class="tin" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type in Turkish…" style="flex:1"><button class="btn primary" id="t-check">Check</button></div>${keyRow()}`;
    wireKeys(body);
    const inp = $("input", body); inp.focus(); if (it.say) setTimeout(() => speak(it.say, $(".big-play", body)), 250);
    const go = () => { if (!inp.value.trim()) return; const ok = it.answers.some(a => norm(a) === norm(inp.value)); inp.disabled = true; $("#t-check", body).disabled = true; inp.classList.add(ok ? "ok" : "no"); speak(it.answers[0]); finish(ok, it.answers[0], it.explain); };
    $("#t-check", body).onclick = go; inp.onkeydown = e => { if (e.key === "Enter") go(); };
  }
  function vocabMCQ(n, dir) {
    const pool = L.vocab;
    return shuffle(pool).slice(0, n).map(w => {
      const distract = shuffle(pool.filter(x => x !== w && x.en !== w.en)).slice(0, 3);
      const opts = shuffle([w, ...distract]);
      return dir === "listen"
        ? { type: "listen", say: w.t, options: opts.map(o => o.en), answer: opts.indexOf(w), word: w, src: w.src, area: "vocabulary" }
        : dir === "en2tr"
          ? { type: "mcq", q: `How do you say “${w.en}”?`, options: opts.map(o => o.t), answer: opts.indexOf(w), word: w, src: w.src, area: "vocabulary", sayAnswer: true }
          : { type: "mcq", q: `What does [[${w.t}]] mean?`, options: opts.map(o => o.en), answer: opts.indexOf(w), word: w, src: w.src, area: "vocabulary" };
    });
  }

  /* ---------- Listening ---------- */
  views.listening = (m) => {
    m.appendChild(h(`<div><h2>Listening</h2><p class="lead">Train your ear without reading. Each question plays automatically. Press ▶ to hear it again. Set 🐢 Slow at the top if it's too fast.</p></div>`));
    const B = L.classify;
    const pick = h(`<div class="row" style="margin-bottom:14px"><button class="chip on" data-l="words">🔤 Words (10)</button><button class="chip" data-l="lines">💬 Dialogue lines (8)</button>${B ? `<button class="chip" data-l="cls">${esc(B.label)} (8)</button>` : ""}<button class="chip" data-l="dict">⌨️ Dictation (6)</button></div>`);
    const box = h(`<div></div>`); m.append(pick, box);
    const allLines = L.dialogues.flatMap(d => d.lines.map(l => ({ l, d })));
    const sets = {
      words: () => vocabMCQ(10, "listen"),
      lines: () => shuffle([...new Map(allLines.filter(x => x.l[1].length > 6).map(x => [x.l[1], x])).values()]).slice(0, 8).map(({ l }) => {
        const others = shuffle([...new Set(allLines.filter(x => x.l[1] !== l[1]).map(x => x.l[2]).filter(t => t !== l[2]))]).slice(0, 3);
        const opts = shuffle([l[2], ...others]); return { type: "listen", say: l[1], options: opts, answer: opts.indexOf(l[2]) };
      }),
      cls: () => {
        const src = B.items || allLines.map(x => ({ say: x.l[1], en: x.l[2] }));
        return shuffle(src.map(x => Object.assign({}, x, { a: x.a != null ? x.a : B.rules.findIndex(r => new RegExp(r, "i").test(x.say)) })).filter(x => x.a >= 0)).slice(0, 8)
          .map(x => ({ type: "listen", q: B.q, say: x.say, options: B.options, answer: x.a, explain: `${x.say}${x.en ? " — " + x.en : ""}` }));
      },
      dict: () => shuffle(L.vocab.filter(v => v.t.length < 22)).slice(0, 6).map(w => ({ type: "type", q: "Listen and type what you hear", say: w.t, answers: [w.t], word: w, explain: `${w.t} = ${w.en}` }))
    };
    const go = k => { box.innerHTML = ""; runQuiz(box, sets[k](), "listen-" + k); };
    pick.onclick = e => { const b = e.target.closest("[data-l]"); if (!b) return; pick.querySelectorAll("[data-l]").forEach(x => x.classList.toggle("on", x === b)); go(b.dataset.l); };
    go("words");
  };

  /* ---------- Practice quiz ---------- */
  views.practice = (m) => {
    m.appendChild(h(`<div><h2>Quiz</h2><p class="lead">Mixed practice: grammar choices, fill in the blank, sentence building, logical replies, typing, word matching and vocabulary. Your best score is saved.</p></div>`));
    const matchItem = { type: "match", pairs: shuffle(L.vocab.filter(v => !v.extra)).slice(0, 6).map(v => [v.t, v.en]) };
    const items = [...shuffle(L.practice), matchItem, ...vocabMCQ(4, "tr2en"), ...vocabMCQ(3, "en2tr")];
    runQuiz(m, items, "practice");
  };

  /* ---------- Speaking ---------- */
  views.speaking = (m) => {
    m.appendChild(h(`<div><h2>Speaking: role-play</h2><p class="lead">${tz(esc(L.roleplayIntro || "Your partner speaks and you answer out loud with your own name and country. Then reveal the model answer and compare."))}</p></div>`));
    const card = h(`<div class="card rp"></div>`); m.appendChild(card);
    let i = 0;
    function show() {
      if (i >= L.roleplay.length) { card.innerHTML = `<div style="text-align:center"><div class="score">🎉</div><p>Conversation complete! Do it again faster, or swap roles and ask the questions yourself.</p><button class="btn primary" id="rp-again">Start over</button></div>`; $("#rp-again", card).onclick = () => { i = 0; show(); }; return; }
      const r = L.roleplay[i];
      card.innerHTML = `<div class="muted">Turn ${i + 1} of ${L.roleplay.length}</div>
        <div class="bub left m"><div>${avatar(L.partner || "m1", 40)}</div><div class="body" data-say="${esc(r.them)}">${tk(r.them, "line")} ${playBtn(r.them)}${r.themEn ? `<div class="en">${esc(r.themEn)}</div>` : ""}</div></div>
        <div><b>Your turn:</b> ${tz(esc(r.hint))}</div>
        <div class="row"><button class="btn" id="rp-show">👁 Show model answer</button><button class="btn primary" id="rp-next">Next →</button></div>
        <div id="rp-model" style="display:none" class="bub right"><div class="body">${tk(r.you, "line")} ${playBtn(r.you)}${r.youEn ? `<div class="en">${esc(r.youEn)}</div>` : ""}</div></div>`;
      $("#rp-show", card).onclick = () => { $("#rp-model", card).style.display = "flex"; speak(r.you); };
      $("#rp-next", card).onclick = () => { i++; show(); };
      setTimeout(() => speak(r.them), 200);
    }
    show();
    m.appendChild(recorderCard("Record your answers", "Record the whole role-play in one take, then listen back."));
  };

  /* ---------- Tips ---------- */
  views.tips = (m) => {
    m.appendChild(h(`<div><h2>Teacher's tips</h2><p class="lead">The key points and memory aids from the video and the book.</p></div>`));
    const g = h(`<div class="stack"></div>`);
    L.tips.forEach(t => g.appendChild(h(`<div class="card tipcard"><div class="ic">${t.icon}</div><div><b>${tz(esc(t.t))}</b><p style="margin:4px 0 0">${tz(t.d)}</p></div></div>`)));
    m.appendChild(g);
  };

  /* ---------- Teacher's notes (English translation of the video) ---------- */
  views.notes = (m) => {
    const N = L.notes;
    m.appendChild(h(`<div><h2>Teacher's notes</h2><p class="lead">${N ? tz(N.intro) : "The teacher's video notes for this lesson haven't been added yet. Until then, use the Teacher's tips tab and the book pages listed on the Overview."}</p></div>`));
    if (!N) return;
    if (N.summary) m.appendChild(h(`<div class="card" style="margin-bottom:14px"><b>In short</b><ul class="goals">${N.summary.map(s => `<li>${tz(s)}</li>`).join("")}</ul></div>`));
    N.sections.forEach((s, i) => {
      const d = h(`<details class="card note" ${i < 2 ? "open" : ""} style="margin-bottom:10px"><summary><b>${esc(s.h)}</b>${s.ref ? ` <span class="muted" style="font-size:13px">· ${esc(s.ref)}</span>` : ""}</summary>${s.p.map(p => `<p>${tz(p)}</p>`).join("")}</details>`);
      m.appendChild(d);
    });
    if (N.source) m.appendChild(h(`<p class="muted" style="font-size:13px">${tz(N.source)}</p>`));
  };

  /* ---------- Review ---------- */
  views.review = (m) => {
    const weak = L.vocab.filter(w => boxOf(w) <= 1);
    const strong = L.vocab.filter(w => boxOf(w) >= 3).length;
    m.appendChild(h(`<div><h2>Review</h2><p class="lead">Spaced repetition: each correct answer moves a word up a box (○ → ●●●●●). A miss sends it back to the start. Review the weak words daily until they reach 3+ boxes.</p></div>`));
    m.appendChild(h(`<div class="grid" style="margin-bottom:16px">
      <div class="card"><div class="muted">Sections completed</div><div class="score" style="font-size:36px;text-align:left">${learnable.filter(s => LS.done[s[0]]).length}/${learnable.length}</div></div>
      <div class="card"><div class="muted">Words known well (3+)</div><div class="score" style="font-size:36px;text-align:left">${strong}/${L.vocab.length}</div></div>
      <div class="card"><div class="muted">Best quiz score</div><div class="score" style="font-size:36px;text-align:left">${LS.best.practice != null ? LS.best.practice + "%" : "—"}</div></div></div>`));
    const box = h(`<div></div>`); m.appendChild(box);
    if (weak.length) { box.appendChild(h(`<h3>Due for review: ${weak.length} words</h3>`)); flash(box, shuffle(weak)); }
    else box.appendChild(h(`<div class="card">🎉 Nothing due. Every word is in box 2 or higher. Come back tomorrow, or test yourself in the Quiz tab.</div>`));
    const reset = h(`<div style="margin-top:30px"><button class="btn small" id="rs">Reset this lesson's progress</button> <span id="rs-c"></span></div>`);
    $("#rs", reset).onclick = () => { $("#rs-c", reset).innerHTML = `Are you sure? <button class="btn small" id="rs-y">Yes, reset</button>`; $("#rs-y", reset).onclick = () => { S.lessons[L.id] = { done: {}, best: {} }; L.vocab.forEach(w => delete S.words[w.t]); save(); location.reload(); }; };
    m.appendChild(reset);
  };

  /* =====================================================================
     TEST PAGES: book test (the unit's "Neler Öğrendik?" page), mastery test, results
     ===================================================================== */
  function initTest() {
    S.tests = S.tests || {};
    const TS = S.tests[T.id] = S.tests[T.id] || { attempts: [] };
    const lessonName = id => { const l = L.lessons.find(x => x.id === id); return l ? `Lesson ${l.num}: ${l.title}` : id; };
    const lessonLink = (id, area) => window.COURSE_HOME ? `<a href="${id}.html#${area || "grammar"}">${esc(lessonName(id))} ↗</a>` : esc(lessonName(id));
    const fmt = n => (Math.round(n * 2) / 2).toString();
    document.title = `${T.title} · Turkish A1`;
    document.body.innerHTML = `
    <header class="top"><div class="top-inner">
      <div class="brand"><small>${window.COURSE_HOME ? `<a href="${window.COURSE_HOME}">← Course</a> · ` : ""}${BOOK} · Unit ${T.unit} · ${esc(T.pages)}</small><b>${esc(T.title)}</b></div>
      <div class="toggles"><button class="chip" id="t-en">EN Meaning</button><button class="chip" id="t-rate">🐢 Speed</button></div></div>
      <nav class="tabs" id="tabs"><a href="#book" data-tab="book">📘 Book test</a><a href="#mastery" data-tab="mastery">🎯 Mastery test</a><a href="#results" data-tab="results">📈 Results</a></nav>
    </header><main id="main"></main>
    <footer>Book test from <i>${BOOK}</i> (“Neler Öğrendik?”) · answers checked against the book and the unit's lessons.</footer>`;
    wirePrefs();

    function saveAttempt(a) { TS.attempts.push(Object.assign({ date: new Date().toISOString() }, a)); save(); }
    function weakReport(wrongs) {
      const g = {}; wrongs.forEach(w => { if (!w.lesson) return; g[w.lesson] = g[w.lesson] || { n: 0, areas: new Set() }; g[w.lesson].n++; g[w.lesson].areas.add(w.area || "grammar"); });
      const ids = Object.keys(g).sort((a, b) => g[b].n - g[a].n);
      if (!ids.length) return `<p>🌟 No mistakes. You've mastered this unit, so move on to the next one!</p>`;
      return `<b>Revise these first:</b><ul>${ids.map(id => `<li>${lessonLink(id, [...g[id].areas][0])} · ${g[id].n} mistake${g[id].n > 1 ? "s" : ""}</li>`).join("")}</ul>`;
    }
    const fbLine = (ok, ans, why) => `${ok ? "✓" : "✗ Answer: " + tk(ans)} <span class="muted">${tz(esc(why || ""))}</span>`;
    const pickTiles = (sec, el, onPick) => { const pick = {}; let locked = false;
      el.addEventListener("click", e => { const b = e.target.closest("[data-j]"); if (!b || locked) return; const i = b.dataset.i; pick[i] = +b.dataset.j;
        el.querySelectorAll(`[data-i="${i}"]`).forEach(x => x.classList.toggle("sel", x === b)); if (onPick) onPick(+i, pick[i]); });
      return { pick, lock() { locked = true; } };
    };
    const markTiles = (el, i, a, p) => el.querySelectorAll(`[data-i="${i}"]`).forEach((x, j) => { if (j === a) x.classList.add("ok"); else if (j === p) x.classList.add("no"); });

    /* ---------- section widgets: each returns { el, check() → {score, wrong:[{lesson, area}]} } ---------- */
    const W = {};
    // match: left item + dropdown of right items
    W.match = (sec) => {
      const bs = shuffle(sec.items.map(x => x.b));
      const el = h(`<ol class="titems">${sec.items.map((it, i) => `<li><span class="qsent">${tk(it.a)} → <select data-i="${i}"><option value="">……</option>${bs.map(b => `<option>${esc(b)}</option>`).join("")}</select></span><div class="fb"></div></li>`).join("")}</ol>`);
      return { el, check() {
        let sc = 0; const wrong = [];
        el.querySelectorAll("select").forEach(s => { const it = sec.items[+s.dataset.i], ok = s.value === it.b; s.disabled = true; s.classList.add(ok ? "ok" : "no");
          if (ok) sc++; else wrong.push({ lesson: it.lesson });
          s.closest("li").querySelector(".fb").innerHTML = fbLine(ok, it.b, it.why); });
        return { score: sc * sec.marks / sec.items.length, wrong };
      } };
    };
    // dialogue: a short exchange with one blank line; choose a/b/c
    W.dialogue = (sec) => {
      const el = h(`<ol class="titems">${sec.items.map((it, i) => `<li><div class="mini">${it.lines.map(([who, txt]) => `<div><b>${esc(who)}:</b> ${txt === "___" ? `<span class="blank" data-b="${i}">……</span>` : tk(txt)}</div>`).join("")}</div><div class="opts" style="margin-top:6px">${it.o.map((o, j) => `<button class="tile opt-l" data-i="${i}" data-j="${j}">${"abc"[j]}. ${esc(o)}</button>`).join("")}</div><div class="fb"></div></li>`).join("")}</ol>`);
      const P = pickTiles(sec, el, (i, j) => { el.querySelector(`[data-b="${i}"]`).textContent = sec.items[i].o[j]; speak(sec.items[i].o[j]); });
      return { el, check() {
        P.lock(); let sc = 0; const wrong = [];
        sec.items.forEach((it, i) => { const ok = P.pick[i] === it.a; if (ok) sc++; else wrong.push({ lesson: it.lesson });
          markTiles(el, i, it.a, P.pick[i]); el.querySelectorAll("li > .fb")[i].innerHTML = fbLine(ok, it.o[it.a], it.why); });
        return { score: sc * sec.marks / sec.items.length, wrong };
      } };
    };
    // type: write the answer (plural forms, unscrambled words…)
    W.type = (sec) => {
      const el = h(`<div>${keyRow()}<ol class="titems tgrid">${sec.items.map((it, i) => `<li><span class="qsent">${tk(it.p)} → <input class="tin" data-i="${i}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"></span><div class="fb"></div></li>`).join("")}</ol></div>`);
      wireKeys(el);
      el.addEventListener("focusin", e => { if (e.target.matches("input")) el._last = e.target; });
      el.querySelector(".trkeys").addEventListener("click", e => { const k = e.target.closest("[data-ch]"); const inp = el._last; if (!k || !inp || inp.disabled) return; inp.value += k.dataset.ch; inp.focus(); }, true);
      return { el, check() {
        let sc = 0; const wrong = [];
        el.querySelectorAll("input").forEach(inp => { const it = sec.items[+inp.dataset.i], ok = it.a.split("|").some(a => norm(a) === norm(inp.value)); inp.disabled = true; inp.classList.add(ok ? "ok" : "no");
          if (ok) sc++; else wrong.push({ lesson: it.lesson });
          inp.closest("li").querySelector(".fb").innerHTML = fbLine(ok, it.a.split("|")[0], it.why); });
        return { score: sc * sec.marks / sec.items.length, wrong };
      } };
    };
    // tf: Doğru (D) / Yanlış (Y)
    W.tf = (sec) => {
      const el = h(`<ol class="titems">${sec.items.map((it, i) => `<li><div class="row" style="justify-content:space-between"><span class="qsent">${tk(it.s)} ${playBtn(it.s)}</span><span class="row"><button class="tile" data-i="${i}" data-j="0">D · doğru</button><button class="tile" data-i="${i}" data-j="1">Y · yanlış</button></span></div><div class="fb"></div></li>`).join("")}</ol>`);
      const P = pickTiles(sec, el);
      return { el, check() {
        P.lock(); let sc = 0; const wrong = [];
        sec.items.forEach((it, i) => { const a = it.ok ? 0 : 1, ok = P.pick[i] === a; if (ok) sc++; else wrong.push({ lesson: it.lesson });
          markTiles(el, i, a, P.pick[i]); el.querySelectorAll("li > .fb")[i].innerHTML = `${ok ? "✓" : "✗"} <b>${it.ok ? "Doğru" : "Yanlış"}</b> <span class="muted">${tz(esc(it.why || ""))}</span>`; });
        return { score: sc * sec.marks / sec.items.length, wrong };
      } };
    };
    // choose: a situation + options
    W.choose = (sec) => {
      const el = h(`<ol class="titems">${sec.items.map((it, i) => `<li><div class="row" style="justify-content:space-between"><span class="qsent"><b>${esc(it.s)}</b>${it.en ? ` <span class="muted">(${esc(it.en)})</span>` : ""}</span><span class="row">${it.o.map((o, j) => `<button class="tile" data-i="${i}" data-j="${j}">${"abc"[j]}) ${esc(o)}</button>`).join("")}</span></div><div class="fb"></div></li>`).join("")}</ol>`);
      const P = pickTiles(sec, el, (i, j) => speak(sec.items[i].o[j]));
      return { el, check() {
        P.lock(); let sc = 0; const wrong = [];
        sec.items.forEach((it, i) => { const ok = P.pick[i] === it.a; if (ok) sc++; else wrong.push({ lesson: it.lesson });
          markTiles(el, i, it.a, P.pick[i]); el.querySelectorAll("li > .fb")[i].innerHTML = fbLine(ok, it.o[it.a], it.why); });
        return { score: sc * sec.marks / sec.items.length, wrong };
      } };
    };
    const SECNAME = { match: "Match the sentences", dialogue: "Choose the right line", type: "Write the answers", tf: "True or false", choose: "What do we say?" };

    const views = {};
    views.book = (m) => {
      const start = Date.now(), results = {};
      const max = T.sections.reduce((a, s) => a + s.marks, 0);
      m.appendChild(h(`<div><h2>${tk(T.titleTr)}</h2><p class="lead">${tz(esc(T.intro))} The test is out of <b>${max} marks</b> (one mark per item).</p></div>`));
      const widgets = [];
      T.sections.forEach((sec, n) => {
        const w = W[sec.type](sec); widgets.push([sec, w]);
        const card = h(`<div class="card tsec" style="margin-bottom:14px"><div class="row" style="justify-content:space-between;align-items:flex-start"><div style="flex:1"><div style="font-size:18px;font-weight:600">${n + 1}. ${tk(sec.instr)}</div><div class="muted" style="font-size:14px">${tz(esc(sec.instrEn))}</div></div><div class="markbox"><span class="got">—</span><span class="of">${sec.marks}</span></div></div><div class="tbody"></div><div class="row" style="justify-content:space-between;margin-top:10px"><span class="secfb muted"></span><button class="btn small chk">Check this section</button></div></div>`);
        $(".tbody", card).appendChild(w.el);
        const doCheck = () => { if (results[sec.id]) return results[sec.id]; const r = w.check(); results[sec.id] = r;
          $(".got", card).textContent = fmt(r.score); card.classList.add(r.score === sec.marks ? "full" : "part"); $(".chk", card).disabled = true;
          if (sec.explain) $(".secfb", card).innerHTML = "💡 " + tz(esc(sec.explain)); return r; };
        $(".chk", card).onclick = doCheck; w.doCheck = doCheck;
        m.appendChild(card);
      });
      const fin = h(`<div class="card" style="text-align:center"><button class="btn primary" id="finish">Finish &amp; save my score</button><div id="summary"></div></div>`);
      m.appendChild(fin);
      $("#finish", fin).onclick = () => {
        const rs = widgets.map(([sec, w]) => [sec, w.doCheck()]);
        const total = rs.reduce((a, [, r]) => a + r.score, 0), wrong = rs.flatMap(([, r]) => r.wrong);
        const pct = Math.round(100 * total / max);
        saveAttempt({ mode: "book", score: total, max, pct, secs: Math.round((Date.now() - start) / 1000), weak: wrong.map(w => w.lesson) });
        $("#finish", fin).remove();
        $("#summary", fin).innerHTML = `<div class="score">${fmt(total)} / ${max}</div><p>${pct >= 90 ? "Harika! 🌟 You're ready for the next unit." : pct >= 70 ? "Aferin 👍 Revise the lessons below, then retake the test." : "Revise the words and practise a bit more before moving on 💪"}</p>
          <table class="g" style="max-width:420px;margin:0 auto 12px">${rs.map(([sec, r], i) => `<tr><td>${i + 1}. ${SECNAME[sec.type] || sec.type}</td><td style="text-align:right"><b>${fmt(r.score)}</b> / ${sec.marks}</td></tr>`).join("")}</table>
          <div style="text-align:left">${weakReport(wrong)}</div><button class="btn" id="retake">↻ Retake the book test</button> <a class="btn" href="#mastery" style="text-decoration:none">🎯 Try the mastery test</a>`;
        $("#retake", fin).onclick = () => route();
      };
      if (T.selfCheck) m.appendChild(h(`<div class="card" style="margin-top:14px"><b>Öz değerlendirme · Self-assessment</b><p class="muted" style="font-size:14px">Can you do these in Turkish? Rate yourself from 1 (I can't) to 5 (very well).</p><ol>${T.selfCheck.map(s => `<li>${tk(s[0])} <span class="muted">— ${esc(s[1])}</span></li>`).join("")}</ol></div>`));
    };
    views.mastery = (m) => {
      m.appendChild(h(`<div><h2>🎯 Mastery test</h2><p class="lead">A fresh mix of about 30 questions every time, drawn from <b>all ${L.lessons.length} lessons</b> this test covers: vocabulary both ways, listening, grammar, sentence building and dialogues. Your mistakes also go into each word's spaced-review deck.</p>
        <div class="card"><b>Covers:</b><ul>${L.lessons.map(l => `<li>${lessonLink(l.id, "overview")}</li>`).join("")}</ul><button class="btn primary" id="go">Start a new mastery test</button></div></div>`));
      $("#go", m).onclick = () => {
        m.innerHTML = ""; const start = Date.now();
        const all = L.dialogues.flatMap(d => d.lines.map(l => ({ l, src: d.src }))).filter(x => x.l[1].length > 8);
        const lines = shuffle(all).slice(0, 4).map(({ l, src }) => {
          const others = shuffle([...new Set(all.map(x => x.l[2]).filter(t => t !== l[2]))]).slice(0, 3);
          const o = shuffle([l[2], ...others]); return { type: "listen", say: l[1], options: o, answer: o.indexOf(l[2]), src, area: "dialogues" };
        });
        const prac = shuffle(L.practice).slice(0, 12).map(x => Object.assign({ area: "practice" }, x));
        const items = shuffle([...vocabMCQ(7, "tr2en"), ...vocabMCQ(4, "en2tr"), ...vocabMCQ(4, "listen"), ...lines, ...prac]);
        runQuiz(m, items, T.id + "-mastery", (pct, wrongItems, sc, n) => {
          saveAttempt({ mode: "mastery", score: sc, max: n, pct, secs: Math.round((Date.now() - start) / 1000), weak: wrongItems.map(w => w.src) });
          m.appendChild(h(`<div class="card" style="margin-top:14px">${weakReport(wrongItems.map(w => ({ lesson: w.src, area: w.area })))}<button class="btn primary" id="again">New mastery test</button></div>`));
          $("#again", m).onclick = () => route();
        });
      };
    };
    views.results = (m) => {
      const at = TS.attempts.slice().reverse();
      const best = mode => { const xs = TS.attempts.filter(a => a.mode === mode); return xs.length ? Math.max(...xs.map(a => a.pct)) + "%" : "—"; };
      m.appendChild(h(`<div><h2>📈 Results</h2><p class="lead">Your attempts are saved in this browser. Aim for 90%+ on both tests before moving on.</p>
        <div class="grid" style="margin-bottom:16px"><div class="card"><div class="muted">Best book test</div><div class="score" style="font-size:36px;text-align:left">${best("book")}</div></div>
        <div class="card"><div class="muted">Best mastery test</div><div class="score" style="font-size:36px;text-align:left">${best("mastery")}</div></div>
        <div class="card"><div class="muted">Attempts</div><div class="score" style="font-size:36px;text-align:left">${TS.attempts.length}</div></div></div>
        ${at.length ? `<div class="card" style="overflow-x:auto"><table class="g"><tr><th>Date</th><th>Test</th><th>Score</th><th></th><th>Time</th></tr>${at.map(a => `<tr><td>${new Date(a.date).toLocaleString()}</td><td>${a.mode === "book" ? "📘 Book" : "🎯 Mastery"}</td><td><b>${a.mode === "book" ? fmt(a.score) : a.score} / ${a.max}</b></td><td style="width:35%"><div class="qbar" style="margin:0"><div style="width:${a.pct}%;background:${a.pct >= 90 ? "var(--good)" : a.pct >= 70 ? "var(--accent)" : "var(--bad)"}"></div></div></td><td>${Math.floor(a.secs / 60)}m ${a.secs % 60}s</td></tr>`).join("")}</table></div>
        <div class="card" style="margin-top:14px"><b>From your latest attempt:</b> ${weakReport((at[0].weak || []).map(l => ({ lesson: l })))}</div>` : `<div class="card">No attempts yet. Start with the <a href="#book">📘 Book test</a>.</div>`}</div>`));
    };
    function route() {
      const id = (location.hash || "#book").slice(1), v = views[id] ? id : "book";
      document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("active", a.dataset.tab === v));
      if (synth) synth.cancel();
      const m = $("#main"); m.innerHTML = ""; m.appendChild(voiceBanner()); pickVoice(); views[v](m); window.scrollTo(0, 0);
    }
    route(); window.addEventListener("hashchange", route);
  }

  // exposed for the build-time self-test (node) — harmless in the browser
  window.TR_HARMONY = { SUFFIX, lastV, two, four };
  if (T) initTest();
  else { renderShell(); updateProgress(); route(); window.addEventListener("hashchange", route); }
})();
