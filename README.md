# website for flagaholic

re-written with [astro js](https://astro.build/)

## site
[www.flagaholic.xyz](https://www.flagaholic.xyz)

## features
have overview, members, achievements, writeups and contact section
our teammates can also [import writeups](#importing-writeups) to demonstrate in the website

## importing writeups

**NOTE: This only works for writeup thats already in GitHub. Make a PR and test it if you want**

just run
```sh
npm run import:writeup
```
to import writeups 

it'll ask for the GitHub link, event, category/tags, author, date, optional title override, and whether to dry-run (see where the files are gonna land). If the generated writeup path already exists, it'll asks before overwriting.

Example prompt:

```text
github link for writeup: https://github.com/codestube/CTF-Write-Ups/tree/main/PolyUCTF%202026/Good%20k1k1%20Bad%20k1k1
event: PolyUCTF 2026
category/tags (comma separated, first is primary): AI, prompt-injection, llm
author: youstube_
date (YYYY-MM-DD): 2026-01-01
title override (optional, enter to use README title):
extra tags (comma separated, optional):
dry run only? (y/N): n
```

then it'll put in proper places to display the writeup on the website. remember to use dry-run to preview the target paths without writing files to make sure you dont break everything.



## fun things in future
~~will fix the writeup section to be more interactive / fun to read~~ fixing atm

> created & maintained by youstube, taokyle, xzhiyouu
