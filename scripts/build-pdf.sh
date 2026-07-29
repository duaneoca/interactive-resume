#!/usr/bin/env bash
# Regenerate Duane_Pinkerton.pdf from Duane_Pinkerton.docx.
#
# Uses docx2pdf, which on macOS drives Microsoft Word via JXA and produces
# the identical export you would get from Word's own "Save as PDF".
#
# One-time setup: macOS will prompt for permission to control Microsoft Word
# (System Settings > Privacy & Security > Automation). Quit Word first if the
# document is open, or the export can conflict.
set -euo pipefail

PUBLIC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/frontend/public"
DOCX="$PUBLIC_DIR/Duane_Pinkerton.docx"
PDF="$PUBLIC_DIR/Duane_Pinkerton.pdf"

[ -f "$DOCX" ] || { echo "error: $DOCX not found" >&2; exit 1; }

echo "Converting $(basename "$DOCX") -> $(basename "$PDF")"
docx2pdf "$DOCX" "$PDF"

[ -f "$PDF" ] || { echo "error: conversion produced no PDF" >&2; exit 1; }
[ "$PDF" -nt "$DOCX" ] || echo "warning: PDF is not newer than the docx" >&2
echo "OK: $(du -h "$PDF" | cut -f1) written"
