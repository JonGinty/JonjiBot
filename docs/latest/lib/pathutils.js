export function getAllUrlParameters() {
    try {
        var search = location.search.substring(1);
        if (!search)
            return {};
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }
    catch (e) {
        console.error(e);
    }
    return {};
}
