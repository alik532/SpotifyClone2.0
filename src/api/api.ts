import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { IAlbum, IImg } from '../types'

const headers = {
    'X-RapidAPI-Key': '21984204b7msh3267a67b6624b0ep1c87b2jsn6053aef7f9e6',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://spotify23.p.rapidapi.com/'
    }),
    keepUnusedDataFor: 900,
    endpoints: builder => ({
        getPlaylists: builder.query<IGetPlaylistsResponse, {ids: string | undefined}>({
            query: (arg) => {
                const {ids} = arg
                return {
                    url: 'albums/',
                    params: {ids},
                    headers,
                }
            }
        }),
        getPlaylist: builder.query<IGetPlaylistsResponse, {id: string | undefined}>({
            query: (arg) => {
                const {id} = arg
                return {
                    url: 'albums/',
                    params: {ids: id},
                    headers,
                }
            }
        }),
        getPlaylistMetadata: builder.query<IGetPlaylistMetadata, {id: string | undefined}>({
            query: (arg) => {
                const {id} = arg
                return {
                    url: 'album_metadata/',
                    params: {id},
                    headers,
                }
            }
        }),
        getTracks: builder.query<IGetTracksResponse, {id: string}>({
            query: (arg) => {
                const {id} = arg
                return {
                    url: 'tracks/',
                    params: {ids: id},
                    headers,
                }
            }
        }),
        searchTracks: builder.query<IGetSearchTracksResponse, {q: string}>({
            query: (arg) => {
                const {q} = arg;
                return {
                    url: 'search/',
                    params: {q, type: 'tracks'},
                    headers,
                }
            }
        }),
    })
}) 

export const {useGetPlaylistsQuery, useGetPlaylistMetadataQuery, useGetTracksQuery, useSearchTracksQuery, useGetPlaylistQuery } = api

interface IGetPlaylistMetadata {
    data: {
        album: {
            coverArt: {
                extractedColors: {
                    colorRaw: {
                        hex: string
                    }
                }
            }
        }
    }
}

interface IGetSearchTracksResponse {
    query: string,
    tracks: {
        totalCount: number,
        items: Array<{
            data: {
                id: string,
                name: string,
                albumOfTrack: {
                    id: string,
                    name: string,
                    coverArt: {
                        sources: Array<IImg>
                    }
                },
                artists: {
                    items: Array<{
                        profile: {name: string}
                    }>
                },
                duration: {
                    totalMilliseconds: number,
                }
            }
        }>,
        paggingInfo: {
            nextOffset: 10,
            limit: 10,
        }
    }
}

interface IGetPlaylistsResponse {
    albums: IAlbum[]
}

interface IGetTracksResponse {
    tracks: Array<{
        id: string,
        name: string,
        album: {
            id: string,
            images: Array<IImg>,
            name: string,
        },
        duration_ms: number,
        artists: Array<{
            id: string,
            name: string,
        }>,
        preview_url: string,
    }>
}

