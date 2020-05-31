function generateHint(token, priority, callback) {
    fetch(`http://localhost:3030/report/month/priority/${priority}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(res => res.json())
        .then((res) => {
            const shouldDisplayHintConfig = shouldDisplayHint(res);
            callback(shouldDisplayHintConfig);
        })
        .catch((err) => {
            console.log(err);
        });
}


function shouldDisplayHint(tasksReport) {
    const finishedPriorityTasks = tasksReport.finishedPriorityTasks;
    const failedPriorityTasks = tasksReport.failedPriorityTasks;
    const failedTasks = tasksReport.failedTasks;
    const finishedTasks = tasksReport.finishedTasks;

    const percentOfPriorityFailedTasks = Math.floor(failedPriorityTasks * 100 / finishedPriorityTasks);
    const percentOfFailedTasks = Math.floor(failedTasks * 100 / finishedTasks);

    if (percentOfPriorityFailedTasks > 10) {
        return {shouldDisplayHint: true, percentOfPriorityFailedTasks, percentOfFailedTasks};
    } else if (percentOfFailedTasks - percentOfPriorityFailedTasks > 5) {
        return {shouldDisplayHint: true, percentOfPriorityFailedTasks, percentOfFailedTasks};
    } else {
        return {shouldDisplayHint: false, percentOfPriorityFailedTasks, percentOfFailedTasks};
    }
}

export default generateHint;
