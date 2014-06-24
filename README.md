#simplednsbridge

A simple DNS bridge. It can forward DNS through TCP/UDP with the specific port.

##Config

The `hosts` file has the highest priority.

##Use age

`simplednsbridge `

For Mac users, put the `com.1ittlecup.simplednsbridge.plist` into `/Library/LaunchDaemons/`.

And run `sudo launchctl load /Library/LaunchDaemons/com.1ittlecup.simplednsbridge.plist` to load it at startup.

For Linux users,I recommend [PM2](https://github.com/unitech/pm2)
