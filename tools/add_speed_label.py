#!/usr/bin/env python3
"""Burn a speed-multiplier label (e.g. "4X", "10x") onto a video corner.

Font, size, stroke, and margins scale with video height so the label looks
identical across clips of different resolutions. Ratios are calibrated
against the site's existing burnt-in label at 1920x1080
(public/videos/projects/nu-495/real_slam_wide_10x.mp4).

Requires ffmpeg/ffprobe on PATH and Pillow (pip install -r tools/requirements.txt).

Usage:
    python3 tools/add_speed_label.py INPUT.mp4 OUTPUT.mp4 --text 4X
    python3 tools/add_speed_label.py INPUT.webm OUTPUT.webm --text 4X --position br
"""

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FONTSIZE_RATIO = 100 / 1080
STROKE_RATIO = 7 / 1080
MARGIN_RIGHT_RATIO = 30 / 1080
MARGIN_BOTTOM_RATIO = 35 / 1080

DEFAULT_FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

CODEC_BY_EXT = {".mp4": "libx264", ".webm": "libvpx-vp9"}


def find_default_font():
    for path in DEFAULT_FONT_CANDIDATES:
        if Path(path).is_file():
            return path
    raise FileNotFoundError(
        "no default bold font found; pass --font explicitly. checked: "
        + ", ".join(DEFAULT_FONT_CANDIDATES)
    )


def probe_resolution(video_path):
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-select_streams", "v:0",
            "-show_entries", "stream=width,height", "-of", "json", str(video_path),
        ],
        capture_output=True, text=True, check=True,
    )
    stream = json.loads(result.stdout)["streams"][0]
    return stream["width"], stream["height"]


def build_overlay(width, height, text, font_path, position):
    fontsize = round(height * FONTSIZE_RATIO)
    stroke_w = max(1, round(height * STROKE_RATIO))
    margin_r = round(height * MARGIN_RIGHT_RATIO)
    margin_b = round(height * MARGIN_BOTTOM_RATIO)

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, fontsize)
    bbox = draw.textbbox((0, 0), text, font=font, stroke_width=stroke_w)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    if position == "br":
        x, y = width - tw - margin_r - bbox[0], height - th - margin_b - bbox[1]
    elif position == "bl":
        x, y = margin_r - bbox[0], height - th - margin_b - bbox[1]
    elif position == "tr":
        x, y = width - tw - margin_r - bbox[0], margin_b - bbox[1]
    elif position == "tl":
        x, y = margin_r - bbox[0], margin_b - bbox[1]
    else:
        raise ValueError(f"unknown position: {position}")

    draw.text((x, y), text, font=font, fill="white", stroke_width=stroke_w, stroke_fill="black")
    return img


def scale_rate(rate, factor):
    rate = rate.strip()
    if rate.lower().endswith("k"):
        return f"{round(float(rate[:-1]) * factor)}k"
    if rate.lower().endswith("m"):
        return f"{float(rate[:-1]) * factor:.2f}M"
    raise ValueError(f"unrecognized bitrate format: {rate}")


def encode(input_path, overlay_path, output_path, bitrate, crf):
    codec = CODEC_BY_EXT[output_path.suffix.lower()]
    cmd = [
        "ffmpeg", "-y", "-i", str(input_path), "-i", str(overlay_path),
        "-filter_complex", "overlay=0:0", "-c:v", codec, "-pix_fmt", "yuv420p",
    ]

    if crf is not None:
        cmd += ["-crf", str(crf)]
        if codec == "libvpx-vp9":
            cmd += ["-b:v", "0"]
    else:
        cmd += ["-b:v", bitrate, "-maxrate", scale_rate(bitrate, 1.1)]
        if codec == "libx264":
            cmd += ["-bufsize", scale_rate(bitrate, 2.0), "-preset", "medium", "-movflags", "+faststart"]
        else:
            cmd += ["-deadline", "good", "-cpu-used", "2"]

    cmd.append(str(output_path))
    subprocess.run(cmd, check=True)


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("input", type=Path, help="source video, never modified")
    parser.add_argument("output", type=Path, help="output .mp4 or .webm path; must not already exist")
    parser.add_argument("--text", default="4X", help="label text, e.g. 4X, 10x (default: 4X)")
    parser.add_argument("--font", default=None, help="path to a bold .ttf/.ttc font (default: Arial Bold)")
    parser.add_argument(
        "--position", default="br", choices=["br", "bl", "tr", "tl"],
        help="corner placement (default: br)",
    )
    parser.add_argument(
        "--bitrate", default="2000k",
        help="target video bitrate, e.g. 2000k (default: 2000k; ignored if --crf is set)",
    )
    parser.add_argument("--crf", type=int, default=None, help="use CRF-based encoding instead of a target bitrate")
    args = parser.parse_args()

    if not args.input.is_file():
        sys.exit(f"error: input not found: {args.input}")
    if args.output.suffix.lower() not in CODEC_BY_EXT:
        sys.exit(f"error: unsupported output extension: {args.output.suffix} (expected .mp4 or .webm)")
    if args.output.exists():
        sys.exit(f"error: refusing to overwrite existing file: {args.output}")
    if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
        sys.exit("error: ffmpeg/ffprobe not found on PATH")

    font_path = args.font or find_default_font()
    width, height = probe_resolution(args.input)
    overlay = build_overlay(width, height, args.text, font_path, args.position)

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        overlay_path = Path(tmp.name)
    try:
        overlay.save(overlay_path)
        encode(args.input, overlay_path, args.output, args.bitrate, args.crf)
    finally:
        overlay_path.unlink(missing_ok=True)

    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
