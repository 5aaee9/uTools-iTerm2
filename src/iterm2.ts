import os from 'os'
import bplist from 'bplist'
import fs from 'fs'
import runAppleScript from 'run-applescript'

const plist = `${os.homedir()}/Library/Preferences/com.googlecode.iterm2.plist`

export async function readProfiles(): Promise<PreloadBasicItem[]> {
    const data = await fs.promises.readFile(plist)

    const p: any = await new Promise((res, rej) => {
        bplist.parseBuffer(data, (err, result) => {
            if (err) {
                rej(err)
                return
            }

            res(result)
        })
    })

    return p[0]['New Bookmarks']
        .map(it => ({
            title: it.Name,
            description: `Tags: ${it.Tags.join(', ')}`,
        }))
}

export async function runProfile(profile: string) {
    await runAppleScript(`tell application "iTerm2"
        create window with profile "${profile}"
    end tell`)
}

export async function runCommand(command: string) {
    await runAppleScript(`tell application "iTerm2"
        create window with default profile command "${command.replace(/"/g, '\\"')}"
    end tell`)
}
