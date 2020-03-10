#!/bin/sh


rm -f app.asar app.asar.gz iterm.upx
asar pack build app.asar

gzip app.asar
mv app.asar.gz iterm.upx

