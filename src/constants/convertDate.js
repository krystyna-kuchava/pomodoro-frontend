export const convertToDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();
    if(dd<10) {
        dd = '0'+dd;
    }
    if(mm<10) {
        mm = '0'+mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    return date;
};
