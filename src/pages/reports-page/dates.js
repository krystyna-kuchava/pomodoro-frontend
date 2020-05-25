const convertToDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = mm + '-' + dd + '-' + yyyy;
    return date;
};

const getDateAgo = (date, days) => {
    date = new Date(date);
    let dateCopy = new Date(date);

    dateCopy.setDate(date.getDate() - days);
    return convertToDate(dateCopy);
};


export function arrayOfDaysOfMonth() {
    const dates = [];

    const currentDate = convertToDate(new Date());
    for (let i = 0; i < 30; i++) {
        const date = getDateAgo(currentDate, i);
        const numbers = date.split('-');
        const newDate = numbers[1] + '-' + numbers[0] + '-' + numbers[2];
        dates.push(newDate);
    }

    return dates;
}
