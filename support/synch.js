
window.addEventListener('load', () => { setupSynchronicityTimesheet()});
window.addEventListener('load', () => { buildChart()});

const setupSynchronicityTimesheet = async() => {
    // if start of new day--clear current stores

    await buildInputTable();
    await buildTicketSelectDropDown();
    
    addTimeListener();
 }


//  To Do List
//buildSortedTicketDropDown();

revBuildSortedTicketDropDown();

