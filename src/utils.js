function filterByToday(records) {
    return records.filter( record => {
        const [date, time] = record.timestamp.split(", ");

        if(date === new Date().toLocaleDateString(
            [], {dateStyle:"short"}
        )) {
            return record;
        }    
    })
}

function objFromID(id, array, key) {
    const [res] = array.filter( obj => obj[key] === id);
    return res;
}

export {filterByToday, objFromID};