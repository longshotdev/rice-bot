export default function msToTime(ms: number) {
    let days = Math.floor(ms / 86400000); // 24*60*60*1000
    let daysms = ms % 86400000; // 24*60*60*1000
    let hours = Math.floor(daysms / 3600000); // 60*60*1000
    let hoursms = ms % 3600000; // 60*60*1000
    let minutes = Math.floor(hoursms / 60000); // 60*1000
    let minutesms = ms % 60000; // 60*1000
    let sec = Math.floor(minutesms / 1000);

    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";

    return str;
}
