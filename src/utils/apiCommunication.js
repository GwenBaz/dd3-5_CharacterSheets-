import { invoke } from "@tauri-apps/api/core";

function obj2str(obj, visited = new Set()) {
    // Protection contre les références circulaires
    if (visited.has(obj)) {
        return "[Circular]";
    }

    let type = typeof obj;

    // Cas de base : types primitifs
    if (type === 'string') return `"${obj}"`;
    if (type === 'number' || type === 'boolean') return String(obj);
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';

    // Marquer l'objet comme visité
    visited.add(obj);

    let str = "";
    let isArray = Array.isArray(obj);

    str += isArray ? "[\n" : "{\n";

    for (const field in obj) {
        if (isArray) {
            str += "  " + obj2str(obj[field], visited) + ',\n';
        } else {
            str += "  " + field + " : " + obj2str(obj[field], visited) + ',\n';
        }
    }

    str += isArray ? "]" : "}";

    return str;
}

function log(message) {
    if (typeof (message) == Object) {
        invoke('log', { message: obj2str(message) })
    } else {
        invoke('log', { message: message })
    }

}

export { log, obj2str }