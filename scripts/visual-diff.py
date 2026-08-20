#!/usr/bin/env python3.11
"""
Pixel-diff a rendered section against its Figma reference.

Height parity is not fidelity: a section can measure the right height while its
contents overflow. This compares actual pixels and reports where they differ, so
"exact" has to be earned rather than asserted.

usage: visual-diff.py <built.png> <figma.png> [out-diff.png]
"""
import sys
from PIL import Image
import numpy as np


def load_pair(a_path: str, b_path: str):
    a = Image.open(a_path).convert('RGB')
    b = Image.open(b_path).convert('RGB')
    if a.size != b.size:
        # Compare at the reference's size so coordinates map to the design.
        a = a.resize(b.size, Image.LANCZOS)
    return np.asarray(a, dtype=np.int16), np.asarray(b, dtype=np.int16)


def main() -> int:
    built, figma = sys.argv[1], sys.argv[2]
    out = sys.argv[3] if len(sys.argv) > 3 else None

    a, b = load_pair(built, figma)
    delta = np.abs(a - b).max(axis=2)

    # 12/255 tolerates antialiasing and font-rasteriser differences without
    # hiding a real layout shift.
    bad = delta > 12
    total = bad.size
    n_bad = int(bad.sum())
    pct = 100.0 * n_bad / total

    print(f'size           : {b.shape[1]}x{b.shape[0]}')
    print(f'differing px   : {n_bad:,} / {total:,}  ({pct:.2f}%)')
    print(f'max channel Δ  : {int(delta.max())}')

    if n_bad:
        rows = np.where(bad.any(axis=1))[0]
        cols = np.where(bad.any(axis=0))[0]
        print(f'bbox of diff   : x {cols.min()}..{cols.max()}  y {rows.min()}..{rows.max()}')

        # Which horizontal bands are worst -- points at the offending element.
        band = 40
        scores = []
        for y in range(0, bad.shape[0], band):
            c = int(bad[y:y + band].sum())
            if c:
                scores.append((c, y))
        scores.sort(reverse=True)
        print('worst bands    :')
        for c, y in scores[:6]:
            print(f'   y {y:>5}..{y + band:<5} {c:>8,} px')

    if out:
        vis = np.asarray(Image.open(figma).convert('RGB')).copy()
        vis[bad] = [255, 0, 255]
        Image.fromarray(vis).save(out)
        print(f'diff overlay   : {out}')

    return 0 if pct < 1.0 else 1


if __name__ == '__main__':
    raise SystemExit(main())
