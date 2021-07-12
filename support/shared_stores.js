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

var customerStore = localforage.createInstance({
    name: 'SynchronicityTimesheet',
    storeName: 'customerStore'
});

var ticketStatusStore = localforage.createInstance({
    name: 'SynchronicityTimesheet',
    storeName: 'ticketStatusStore'
});