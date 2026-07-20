---
title: "The best tool your design office isn't using was built for programmers"
date: 2026-07-20
description: "Engineering design offices manage revisions by hand. Software teams solved the same problem in the 1990s with git. Part 1 of Steal from software: the case for version control."
series: "Steal from software"
series_url: /series/steal-from-software/
part: 1
linkedin_url: https://www.linkedin.com/pulse/best-tool-your-design-office-isnt-using-built-marko-visser-dok8f/
cover: /assets/covers/steal-from-software-01.png
cover_alt: "A filename: Cable_Schedule_RevC_FINAL_marko_version_final_v2_USE_THIS_ONE.xlsx"
---

You've seen this file. You've probably made one:

`Cable_Schedule_RevC_FINAL_marko_version_final_v2_USE_THIS_ONE.xlsx`

Mine has my own name in it, which at least tells you who to blame.

Behind that filename sits a set of questions every design office answers badly. Which revision was actually issued for construction? What changed between Rev B and Rev C? Why was it changed, and by whom? If the client asks in eight months why that feeder was upsized, can you answer without an archaeology project?

We manage this with drawing registers, transmittal logs and folder discipline. All hand-maintained. All dependent on the most tired person in the office updating a spreadsheet correctly at 17:40 on issue day.

And that's just the official system. Underneath it, every engineer runs a private one. One copies old files into a Superseded folder. Another swears by Archive, which sits next to Archive_old from the last cleanup. Some append the date. Some don't. One appends it in American format, so the sorting is wrong anyway. Then SharePoint search flattens all of it: you search for the cable schedule, open the top result, and spend an hour working in a file that was superseded in March. Nothing warns you. The file opens fine.

It doesn't have to work this way. The proof comes from an old habit of good industries: stealing.

Surgeons stole the checklist from aviation. Pilots had been running pre-flight checks for decades before anyone thought to try it in an operating theatre, and when they did, complication rates dropped hard enough that the WHO turned it into a global standard. Hospitals took lean production from Toyota. Formula 1 pit crews ended up teaching a children's hospital how to do patient handovers.

The pattern is always the same. One industry hits a coordination problem and grinds out a solution over years. The solution then just sits there, free for the taking, until someone from another industry walks past and recognises their own problem in it.

Engineering design is standing in front of one of those solutions right now. Software teams had exactly our filename problem in the 1990s, at far worse scale: hundreds of people editing thousands of files, daily. Their answer is a tool called git. It runs most of the world's software today, it's free, and almost nobody outside software knows what it actually does.

## What git actually is

Forget the terminal screenshots. The concept is simple.

Git is a design register that maintains itself. Every time you record your work (git calls this a commit), it stores three things: exactly what changed, line by line; who changed it; and a short note saying why. That's it. That's the core.

But those records add up to something bigger. Because git stores the full history of changes, it can reconstruct the entire project exactly as it stood on any date. Not "the folder we think was current in March". The precise state of every file, guaranteed, on demand.

A useful way to think about it: your current system stores files, and the history is an afterthought you maintain by hand. Git stores the history, and any file version is just a point along it. Rev A to Rev C isn't three files in three folders. It's one file with a memory.

One misconception to kill early: git is not a backup tool. Backup preserves files. Git preserves decisions. When someone asks "why is this breaker 250A?", backup gives you nothing. Git gives you the change, the date, the author and the stated reason, in about two seconds.

And when a milestone matters, you tag it. "Issued for Tender" and "Issued for Construction" become permanent, named markers on the history itself. Retrievable forever, byte for byte.

## "But SharePoint already does this"

This is the objection I hear first, so let's take it seriously. SharePoint gives you version history, you can restore an old version, and co-authoring lets two people work in the same file. Isn't that the same thing?

It isn't, and the gap matters. SharePoint has *versioning*. Git has *version control*. They sound identical. They aren't.

SharePoint creates versions on a save timer. Version 47 might be half a change, or three unrelated changes, or someone fixing a typo. No version means anything in particular, and none of them carries a reason. A git commit is a deliberate unit of work with the why attached.

Try this test on your own project: which SharePoint version number was Issued for Tender? Nobody knows. That's why you keep a transmittal register on the side, by hand. The tool remembers file states; it doesn't remember milestones, and it doesn't remember intent.

Restore has the same weakness. Yes, you can roll back to version 46. But can you see what actually differs between v46 and v47 in a 900-row cable schedule? You get two whole files and your eyeballs. Git shows you the exact lines: this cable was upsized, this breaker changed, nothing else touched. And git can reverse one specific change from three weeks ago while keeping everything after it. SharePoint restore is all-or-nothing: the bad change goes, and so does every good one made since.

There's a deeper limitation too. A real design change rarely lives in one file. It touches the schedule, the calc sheet and the drawing together. SharePoint versions each file separately and records no connection between them. A git commit spans the whole project: one decision, one record, every file it touched.

To be fair to SharePoint: for reports, letters and minutes, it's fine. Documents whose value is the prose don't need any of this. The argument here is that design data is not prose. It's structured, interdependent and checkable, and a tool built for documents flattens all three qualities out.

SharePoint remembers what the file looked like. Git remembers what the engineer decided.

## Why bother, though?

Fair question. Adopting anything new costs time, and "better filing" is a weak reason to spend it.

Here's the honest answer: the filing improvement is just the entry fee. Once your design history lives in git, things become possible that have no equivalent in any document-control system. Several engineers working on the same design at once, with the tool catching their clashes before site does. You can explore design options as parallel branches, each one complete and checkable, and compare them side by side. And scripts can re-check the entire design against your firm's rules every time anything changes. A mistake found once can never come back.

That last one alone changes what design review means. But each of these deserves its own article, and this one is long enough.

One concession before I go: yes, CAD files are binary and git can't show line-by-line changes inside them. That constraint turns out to be a signpost rather than a dead end, and it points somewhere interesting. Article four.

Next up: how five engineers work on one design without a master-file queue, and why a merge conflict is a site clash caught early.

---

*Marko Visser is a mechatronic engineer in Windhoek who builds AI tooling for engineering design workflows.*
