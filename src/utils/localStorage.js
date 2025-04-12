const saveStorage = (name, data) => {
    const JSONdata = JSON.stringify(data);
    localStorage.setItem(name, JSONdata);
    //localStorage.delete(name)
    //sessionStorage
}

const getStorage = (name) => {
    const JSONdata = localStorage.getItem(name);
    const data = JSON.parse(JSONdata);
    return data;
}

export { 
    saveStorage,
    getStorage
}