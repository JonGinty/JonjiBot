## Social Overlays
Currently supports twitch and youtube.

### How to use
Create a browser source in OBS (TODO: include instructions how to do this?) and set the url to one of the urls from the examples below.

This source does not require live refresh so it is safe to set the framerate to an extremely low value.

### Arguments

- **name** - (*required*) the name of your social media account i.e. twitch / youtube channel
- **type** - (*required*) the type of social media to display, only accepts "twitch", "youtube", "twitter", "instagram" or "facebook" at present.
- **showurl** - (*optional*) flag indicating whether to prefix your account name with the website url i.e. twitch.tv/yourname, not supported for instagram or facebook.

### Examples
<https://jonginty.github.io/JonjiBot/latest/social-overlays/?type=twitch&name=jonji13&showurl=true>

<https://jonginty.github.io/JonjiBot/latest/social-overlays/?type=youtube&name=jonji13>



