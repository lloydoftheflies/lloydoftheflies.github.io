---
title: "Collascii - The Future Editor of Yesterday, Tomorrow"
date: 2019-05-20
categories: [software]
tags: [olin, softsys, team]
---

Collascii is a terminal-based text editor designed to make [ASCII art](https://en.wikipedia.org/wiki/ASCII_art) - rather
than the limiting insertion-based model that most text editors today, collascii
treats documents as a grid of characters, similar to image manipulation programs
like Photoshop, but for text! With collascii, you can type forwards, backwards,
upwards, and downwards; paint with characters using your cursor; and draw lines
and arrows across a canvas. Additionally, collascii is _collaborative_, so you
can share a canvas with your friends and see their changes live, _ala_ Google
Docs.

<script id="asciicast-248508" src="https://asciinema.org/a/248508.js" async></script>
<noscript>
    <a href="https://asciinema.org/a/248508" target="_blank"><img src="https://asciinema.org/a/248508.svg" /></a>
</noscript>

Collascii was written in C by myself and two other students ([Adam](https://labseven.space)
and [Matt](https://frenchmatt.com/)) as the final project in the Software
Systems (SoftSys) course at Olin.

Over the course of the four weeks that we spent on it, I worked on various
aspects of the project:

- Creating the data structure for holding the "canvas" of characters, and
  functions for manipulating it and loading from and writing to files.
- Writing an implementation of a network protocol to communicate with a central server
  and other clients using BSD sockets. This built off of what I learned from
  writing an HTTP server earlier in the course.
- Building the current user interface, with distinct areas to show the canvas,
  commands and information about the current editing mode, and general status.
- Adding mouse support
- Expanding the editing modes API
- Implementing drawing of remote cursors for things
- Creating [a plaintext slideshow](https://github.com/olin/collascii/blob/3421203a35a0079ae580e8fbdceec7260174dc4c/reports/presentation.txt)
  to use as our final presentation, so we could present collascii _with_ collascii
- Set up Continuous Integration for our pull requests, with automatic compilation
  and executable uploading on releases.

The project lives on GitHub at <https://github.com/olin/collascii>, with
precompiled executables for 64-bit Linux, as well as instructions for compiling
it yourself.
