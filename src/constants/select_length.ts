const SELECT_LENGTH = 5

export const SelectLength = (l: number) => {
    if (l < SELECT_LENGTH) return l
    return SELECT_LENGTH
}