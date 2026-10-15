#!/bin/sh
cd "$(dirname "$0")" || exit 1
if curl --silent --max-time 2 http://localhost:8765/playlist.js | head -c 200 | grep -q 'export const tandas'; then
  open http://localhost:8765
  exit 0
fi
open http://localhost:8765
python3 -m http.server 8765 --bind 127.0.0.1
