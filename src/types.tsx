export interface ISvg {
    size: number;
    color?: string;
}

export interface ITrackItem {
    id: string,
    name: string,
    duration_ms: number,
    preview_url: string,
    artists: Array<{
        id: string,
        name: string
    }>
}

export interface IAlbum {
    id: string,
    name: string,
    label: string,
    images: Array<IImg>,
    artists: Array<{
        id: string,
        name: string,
    }>,
    tracks: {
        total: number, 
        items: Array<ITrackItem>
    },
    release_date: string,
}

export interface IAlbumPage {
    id: string,
    name: string,
    label: string,
    images: Array<IImg>
    tracks: ITrackItem[],
    artists: string[], 
}

export interface IArtist {
    profile: {
        name: string,
    },
    visuals: {
        avatarImage: {
            sources: Array<IImg>
        }
    }
}

export interface IImg {
    url: string,
    width: number,
    height: number,
}
