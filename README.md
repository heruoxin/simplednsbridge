#simplednsproxy

A simple DNS proxy. It can forward DNS through TCP/UDP with the specific port.

##Config

The `hosts` file has the highest priority.

##Use age

`simplednsproxy `

For Mac users, put the `com.1ittlecup.simplednsproxy.plist` into `/Library/LaunchDaemons/`.

And run `launchctl load /Library/LaunchDaemons/com.1ittlecup.simplednsproxy.plist` to load it at startup.

For Linux users,I recommend [PM2](https://github.com/unitech/pm2)
