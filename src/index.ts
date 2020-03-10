import { runProfile, readProfiles, runCommand } from './iterm2'

let ProfileList: PreloadBasicItem[] = []

export const iterm: PreloadFeature<PreloadBasicItem> = {
    mode: 'list',
    args: {
        enter: async (action, callback) => {
            ProfileList = await readProfiles()

            callback(ProfileList)
        },
        search: async (action, searchWord, callback) => {
            if (!searchWord) return
            searchWord = searchWord.toLowerCase()

            callback(ProfileList.filter(it => it.title.includes(searchWord)))
        },
        select: async (action, itemData) => {
            window.utools.hideMainWindow()
            await runProfile(itemData.title)
            window.utools.outPlugin()
        },
    },
}

export const shell: PreloadFeature<PreloadBasicItem> = {
    mode: 'list',
    args: {
        enter: () => { },
        search: async (action, searchWord, callback) => {
            if (!searchWord) return
            callback([{
                title: '运行指令',
                description: searchWord,
            }])
        },
        select: async (action, itemData) => {
            window.utools.hideMainWindow()
            await runCommand(itemData.description!)
            window.utools.outPlugin()
        },
    },
}
