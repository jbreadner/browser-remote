# `browser-remote`

This tool is used by me to allow [Deckboard](https://www.deckboard.app/) running on my tablet to open web pages in my browser.  The main thing I wanted was to not have (for instance) 20 different mail tabs open; if I hit the Mail button on Deckboard, it will first look to see if there is an existing mail tab open.  If there is, this tab (and window) will be brought to the foreground.  If there is no matching tab already open, then a new one is opened.

This tool was developed and used in Linux (latest Ubuntu) but it will probably work on any platform.

##  Prerequisites

This tool communicates with a running browser using the remote debugging port.  Only Chrome-based browsers seem to work (I have used [Vivaldi](https://vivaldi.com) and [Google Chrome](https://www.google.com/intl/en_ca/chrome/dr/download)).  I launch vivaldi with these arguments:

```
/usr/bin/vivaldi-stable --remote-debugging-port=9224 --profile-directory=Default %U
```

This `--remote-debugging-port=9224` argument is the key one.  This `9224` value needs to match the `-p` argument passed to this tool, see `preset.sh` for an example.

## Presets

The web pages everyone uses are different.  Copy `preset.sample.yaml` to `preset.yaml` in the same directory, and edit to suit your purposes.  

For example, this entry could be added:

```yaml
presets:
  github:
    check: "//github.com"
    url: "https://github.com/jbreadner/browser-remote"
```

With this configuration in place, if the following command is run:

```
browser-remote/preset.sh github
```

This tool will use port 9224 to communicate with the local browser, and inspect every open tab.  The first one where the address bar contains the `check` string `"//github.com"` will be brought to the foreground.  If no open tab contains that string, then a new tab is opened, with the address set to the `url` string.

## Deckboard

In my Deckboard setup, I have one button titled "Start Vivaldi".  Its action is "Run Command", with the command:  

```
/usr/bin/vivaldi-stable --remote-debugging-port=9224 --profile-directory=Default %U
```

This allows me to easily start my browser with the required remote debugging port set.  There are other ways to do this.

The Deckboard buttons that are associated with web pages are also "Run Command" actions, and have commands like this:

```
cd /path/to/browser-remote/lib; node . -p 9224 app github
```

Or, use the helper script:

```
/path/to/browser-remote/preset.sh github
```