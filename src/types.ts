export interface ValidParams {
    id: string
}

export interface Limitless {
    isValidId(params: ValidParams): boolean
}
