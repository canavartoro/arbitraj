

export let SERVER_URL = 'http://5.79.119.216/';


export function getWebUrl(act:string): string {
    return SERVER_URL + 'api.php?cmd=' + encodeURI(act);
}