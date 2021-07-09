
let durationsObj = {};
let outputTotal = {
    totalToday: 0,
    roundToday: 0,
    diffToday: 0,
    valueAdded: 0,
    nonValueAdded: 0
};


// ___________________________________________________________________________
// ----------------------------------------------------------------- Listeners
// ___________________________________________________________________________
document.getElementById('punchOutBtn').addEventListener('click', punchOut);

const outputTableListeners = () => {
    document.querySelectorAll('.editT').forEach(input => {
        outputTotal.totalToday += parseInt(input.value);

        input.addEventListener('change', async(e) => {
            await editTime(e);
        })
   });

    document.querySelectorAll('.editVA').forEach(input => {
        outputTotal.valueAdded += parseFloat(input.value);

        input.addEventListener('change', async(e) => {
            await editTime(e);
        })
    });

    document.querySelectorAll('.editNVA').forEach(input => {
        outputTotal.nonValueAdded += parseFloat(input.value);

        input.addEventListener('change', async(e) => {
            await editTime(e);
        })
    });

    document.querySelectorAll('.editR').forEach(input => {
        outputTotal.roundToday += parseFloat(input.value);
    });

    document.querySelectorAll('.editD').forEach(input => {
        outputTotal.diffToday += parseFloat(input.value);
    });

   updateOutputTableFoot('outputTotal', outputTotal);
}


// ___________________________________________________________________________
// ------------------------------------------------------------------- Day End
// ___________________________________________________________________________
async function punchOut() {
    await daysEnd();    // TODO: Add back for Prod
    await calcDuration();    // TODO: Add back for Prod
    await addTimeObjToStore();    // TODO: Add back for Prod
    await buildOutputTable();
}

//  Add quitting time to last entry
async function daysEnd(){
    //const endTime = Date.now();
    const endTime = 1625333468000;   // ---------------------------------------------- TODO: Remove for Prod

    const keyNum = await timeLogStore.length();

    await editTimeLogStoreRow(keyNum-1, {x2:endTime});
}

//  Adds times from timeLogStore to create Duration object for addTimeObjToStore()
//  converts to Minutes
async function calcDuration() {
    await timeLogStore.iterate((value, key) => {
      const accKey = value.IssueId;
      const duration = Math.floor((parseInt(value.x2) - parseInt(value.x)) / (1000 * 60));
      //const duration = (parseInt(value.x2) - parseInt(value.x))/(1000 * 60);

      durationsObj[accKey] = !durationsObj[accKey] ? duration : durationsObj[accKey] + duration;
    })
    .then(() => {
       // console.log("durationsObj: " + JSON.stringify(durationsObj));
    });
  }


//  Add time object to the Daily Ticket Store
async function addTimeObjToStore() {
    await dailyTicketStore.iterate((value, key) => {
      let timeObj = {};

      timeObj.totalToday = durationsObj[key];
      timeObj.round15 = round15min(durationsObj[key]);
      timeObj.valueAdded = timeObj.round15;
      timeObj.nonValueAdded = 0;
  
      value.Time = timeObj;
  
      //console.log("new tally: " + JSON.stringify(value));
      
    dailyTicketStore.setItem(key, {...value}); // -----------------------------------!!TODO -- Add back for Prod
    })
  }

  function round15min(mins) {
    return ((((mins + 7.5) / 15 | 0) * 15) / 60);
}



// _____________________________________________________________________________
// ---------------------------------------------------------------- Time Editing
// _____________________________________________________________________________
const getEditRowValues = (key, myClass) => {
    //  Get row values, convert to decimal
        const editTotal = document.getElementById(key).getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
        const editRound = document.getElementById(key).getElementsByTagName('td')[3].getElementsByTagName('input')[0].value;
        const editValAdd = document.getElementById(key).getElementsByTagName('td')[5].getElementsByTagName('input')[0].value;
        const editNonValAdd = document.getElementById(key).getElementsByTagName('td')[6].getElementsByTagName('input')[0].value;
    
        const timeObj = {
            totalToday: parseInt(editTotal),
            round15: round15min(parseInt(editTotal)),
            valueAdded: 0,
            nonValueAdded: 0
        }
    
        if (myClass === 'editVA') {
            timeObj.valueAdded = parseFloat(editValAdd);
            timeObj.nonValueAdded = timeObj.round15 - timeObj.valueAdded;
        }
        else if (myClass === 'editT' && editValAdd === 0 && timeObj.round15 < editRound ) {
            timeObj.nonValueAdded = timeObj.round15;
        }
        else {
            timeObj.nonValueAdded = parseFloat(editNonValAdd);
            timeObj.valueAdded = timeObj.round15 - timeObj.nonValueAdded;
        }
    
        //alert("Output 1: " + myClass + " :: " + editTotal + " :: " +  editValAdd + " :: " + editNonValAdd + " || " + timeObj.totalToday + " :: " +  timeObj.valueAdded + " :: " + timeObj.nonValueAdded);
    
        return timeObj;
    }
    
    const editTime = async (e) => {
        const myId =  e.target.parentElement.parentElement.id;
        //  get identifier from className
        const myClass = e.target.classList.item(2);
    
        const timeObj = getEditRowValues(myId, myClass);
        
        //  Get ticket obj
        const myKey = myId.replace('output', ''); 
    
        let value = await dailyTicketStore.getItem(myKey);
    
        value.Time = timeObj;
    
        await dailyTicketStore.setItem(myKey, {...value});
            //  Update Output Table
            updateOutputTableRow(myId, {...value});
    
            outputTableListeners();
    
          //  alert("Output Here: " + timeObj.totalToday + " :: " + timeObj.round15 + " :: " +  timeObj.valueAdded + " :: " + timeObj.nonValueAdded);
    }
    
    