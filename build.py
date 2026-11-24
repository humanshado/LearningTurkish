#!/usr/bin/env python3
"""Build the course: one self-contained HTML page per lesson and test, plus a course home page.

    python3 build.py              -> docs/  (GitHub Pages site: docs/index.html + docs/u1-01.html ...)
    python3 build.py --standalone -> dist/ (pages with no link back to the course home)

Each lesson lives in src/lessons/<id>.js and calls LESSONS.push({...}).
Each unit test lives in src/tests/<id>.js and sets window.TEST = {...}.
"""
import json, sys, html, pathlib, subprocess

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
standalone = "--standalone" in sys.argv
OUT = ROOT / ("dist" if standalone else "docs")
OUT.mkdir(exist_ok=True)

css = (SRC / "style.css").read_text(encoding="utf-8")
engine = (SRC / "engine.js").read_text(encoding="utf-8")
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600&display=swap" rel="stylesheet">'
PLAYLIST = "https://www.youtube.com/playlist?list=PLrwS96DaM7OEcN2imsuUzuf2Wlhd6Jsz-"

UNITS = {1: ("MERHABA", "Hello", "pp. 7–20"), 2: ("NEREDE?", "Where?", "pp. 21–36"), 3: ("NE YAPIYORSUN?", "What are you doing?", "pp. 37–50"),
         4: ("BENİM DÜNYAM", "My world", "pp. 51–66"), 5: ("ZAMAN ZAMAN", "Time to time", "pp. 67–80"), 6: ("ÇEVREMİZ VE BİZ", "Our surroundings and us", "pp. 81–93")}


def page(title, body):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>{FONTS}<style>{css}</style></head>
<body>{body}</body></html>
"""


def node_json(js):
    return json.loads(subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout)


def lesson_meta(path):
    js = f"global.window=global;global.LESSONS=[];{path.read_text(encoding='utf-8')};const l=LESSONS[0];console.log(JSON.stringify({{id:l.id,unit:l.unit,num:l.num,title:l.title,titleTr:l.titleTr,covers:l.covers,video:l.video,notes:!!l.notes}}))"
    return node_json(js)


def test_meta(path):
    js = f"global.window={{}};{path.read_text(encoding='utf-8')};const t=window.TEST;console.log(JSON.stringify({{id:t.id,unit:t.unit,after:t.after,title:t.title,titleTr:t.titleTr,pages:t.pages,covers:t.covers}}))"
    return node_json(js)


home = "" if standalone else 'window.COURSE_HOME="index.html";'
lessons, lesson_files = [], {f.stem: f for f in (SRC / "lessons").glob("*.js")}
for f in sorted(lesson_files.values()):
    m = lesson_meta(f); lessons.append(m)
    scripts = f"<script>window.LESSONS=[];{home}</script><script>{f.read_text(encoding='utf-8')}</script><script>{engine}</script>"
    (OUT / f"{m['id']}.html").write_text(page(f"{m['title']} · Turkish A1", scripts), encoding="utf-8")
    print("built", OUT / f"{m['id']}.html")

tests = []
for f in sorted((SRC / "tests").glob("*.js")) if (SRC / "tests").exists() else []:
    t = test_meta(f); tests.append(t)
    covered = "".join(f"<script>{lesson_files[c].read_text(encoding='utf-8')}</script>" for c in t["covers"])
    scripts = f"<script>window.LESSONS=[];{home}</script>{covered}<script>{f.read_text(encoding='utf-8')}</script><script>{engine}</script>"
    (OUT / f"{t['id']}.html").write_text(page(f"{t['title']} · Turkish A1", scripts), encoding="utf-8")
    print("built", OUT / f"{t['id']}.html")

if not standalone:
    parts = []
    for u, (tr, en, pages) in UNITS.items():
        ls = sorted([l for l in lessons if l["unit"] == u], key=lambda l: l["num"])

        def lcard(l):
            vid = '<span class="tag">🎬 video notes</span>' if l["notes"] else ""
            return (f'<a class="card lesson-link" href="{l["id"]}.html" style="margin-bottom:10px" data-id="{l["id"]}">'
                    f'<span class="n">{u}.{l["num"]}</span><span style="flex:1"><b>{html.escape(l["title"])}</b><br>'
                    f'<span class="tk">{html.escape(l["titleTr"])}</span><br><span class="muted" style="font-size:13px">{html.escape(l.get("covers", ""))}</span> {vid}</span>'
                    f'<span class="prog muted"></span></a>')

        def tcard(t):
            return (f'<a class="card lesson-link test-link" href="{t["id"]}.html" style="margin-bottom:10px;border-color:var(--accent);background:var(--accent-soft)" data-test="{t["id"]}">'
                    f'<span class="n">📝</span><span style="flex:1"><b>{html.escape(t["title"])}</b><br>'
                    f'<span class="tk">{html.escape(t["titleTr"])}</span><br><span class="muted" style="font-size:13px">{html.escape(t["pages"])} · book test + mastery test</span></span>'
                    f'<span class="prog muted"></span></a>')
        ut = [t for t in tests if t["unit"] == u]
        items = "".join(lcard(l) + "".join(tcard(t) for t in ut if t["after"] == l["num"]) for l in ls) or '<div class="card soon">Coming soon</div>'
        parts.append(f'<section class="book"><h2>Ünite {u} · {tr} <span class="muted" style="font-size:16px;font-weight:400">· {en} · book {pages}</span></h2>{items}</section>')
    body = f"""<main style="max-width:820px">
<div class="card hero" style="margin-top:10px"><div><div class="tk big" style="font-size:34px;color:var(--accent-2)">İstanbul · Yabancılar İçin Türkçe</div>
<h2>Turkish A1: interactive course</h2>
<p class="lead">Interactive lessons for the <i>İstanbul Yabancılar İçin Türkçe A1</i> coursebook (Arabic edition), following the <a href="{PLAYLIST}" target="_blank" rel="noopener">video series</a>. Each lesson has dialogues with audio, vocabulary flashcards, vowel-harmony builders, pronunciation drills, listening and dictation games, quizzes, speaking role-plays and the teacher's notes in English.</p></div></div>
{''.join(parts)}</main>
<script>
try{{const S=JSON.parse(localStorage.getItem("turkish-course-v1")||"{{}}");
document.querySelectorAll("[data-id]").forEach(a=>{{const l=(S.lessons||{{}})[a.dataset.id];if(!l)return;const n=Object.keys(l.done||{{}}).length;
a.querySelector(".prog").textContent=(n>=9?"✓ ":"")+n+"/9"+(l.best&&l.best.practice!=null?" · quiz "+l.best.practice+"%":"");}});
document.querySelectorAll("[data-test]").forEach(a=>{{const t=(S.tests||{{}})[a.dataset.test];if(!t||!t.attempts.length)return;const b=m=>{{const x=t.attempts.filter(y=>y.mode===m);return x.length?Math.max(...x.map(y=>y.pct))+"%":"—"}};
a.querySelector(".prog").textContent="book "+b("book")+" · mastery "+b("mastery");}});}}catch(e){{}}
</script>"""
    (OUT / "index.html").write_text(page("İstanbul Turkish A1 · Interactive course", body), encoding="utf-8")
    print("built", OUT / "index.html")
