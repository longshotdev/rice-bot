export default function shorten(text: string, maxLen: number = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}
