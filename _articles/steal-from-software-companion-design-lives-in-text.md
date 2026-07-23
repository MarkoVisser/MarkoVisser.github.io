---
title: "The design lives in text"
date: 2026-07-23
description: "Design offices author engineering content inside its own presentation and pay a formatting tax on every revision. Software teams stopped decades ago: write in plain text, render the document. A Steal from software companion."
series: "Steal from software"
series_url: /series/steal-from-software/
label: Companion
linkedin_url: https://www.linkedin.com/pulse/design-lives-text-marko-visser-b4d5e/
cover: /assets/covers/steal-from-software-companion.png
cover_alt: "A title card: Steal from software · the design lives in text"
---

*Part of [Steal from software](/series/steal-from-software/), a series on practices worth taking from software teams. [Monday's article](/articles/steal-from-software-01-the-case/) made the case for git. This one is about the layer git works best on.*

It's 16:40 on a Friday and an engineer in your office is fixing page numbers.

Not designing anything. Not checking anything. The report grew a section this morning, so the table of contents is wrong, two cross-references point at the wrong figures, and a table that fit on one page yesterday has split itself across a page break. An hour of professional time, spent negotiating with Word.

Call it the formatting tax. Every design office pays it, on every deliverable, at every revision. We budget for design time and checking time. Nobody budgets for the tax, so it comes out of both.

And that's one engineer in one file. Put three engineers in the same report and the tax compounds. Everyone pastes in their own section, and every paste drags its formatting metadata along with it: the spacing shifts, the styles multiply (four subtly different Heading 2s by Wednesday), and somewhere in the merge the section numbering de-links. What looks like an automatic cross-reference is now plain typed text, pointing at a clause that has since moved. The document opens fine. It just lies.

The tax exists for one reason: we author our engineering content inside its own presentation. The calc summary, the design basis, the reasoning behind the bigger transformer, all of it lives in files whose primary job is to look right on A4. Content and formatting are welded together, so every change to one disturbs the other. You can't touch the substance without paying rent to the layout.

Software teams paid this same tax decades ago. Then they stopped. Their fix is sitting there, free, and it's simpler than git: separate the content from the presentation, and only ever author the content.

## Write in text, render the document

The authoring layer software settled on is mostly markdown: plain text with light punctuation. A `#` marks a heading. A dash starts a list item. That's roughly the whole syntax, learnable in ten minutes. The file opens in anything, from Notepad to a phone.

The trick is what happens next. You don't format a markdown file. You *render* it. A tool takes the text plus a template and produces the official document: PDF, web page, or a .docx if the client insists. The workhorse is usually Pandoc, free and twenty years old; the template is a one-time job where your document standard (cover page, fonts, numbering, headers, letterhead) gets defined once and then applied at render time. Identically. Every time.

The report stops being the thing you write. It becomes the thing that gets built from what you write, the way a drawing gets plotted from a model. Your report is a rendering.

The tax doesn't drop to zero, and I'd distrust anyone who claims it does. Nobody maintains a perfect template per document type; one generic template carries most deliverables, and you still page through the render before issue. But the work changes kind. Add a section and re-render: the contents page rebuilds itself, the cross-references repoint, the revision code updates from one line of metadata. An hour of fixing becomes minutes of looking, and a template fault fixed once stays fixed. The Friday engineer goes home.

It also ends the paste problem. Three engineers merging text files are merging *only* text. There is no formatting metadata to drag in, no styles to collide, no numbering to de-link. None of that exists until render time.

## One decision, one file

The second thing worth stealing is smaller and, I think, more valuable.

Software teams keep Architecture Decision Records: whenever a decision shapes the system, someone writes one short file. What was the situation, what options were on the table, what was decided, what follows from it. Dated, named, kept with the project forever.

Translate that to design. A Design Decision Record is a text file of maybe fifteen lines:

`2026-03-14-vsd-on-infeed-conveyor.md`. Context: the infeed conveyor motor trips on overload at full-crate starts. Options: upsize the 15kW motor, or keep it and add a VSD with a torque ramp. Decision: VSD, client accepted the cost on 14 March. Consequences: new MCC bucket, three points added to the IO list, ramp time set in the PLC, HMI alarm page updated.

Fifteen lines, two minutes. Now ask where that information lives in your current projects. An email thread. A comment buried in the PLC program that explains the ramp but not the reason for it. Mostly it lives in the head of whoever made the call, and it resigns when they do. Word is where design decisions go to hide. One file per decision, and they stop hiding: eight months later the client asks why there's a drive on that conveyor, and the answer is a filename.

## Write the fact once

Third pattern: single-sourcing.

Take a fictional bottling plant. The level transmitter on tank T-110 appears in the functional design spec, the IO list, the instrument schedule, the loop description and the O&M manual. Five documents, five hand-maintained copies of the same facts. When commissioning changes its range from 0 to 4m to 0 to 6m, someone has to find every copy, and the O&M manual is where the old range goes to survive.

Authored in text, the transmitter is defined once and every document that mentions it renders from that source. Change the range, re-render. The spec, the IO list and the manual cannot disagree with each other, because they are the same file wearing different templates.

This is not theory. My own working notes, design bases and decision records live in markdown, rendered into a branded report template. The honest finding: writing time went *down*, because writing is all you do. The formatting happens in the template, once.

## The fair objections

Word is fine for correspondence. Letters, minutes, anything whose value is the prose and whose life is short: leave them alone. This argument is about engineering content with a long life and many revisions.

The letterhead objection ("our documents have to look like *our* documents") sounds fatal and isn't. Branding is exactly what the template holds. It's a template problem, and it gets solved once, not per document.

Figures, next objection. A markdown file doesn't contain images; it points at them. The single-line diagram or the P&ID is an exported PDF sitting next to the text, referenced by filename, and the template places, sizes and numbers it at render time. No anchoring roulette when a paragraph grows, no 40MB report from full-resolution screenshots, and figure numbers regenerate at every render. Some diagrams can even be written as text and drawn at render, which makes the diagram itself diffable.

And nobody converts an office by memo. Start with your own notes and your next design basis. The renderings are indistinguishable from documents authored the hard way, so nobody downstream needs to care until they want to.

## The part about AI, briefly

A .docx file is a zip archive of XML. Today's AI tools read it fine and can edit it too, through conversion steps and scripts. What they can't give you is the answer that matters: what exactly changed? Checking an agent's edit to a Word file means rereading the document. Plain text turns the same edit into a line-by-line diff, reviewed like a junior engineer's markup. It's also cheaper to hand a model text than format. And encode your corporate identity in the render template once: anything an agent drafts comes out on brand, because the agent only ever touches content.

Extraction runs the same way. The source holds more than any one deliverable should show: the client report doesn't need the commissioning notes, and the O&M manual doesn't need the costing discussion. An agent can pull the right subset for each document, but only if it's been taught what belongs where. That teaching deserves an article of its own: a template for judgement instead of layout. For now, the point is simpler. Whether AI enters your design office under governance or under vibes is decided at the authoring layer.

## Where this meets git

On [Monday](/articles/steal-from-software-01-the-case/) I argued your office should steal git. Here's the connection: git on Word files works, technically. It stores them, it versions them, and it can tell you *that* a file changed. It can't show you *what* changed, because it can't see inside the format. Git on text shows the exact line: this ramp time changed, this clause amended, nothing else touched.

Text is the substrate that makes everything else in this series compound: reviewable changes, testable designs, and eventually a design an agent can safely work on. Steal both patterns. They were left unattended.

Next in the series: Who has the master file open? Soon: nobody.

---

*Marko Visser is a mechatronic engineer in Windhoek who builds AI tooling for engineering design workflows.*
