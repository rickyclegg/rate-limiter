export interface AllowParams {
    id: string
}

export interface Limitless {
    isAllowed(params: AllowParams): boolean
}
