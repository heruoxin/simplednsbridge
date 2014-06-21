#!/bin/bash

sudo cp ./com.1ittlecup.simplednsproxy.plist /Library/LaunchDaemons/com.1ittlecup.simplednsproxy.plist
sudo chomd 644 /Library/LaunchDaemons/com.1ittlecup.simplednsproxy.plist
sudo chown root:wheel /Library/LaunchDaemons/com.1ittlecup.simplednsproxy.plist
sudo launchctl load /Library/LaunchDaemons/com.1ittlecup.simplednsproxy.plist

