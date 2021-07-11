const clearModal = new bootstrap.Modal(document.getElementById('clearModal'));

document.getElementById('verifyMaster').addEventListener('click', () => { clearModal.show()}, false);
document.getElementById('resetLastTime').addEventListener('click', () => { resetLastTime()}, false);

//  clear the specified “store”.
document.getElementById('clearTime').addEventListener('click', () => { clearTimeLogStore()}, false);
document.getElementById('clearDaily').addEventListener('click', () => { clearDailyTicketStore()}, false);
document.getElementById('clearMaster').addEventListener('click', () => { clearMasterTicketStore()}, false);
document.getElementById('clearCustomer').addEventListener('click', () => { clearCustomerStore()}, false);

document.getElementById('refreshTime').addEventListener('click', () => { refreshTimeLogStore()}, false);
document.getElementById('refreshDaily').addEventListener('click', () => { refreshTicketLogStore()}, false);
document.getElementById('refreshMaster').addEventListener('click', () => { refreshMasterLogStore()}, false);
document.getElementById('refreshCustomer').addEventListener('click', () => { refreshCustomerStore()}, false);


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

var clearCustomerStore = () => {
    customerStore.clear().then(() => {
        console.log('Cleared customerStore');
    })
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

//  { "Customer": "The Home Depot, Inc.", "ShortName": "Home Depot" },
const refreshCustomerStore = () => {
    for (let x in shortCustName) {
        addCustomerStoreRow(shortCustName[x]);
    }
    console.log('Refreshened customerStore');
}

async function addCustomerStoreRow(obj) {
    await customerStore.setItem(obj['Customer'], {...obj}).then(() => {
        console.log("worked: " + obj);
    })
    .catch((err) => {
        console.log(err.message);
    });
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