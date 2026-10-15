# TangoDJ

A browser player for orchestra-specific DJ study sessions. Choose **Aníbal Troilo** or **Francisco Canaro** and listen to complete recordings grouped into tandas, with familiar-song highlights playing for 20 seconds between groups.

- Troilo: 42 supplied recordings, 11 tandas, and 10 cortinas.
- Canaro: 52 selected recordings, 15 study groups, and 14 cortinas.
- YouTube playlists contain the complete recordings, in the same order, without cortinas. Each session links to its saved playlist.
- Cortinas fade over their final two seconds. Their start positions can be adjusted and previewed; changes are stored locally in the browser.

## Run locally

```sh
npm run dev
```

Open <http://localhost:8765>. On macOS, `Start.command` also starts the server and opens the site. Keep the server terminal open while listening.

```sh
npm test
npm run build
```

The build produces the static site in `dist/`. There are no application dependencies or account credentials in the site.

## Deploy with Vercel

Import this repository into Vercel, or connect the existing Vercel project to its GitHub repository. `vercel.json` sets the build command to `npm run build` and the output directory to `dist`. The project root is the repository root; no environment variables are required. Changes pushed to the production branch can deploy automatically through Vercel's GitHub integration.

## Listening

Press **Play session**, choose a recording directly, or preview a cortina. Switching orchestra stops the current session and waits for another Play action. Use the previous and next arrows to navigate. Orchestra selection is reflected in the URL, so it can be bookmarked.

The YouTube IFrame Player API streams original videos and applies segment boundaries. Audio is not downloaded or uploaded. YouTube advertisements, buffering, embedding restrictions, autoplay rules, and background timer limits can affect playback. Keep the device awake and the tab open. This is a listening and practice tool; uninterrupted live-event playback requires a dedicated DJ setup.

## Canaro selection notes

The original assignment provides era, singer, energy, and texture constraints rather than track titles. Selections are editorial drafts, with recording credits and years checked against the referenced upload titles/descriptions. Energy and transfer consistency require a full listening review before dance-floor use. Source upload metadata is evidence, not an independently verified discography.

The Maida rhythmic group uses 1937–1938 recordings; the Maida milonga group uses 1935–1936. Famá's later tango and milonga groups use 1939. Roldán and Eduardo Adrián are separate. Group J uses Famá alone rather than mixing singers. Nelly Omar is not included.

Group H is a two-recording early Famá milonga pair, not a completed three-song tanda. `Milonga sentimental` is excluded because sources credit a Famá / Ángel Ramos duet. A third suitable solo recording is still to be verified. Quinteto Pirincho has its own group; `Orillera` has a dated upload source, while `La trampera` and `El firulete` retain unverified recording dates because album dates are not reliable recording dates. `Pura milonga` is excluded from instrumental milongas because sources classify it as tango.

See [the curated sources](research/canaro-sources.md) for recording references and verification limits.
