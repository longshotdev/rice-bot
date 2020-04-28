- File: IDEA.md
- Project: ricebot
- File Created: Sunday, 26th April 2020 4:15:14 pm
- Author: andyl5463 (andyl5463@gmail.com)
- ***
- Last Modified: Sunday, 26th April 2020 4:15:17 pm
- Modified By: andyl5463 (andyl5463@gmail.com>)
- ***
- Copyright 2020 - 2020 Longshot Development, Longshot Development

# IDEA Music

> Permission Level 4 (T.B.A).

## Rule Set

1. Max 10 in queue for memory reasons. might experiement with higher ups.
2. Queue is in memory
3. Queue will have a store with `<guildID, Metadata>`

## MetaData

```
{
    song: <Song Metadata>,
    requestedBy: <User Snowflake>,
    timeRequested: <Date>
}
```

## Commands

- `play <URL | big string (max 100 chars)>` - Gets Video via `URL` or `Search`.

- `pause` - Pauses playback.

- `resume` - Resumes playback.

- `stop` - Stops Playback.

- `queue` - Displays Queue with Embed.

- `np | nowplaying` - Displays Now Playing in Native Embed (No Pagination)

## Backend

i have no fuckign clue
