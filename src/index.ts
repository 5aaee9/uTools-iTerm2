import { runProfile, readProfiles, runCommand } from './iterm2'

let ProfileList: PreloadBasicItem[] = []

export const iterm: PreloadFeature<PreloadBasicItem> = {
    mode: 'list',
    args: {
        enter: async (action, callback): Promise<void> => {
            ProfileList = await readProfiles()

            callback(ProfileList)
        },
        search: (action, searchWord, callback): void => {
            if (!searchWord) {
                callback(ProfileList)
                return
            }
            searchWord = searchWord.toLowerCase()

            callback(ProfileList.filter(it => it.title.toLowerCase().includes(searchWord)))
        },
        select: async (action, itemData): Promise<void> => {
            window.utools.hideMainWindow()
            await runProfile(itemData.title)
            window.utools.outPlugin()
        },
    },
}

export const shell: PreloadFeature<PreloadBasicItem> = {
    mode: 'list',
    args: {
        enter: (): void => { },
        search: (action, searchWord, callback): void => {
            callback([{
                title: '运行指令',
                description: searchWord,
            }])
        },
        select: async (action, itemData): Promise<void> => {
            window.utools.hideMainWindow()
            await runCommand(itemData.description!)
            window.utools.outPlugin()
        },
    },
}
