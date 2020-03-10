declare type PreloadType = 'none' | 'list' | 'doc'
declare type ContextType = 'text'

declare type DataListCallback<T> = (data: T[]) => void

declare type PreloadBasicItem = {
    title: string
    description?: string
}

declare type PreloadAction = {
    code: string
    type: ContextType
    payload: string
}

declare type PreloadArgs<T extends PreloadBasicItem> = {
    enter: (action: PreloadAction, callback: DataListCallback<T>) => void
    search?: (action: PreloadAction, searchWord: string, callback: DataListCallback<T>) => void
    select?: (action: PreloadAction, itemData: T, callback: DataListCallback<T>) => void
    placeholder?: string
}

declare type PreloadFeature<T extends PreloadBasicItem> = {
    mode: PreloadType
    args: PreloadArgs<T>
}
