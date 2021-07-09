// ___________________________________________________________________________
// -------------------------------------------------------- Handle localForage
// ___________________________________________________________________________

var masterTicketStore = localforage.createInstance({
    name: 'SynchronicityTimesheet',
    storeName: 'masterTicketStore'
});

var timeLogStore = localforage.createInstance({
    name: 'SynchronicityTimesheet',
    storeName: 'timeLogStore'
});

var dailyTicketStore = localforage.createInstance({
    name: 'SynchronicityTimesheet',
    storeName: 'dailyTicketStore'
});





window.addEventListener('load', () => { setupSynchronicityTimesheet()});
window.addEventListener('load', () => { buildChart()});






const setupSynchronicityTimesheet = async() => {
    // if start of new day--clear current stores

    await buildInputTable();
    await buildTicketSelectDropDown();
    
    addTimeListener();
 }


 buildSortedTicketSelectDropDown();