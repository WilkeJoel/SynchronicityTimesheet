const clearModal = new bootstrap.Modal(document.getElementById('clearModal'));

document.getElementById('verifyMaster').addEventListener('click', () => { clearModal.show()}, false);

document.getElementById('resetLastTime').addEventListener('click', () => { resetLastTime()}, false);

//  clear the specified “store”.
document.getElementById('clearTime').addEventListener('click', () => { clearTimeLogStore()}, false);
document.getElementById('clearDaily').addEventListener('click', () => { clearDailyTicketStore()}, false);
document.getElementById('clearMaster').addEventListener('click', () => { clearMasterTicketStore()}, false);

document.getElementById('refreshTime').addEventListener('click', () => { refreshTimeLogStore()}, false);
document.getElementById('refreshDaily').addEventListener('click', () => { refreshTicketLogStore()}, false);
document.getElementById('refreshMaster').addEventListener('click', () => { refreshMasterLogStore()}, false);


var clearTimeLogStore = () => {
    timeLogStore.clear().then(() => {
        console.log('Cleared timeLogStore');
    });
}

var clearDailyTicketStore = () => {
    dailyTicketStore.clear().then(function() {
        console.log('Cleared dailyTicketStore');
      });
}

var clearMasterTicketStore = () => {
    masterTicketStore.clear().then(function() {
        console.log('Cleared masterTicketStore');
      });
}

//  Refresh TimeLogStore from sample data
const refreshTimeLogStore = () => {
    for (let i = 0; i < xAxix.length; i++) {
        let x = i;

        if (i < 10){
            i = `0${i}`;
        }
        else {
            i = `${i}`;
        }
        
        addTimeLogStoreRow(i, xAxix[x]);
    }
    console.log('Refreshened timeLogStore');
}

// sampleTimeLogArry
const refreshTicketLogStore = () => {
    for (let i = 0; i < sampleTimeLogArry.length; i++) {
        addTicketLogStoreRow(sampleTimeLogArry[i].IssueId.toString(), sampleTimeLogArry[i]);
    }

    console.log('Refreshened dailyTicketStore');
}

const refreshMasterLogStore = () => {
    console.log('Refreshened masterTicketStore');
}

async function addTicketLogStoreRow(rowKey, objVal) {
    await dailyTicketStore.setItem(rowKey, objVal).then(() => {
    })
    .catch((err) => {
        console.log(err.message);
    });
}


const resetLastTime = async () => {
    let position;
    let removeKey;

    await timeLogStore.length().then((keyNum) => {
        position = (keyNum - 1);

        if (position < 10) {
            removeKey = `0${position}`;
        }
        else {
            removeKey = position.toString();
        }

        removeTimeLogRow(removeKey);
    })
    .then(() => {
        addTimeLogStoreRow(removeKey, xAxix[position]);
    })
}


const removeTimeLogRow = async (key) => {
    await timeLogStore.removeItem(key).then(function() {
    // Run this code once the key has been removed.
        console.log('Key is cleared!');
    })
}



// function formatNumber(num) {
//     var check = Math.round(num * 100) / 100;
//     var rounded = Math.round(check);

//     return num.toFixed(2);
// }

// function test(num) {
//     var formatted = formatNumber(num);

//         console.log(num, "=>", formatted.valueOf());

// }
// test(1.01);
// test(1.43);
// test(23.7);
// test(1.200123);
// test(1.000043);
// test(1.007);
// test(1.0007);