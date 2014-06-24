#!/bin/bash

sudo cp ./com.1ittlecup.simplednsbridge.plist /Library/LaunchDaemons/com.1ittlecup.simplednsbridge.plist
sudo chomd 644 /Library/LaunchDaemons/com.1ittlecup.simplednsbridge.plist
sudo chown root:wheel /Library/LaunchDaemons/com.1ittlecup.simplednsbridge.plist
sudo launchctl load /Library/LaunchDaemons/com.1ittlecup.simplednsbridge.plist

