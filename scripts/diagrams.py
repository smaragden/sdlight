#!/usr/bin/env python3
"""Generate the README diagrams as SVG, one light and one dark variant each.

Run from the repo root:

    python3 scripts/diagrams.py

Writes docs/img/<name>-light.svg and docs/img/<name>-dark.svg. The layout
is hand-placed and sized to stay legible on a phone screen. Stdlib only.
"""

from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent.parent / "docs" / "img"

SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

THEMES = {
    "light": {
        "bg": "#ffffff", "border": "#d0d7de", "band": "#f6f8fa",
        "text": "#1f2328", "muted": "#59636e", "arrow": "#8c959f",
        "spark": ("#fff8e1", "#d4a72c", "#6b4f00"),
        "skill": ("#eef2ff", "#6366f1", "#312e81"),
        "gate": ("#fff1f0", "#d1242f", "#82071e"),
        "human": ("#ffffff", "#8c959f", "#1f2328"),
        "agent": ("#ffffff", "#6366f1", "#312e81"),
        "keep": ("#dafbe1", "#1a7f37", "#0f5323"),
        "gone": ("#fff1f0", "#d1242f", "#82071e"),
    },
    "dark": {
        "bg": "#0d1117", "border": "#30363d", "band": "#161b22",
        "text": "#e6edf3", "muted": "#9198a1", "arrow": "#6e7681",
        "spark": ("#2e2410", "#d29922", "#f2cc60"),
        "skill": ("#1e1f3b", "#818cf8", "#c7d2fe"),
        "gate": ("#3a1519", "#f85149", "#ffa198"),
        "human": ("#0d1117", "#6e7681", "#e6edf3"),
        "agent": ("#0d1117", "#818cf8", "#c7d2fe"),
        "keep": ("#12261e", "#3fb950", "#7ee2a8"),
        "gone": ("#3a1519", "#f85149", "#ffa198"),
    },
}


class Svg:
    def __init__(self, width, height, theme, title):
        self.t = THEMES[theme]
        self.w, self.h = width, height
        self.parts = [
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" '
            f'height="{height}" viewBox="0 0 {width} {height}" '
            f'role="img" aria-label="{escape(title)}">',
            f"<title>{escape(title)}</title>",
            "<defs>"
            f'<marker id="head" viewBox="0 0 10 10" refX="9" refY="5" '
            f'markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            f'<path d="M0,0 L10,5 L0,10 z" fill="{self.t["arrow"]}"/></marker>'
            "</defs>",
            f'<rect x="0.5" y="0.5" width="{width - 1}" height="{height - 1}" '
            f'rx="12" fill="{self.t["bg"]}" stroke="{self.t["border"]}"/>',
        ]

    def add(self, s):
        self.parts.append(s)

    def text(self, x, y, s, size, fill, family=SANS, weight=400,
             anchor="middle", extra=""):
        self.add(
            f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" '
            f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" '
            f'{extra}>{escape(s)}</text>'
        )

    def band(self, x, y, w, h, label):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" '
                 f'fill="{self.t["band"]}"/>')
        self.text(x + 14, y + 20, label.upper(), 11, self.t["muted"],
                  weight=600, anchor="start", extra='letter-spacing="0.08em"')

    def node(self, x, y, w, h, kind, title, sub=None, mono=False,
             shape="box", dashed=False, strike=False):
        fill, stroke, ink = self.t[kind]
        dash = ' stroke-dasharray="5 4"' if dashed else ""
        if shape == "hex":
            c = 14
            pts = (f"{x + c},{y} {x + w - c},{y} {x + w},{y + h / 2} "
                   f"{x + w - c},{y + h} {x + c},{y + h} {x},{y + h / 2}")
            self.add(f'<polygon points="{pts}" fill="{fill}" stroke="{stroke}" '
                     f'stroke-width="1.5"{dash}/>')
        else:
            rx = h / 2 if shape == "pill" else 8
            self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
                     f'fill="{fill}" stroke="{stroke}" stroke-width="1.5"{dash}/>')
        cx = x + w / 2
        ty = y + h / 2 + (-3 if sub else 5.5)
        self.text(cx, ty, title, 15.5, ink, MONO if mono else SANS, 600)
        if strike:
            half = len(title) * 4.8
            self.add(f'<line x1="{cx - half}" y1="{ty - 5}" x2="{cx + half}" '
                     f'y2="{ty - 5}" stroke="{ink}" stroke-width="1.5"/>')
        if sub:
            self.text(cx, y + h / 2 + 15, sub, 12.5, ink,
                      extra='fill-opacity="0.8"')

    def arrow(self, points, label=None, label_at=None, anchor="start",
              rotate=False):
        d = "M" + " L".join(f"{px},{py}" for px, py in points)
        self.add(f'<path d="{d}" fill="none" stroke="{self.t["arrow"]}" '
                 f'stroke-width="1.5" marker-end="url(#head)"/>')
        if label:
            lx, ly = label_at
            extra = f'transform="rotate(-90 {lx} {ly})"' if rotate else ""
            self.text(lx, ly, label, 12, self.t["muted"], anchor=anchor,
                      extra=extra)

    def legend(self, y, items):
        x = 24
        for kind, label, shape in items:
            fill, stroke, _ = self.t[kind]
            if shape == "hex":
                pts = f"{x + 4},{y} {x + 14},{y} {x + 18},{y + 7} {x + 14},{y + 14} {x + 4},{y + 14} {x},{y + 7}"
                self.add(f'<polygon points="{pts}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>')
            else:
                dash = ' stroke-dasharray="3 2"' if shape == "dashed" else ""
                self.add(f'<rect x="{x}" y="{y}" width="18" height="14" rx="3" '
                         f'fill="{fill}" stroke="{stroke}" stroke-width="1.5"{dash}/>')
            self.text(x + 26, y + 11.5, label, 12.5, self.t["muted"], anchor="start")
            x += 26 + len(label) * 7.2 + 22

    def save(self, path):
        self.add("</svg>")
        path.write_text("\n".join(self.parts) + "\n")


def pipeline(theme):
    W, NW, NH, GAP = 460, 280, 52, 30
    NX = 58
    pitch = NH + GAP

    # (kind, title, sub, mono, shape)
    you = [
        ("spark", "An idea", "half a sentence is enough", False, "pill"),
        ("skill", "seed-capture", "saves it as a seed", True, "box"),
        ("skill", "sdlc-brainstorm", "explores routes, writes a spec", True, "box"),
        ("human", "You read the spec", "then ask for a plan", False, "box"),
    ]
    agent = [
        ("skill", "sdlc-plan", "writes a step-by-step plan", True, "box"),
        ("gate", "plan review", "plan vs spec", False, "hex"),
        ("agent", "Agent builds a step", "one commit per step", False, "dashed"),
        ("gate", "step review", "diff vs that step", False, "hex"),
        ("gate", "final review", "code vs spec", False, "hex"),
        ("skill", "sdlc-promote", "writes the feature doc", True, "box"),
    ]
    end = ("spark", "Feature doc", "seed and spec are deleted", False, "pill")

    band_pad_top, band_pad_bottom, band_gap = 36, 18, 22
    y = 18
    you_band = (y, band_pad_top + len(you) * pitch - GAP + band_pad_bottom)
    y += you_band[1] + band_gap
    agent_band = (y, band_pad_top + len(agent) * pitch - GAP + band_pad_bottom)
    y += agent_band[1] + band_gap
    end_y = y
    legend_y = end_y + NH + 28
    H = legend_y + 34

    s = Svg(W, H, theme, "The sdlight pipeline, from idea to feature doc")
    s.band(16, you_band[0], W - 32, you_band[1], "You decide")
    s.band(16, agent_band[0], W - 32, agent_band[1], "Automatic, gated")

    tops = []
    for band, nodes in ((you_band, you), (agent_band, agent)):
        ny = band[0] + band_pad_top
        for kind, title, sub, mono, shape in nodes:
            dashed = shape == "dashed"
            s.node(NX, ny, NW, NH, kind, title, sub, mono,
                   "box" if dashed else shape, dashed=dashed)
            tops.append(ny)
            ny += pitch
    kind, title, sub, mono, shape = end
    s.node(NX, end_y, NW, NH, kind, title, sub, mono, shape)
    tops.append(end_y)

    cx = NX + NW / 2
    for i in range(len(tops) - 1):
        a, b = tops[i] + NH, tops[i + 1]
        if i == 7:  # step review to final review
            s.arrow([(cx, a), (cx, b - 2)], "all steps pass",
                    (cx - 10, (a + b) / 2 + 4), anchor="end")
        else:
            s.arrow([(cx, a), (cx, b - 2)])

    build_mid = tops[6] + NH / 2
    step_mid = tops[7] + NH / 2
    lx = NX + NW + 34
    s.arrow([(NX + NW, step_mid), (lx, step_mid), (lx, build_mid),
             (NX + NW + 3, build_mid)], "next step",
            (lx + 16, (build_mid + step_mid) / 2), anchor="middle", rotate=True)

    s.legend(legend_y, [("skill", "skill", "box"),
                        ("gate", "review gate", "hex"),
                        ("agent", "agent", "dashed"),
                        ("human", "you", "box")])
    return s


def lifecycle(theme):
    W, CW, NH, GAP = 460, 170, 48, 12
    left_x, right_x = 20, W - 20 - CW
    top = 60

    before = [
        ("gone", "seed", "deleted", True),
        ("gone", "spec", "deleted", True),
        ("keep", "plan", None, False),
        ("keep", "code", None, False),
    ]
    after = [
        ("keep", "plan", "how it was built", False),
        ("keep", "code", None, False),
        ("keep", "feature doc", "what it is now", False),
    ]
    col_h = len(before) * (NH + GAP) - GAP
    H = top + col_h + 24

    s = Svg(W, H, theme, "What sdlc-promote keeps and deletes")
    s.text(left_x + CW / 2, 38, "While you build", 13, s.t["muted"], weight=600)
    s.text(right_x + CW / 2, 38, "Once it ships", 13, s.t["muted"], weight=600)

    y = top
    for kind, title, sub, strike in before:
        s.node(left_x, y, CW, NH, kind, title, sub, dashed=strike, strike=strike)
        y += NH + GAP
    y = top + (col_h - (len(after) * (NH + GAP) - GAP)) / 2
    for kind, title, sub, strike in after:
        s.node(right_x, y, CW, NH, kind, title, sub)
        y += NH + GAP

    mid = top + col_h / 2
    s.arrow([(left_x + CW + 12, mid), (right_x - 12, mid)])
    s.text(W / 2, mid - 10, "promote", 12.5, s.t["muted"], MONO)
    return s


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, build in (("pipeline", pipeline), ("lifecycle", lifecycle)):
        for theme in THEMES:
            build(theme).save(OUT / f"{name}-{theme}.svg")
            print(f"wrote docs/img/{name}-{theme}.svg")


if __name__ == "__main__":
    main()
