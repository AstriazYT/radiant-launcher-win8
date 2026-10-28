Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c C:\Users\rad\Desktop\node-v14.17.6-win-x64\node.exe .\node_modules\electron\cli.js .", 0, False
Set WshShell = Nothing
