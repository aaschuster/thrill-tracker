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

export {filterByToday};