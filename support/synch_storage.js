



// ___________________________________________________________________________
// ------------------------------------------------------------- Time Handling
// ___________________________________________________________________________

//  { "IssueId": 579348, "x": 1615730400000, "x2": 1615731300000 },
async function revAddTaskStartTime(e) {
    //  From Input Table
    const rowId =  e.target.parentElement.parentElement.parentElement.id;
    const inputTime = document.getElementById(rowId).getElementsByTagName('input')[0].value;
    const timeObj = { IssueId: rowId };

    if (!inputTime){
        timeObj.x = Date.now();
    }
    else {
        const arrStr = inputTime.split(':');
        const arrTime = arrStr.map(str => parseInt(str, 10));
        timeObj.x = moment().startOf('day').add(arrTime[0], 'hours').add(arrTime[1], 'minutes').valueOf();
    }

    //  Y is the 'position' in the array
    const yAxisArr = await dailyTicketStore.keys();
    timeObj.y = yAxisArr.indexOf(objVal.IssueId);

    await timeLogStore.length().then((numberOfKeys) => {
        //  Add to end of table
        addTimeLogStoreRow(numberOfKeys, {...timeObj})
    })
    .then(() => {
        //  Add end time to previous row
        editTimeLogStoreRow(numberOfKeys-1, {x2: timeObj.x});
    })
}

//  { "IssueId": 579348, "y": 4, "x": 1615730400000, "x2": 1615731300000 },
async function addTimeLogStoreRow(rowKey, objVal) {
    await timeLogStore.setItem(rowKey, objVal).then(() => {
    })
    .catch((err) => {
        console.log(err.message);
    });
}

async function editTimeLogStoreRow(rowKey, objVal) {
    await timeLogStore.getItem(rowKey).then((value) => {
        timeLogStore.setItem(rowKey, {...value, ...objVal});
    })
}





// ___________________________________________________________________________
// --------------------------------------------------------- Utility Functions
// ___________________________________________________________________________

