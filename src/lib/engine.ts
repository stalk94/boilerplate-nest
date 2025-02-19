import EventEmiter from "./emiter";


window.gurl = import.meta.env.DEV ? 'http://localhost:3000/' : document.baseURI;
window.languages = ['GB', 'RU', 'CN', 'DE'];
window.token = undefined;
export const EVENT = new EventEmiter();



/**
 * 
 * @param {string} url 
 * @param {*} data 
 * @param {'GET'|'POST'} metod 
 * @returns 
 */
export async function send(url: string, data: any, metod: 'GET'|'POST') {
    const dataServer = {
        method: metod ?? 'POST',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${window.token}`,
            'Content-Type': 'application/json'
        }
    }
    if(metod!=='GET') dataServer.body = JSON.stringify(data);

    const request = await fetch(window.gurl + url, dataServer);
    return request.json();
}


window.onerror =(message, source, lineno, colno, error)=> {
    source = source.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "");
    let position = `${lineno}:${colno}`;

    const data = {
        type: 'global',
        name: error.name,
        message,
        position,
        source,
        stack: error.stack
    }
    
    send('error', { time: new Date().toUTCString(), ...data }, 'POST');
}
window.addEventListener("unhandledrejection", (event)=> {
    console.error("❌⏳ error: ", event.reason);
    send('error', { time: new Date().toUTCString(), type:'promise', reason:event.reason }, 'POST');
    
    event.preventDefault();
});