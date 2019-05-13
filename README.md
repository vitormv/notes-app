[![Build Status](https://travis-ci.org/vitormv/notas.svg?branch=master)](https://travis-ci.org/vitormv/notas) | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/vitormv/notas/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/vitormv/notas/?branch=master)

This is a prototype for a Desktop-only Notes UI I developed on my free time. It has very basic funcionality, and a simple text editor.

**This is NOT meant to replace your Notes editor 😁 Use at your own risk.**

### Not working yet:

* Persistence 💾. Everything you do will be lost when you reload the page.
* Adding notes 😅
* sort folders

### things you can do:

* edit notes (highligh text to show options, or use common keyboard shortcuts)
* search notes
* add images to the editor (though still very primitive)
* add/edit/rename folders
* resize the panels


## how to run locally

```
git clone https://github.com/vitormv/notas.git notas
cd notas
yarn install
yarn start
```

You can also try out a Electron version of the app by running:
```
yarn electron
```
