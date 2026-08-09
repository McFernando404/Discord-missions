# Discord Quest Completer v3.1
!      █████▒▓█████  ██▀███   ███▄    █  ▄▄▄       ███▄    █ ▓█████▄  ▒█████   ▒█████        ▓█████▄ ▓█████ ██▒   █▓
!    ▓██   ▒ ▓█   ▀ ▓██ ▒ ██▒ ██ ▀█   █ ▒████▄     ██ ▀█   █ ▒██▀ ██▌▒██▒  ██▒▒██▒  ██▒      ▒██▀ ██▌▓█   ▀▓██░   █▒
!    ▒████ ░ ▒███   ▓██ ░▄█ ▒▓██  ▀█ ██▒▒██  ▀█▄  ▓██  ▀█ ██▒░██   █▌▒██░  ██▒▒██░  ██▒      ░██   █▌▒███   ▓██  █▒░
!    ░▓█▒  ░ ▒▓█  ▄ ▒██▀▀█▄  ▓██▒  ▐▌██▒░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█▄   ▌▒██   ██░▒██   ██░      ░▓█▄   ▌▒▓█  ▄  ▒██ █░░
!    ░▒█░    ░▒████▒░██▓ ▒██▒▒██░   ▓██░ ▓█   ▓██▒▒██░   ▓██░░▒████▓ ░ ████▓▒░░ ████▓▒░      ░▒████▓ ░▒████▒  ▒▀█░  
!     ▒ ░    ░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░ ▒░   ▒ ▒  ▒▒▓  ▒ ░ ▒░▒░▒░ ░ ▒░▒░▒░        ▒▒▓  ▒ ░░ ▒░ ░  ░ ▐░  
!     ░       ░ ░  ░  ░▒ ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░░   ░ ▒░ ░ ▒  ▒   ░ ▒ ▒░   ░ ▒ ▒░        ░ ▒  ▒  ░ ░  ░  ░ ░░  
!     ░ ░       ░     ░░   ░    ░   ░ ░   ░   ▒      ░   ░ ░  ░ ░  ░ ░ ░ ░ ▒  ░ ░ ░ ▒         ░ ░  ░    ░       ░░  
!               ░  ░   ░              ░       ░  ░         ░    ░        ░ ░      ░ ░           ░       ░  ░     ░  
!                                                             ░                               ░                 ░   
Automated Discord Quest completer with anti-detection, visual UI panel, auto-accept and auto-claim.

## Features

- **Auto-Accept** - Automatically detects and enrolls in available quests
- **Auto-Complete** - Completes all supported quest types (Video, Game, Stream, Activity)
- **Auto-Claim** - Attempts to claim rewards automatically
- **Anti-Detection** - Random speeds, jitter delays, rate limit handling
- **Visual Panel** - Draggable UI with real-time progress bars
- **Manual Quest Detection** - Locks quests that can't be automated (CAPTCHA, bot invites)
- **Eject Button** - Instantly stop all processes

## Requirements

- [Discord Canary](https://canary.discord.com/download) (required, not regular Discord)
- Developer Tools enabled

## Installation

> 1. Download Discord Canary from: https://canary.discord.com/download
> 2. Close Discord Canary completely
> 3. Open this file in Notepad as Administrator:
     `%AppData%\discordcanary\settings.json`
> 4. Add this line inside the JSON:
     `"DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true`
> 5. Save the file and reopen Discord Canary
> 6. Go to Discover > Quests and accept any quest you want to complete
> 7. Press `Ctrl + Shift + I` to open Developer Tools
> 8. Go to the Console tab
> 9. Type: `allow pasting`
> 10. Press Enter
> 11. Open `code.js` and copy ALL the content
> 12. Paste it into the console
> 13. Press Enter
> 14. The quest panel will appear in the bottom right corner

## Supported Quest Types

| Type | Status |
|---|---|
| WATCH_VIDEO | ✅ Auto |
| WATCH_VIDEO_ON_MOBILE | ✅ Auto |
| PLAY_ON_DESKTOP | ✅ Auto (Desktop app required) |
| STREAM_ON_DESKTOP | ✅ Auto (Desktop app + VC required) |
| PLAY_ACTIVITY | ✅ Auto |
| CONNECT_ACCOUNT / Bot Invite | 🔒 Manual |

## Credits

**Developed by ꜰᴇʀɴᴀɴᴅᴏᴏ | ᴅᴇᴠ**

## License

This project uses the FND-1.0 Custom License. 

Free to use, modify and share. Forks and modifications MUST retain original credits to ꜰᴇʀɴᴀɴᴅᴏᴏ | ᴅᴇᴠ. Removing credits is NOT permitted.

See [LICENSE](LICENSE) for details.
