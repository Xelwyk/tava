# Tava README

>WARNING: this extension is in beta

T.A.V.A.

Timestamp Analysis Visual Aid - color codes groups of ISO 8601 timestamps based on "hole" between timestamps (target interval).

Currently only ISO 8601 date and time with offset are supported


## Features

Separates timestamps into groups based on targeted interval of separation and colors them in alternating pattern

For example, without plugin:

![example with plugin](images/022458.png)

with plugin, 500ms target interval:

![example without plugin](images/020900.png)

with plugin, 60000ms target interval:

![example without plugin](images/022752.png)

Target interval can be set through command palette, just search for "tava"

## Requirements

- VSCode
- ISO 8601 timestamps

## Extension Settings

This extension contributes the following settings:

* `tava.targetInterval`: target interval in milliseconds

## Known Issues

I've never done anything in typescript, so there are probably more _unknown_ issues than _known_

- minimap doesn't want to color timestamp portions

---

## Fun fact

_Tava_ translates to _pan_ in Croatian
