
const addModal = new bootstrap.Modal(document.getElementById('addModal'));



// ___________________________________________________________________________
// ----------------------------------------------------------------- Listeners
// ___________________________________________________________________________
const TICKET_SELECT_ELEMENT = document.getElementById('ticketSelect');
TICKET_SELECT_ELEMENT.addEventListener('change', () => { addTicketToTable(TICKET_SELECT_ELEMENT); }, false);

document.getElementById('addTicketButton').addEventListener('click', () => { addModal.show()}, false);
document.getElementById('formAdd').addEventListener('click', (e) => { saveNewTicket(e) }, false);

const addTimeListener = () => {
    document.querySelectorAll('.addTime').forEach(button => {
        button.addEventListener('click', async(e) => { 
            await addTaskStartTime(e);
        })
   });
}




// ___________________________________________________________________________
// ----------------------------------------------------------- Dropdown Select
// ___________________________________________________________________________
const buildTicketSelectDropDown = async() => {
    await masterTicketStore.iterate((value, key) => {
        const elem = document.createElement('option');
        const textNode = document.createTextNode(`${value.Customer} :: ${value.Ticket} ${value.Summary.substr(0, 50)}`);

        elem.appendChild(textNode);
        elem.setAttribute('value', key);
        TICKET_SELECT_ELEMENT.appendChild(elem);
    })
    .catch((err) => {
        console.log(err);
    });
}

function disableSelectOption(optList, idx) {
    optList.options[idx].disabled = true;
}

const buildSortedTicketSelectDropDown = async() => {
    const OPT_TICKET_SELECT_ELEMENT = document.getElementById('optTicketSelect');



    await masterTicketStore.iterate((value, key) => {
        if (value.Status === 'To Do'){

            const elem = document.createElement('li');
            elem.innerHTML = `<a class="dropdown-item" href="#">${value.Customer} :: ${value.Ticket} ${value.Summary.substr(0, 50)}</a>`
           
           
           // const textNode = document.createTextNode(`${value.Customer} :: ${value.Ticket} ${value.Summary.substr(0, 50)}`);
        



            //elem.appendChild(textNode);

            OPT_TICKET_SELECT_ELEMENT.appendChild(elem);
        }
        

        
    })
    .catch((err) => {
        console.log(err);
    });
}



// ___________________________________________________________________________
// ---------------------------------------------------- Input Table Operations
// ___________________________________________________________________________
//  Add ticket to input table from dropdown
const addTicketToTable = async (elem) => {
    const option = await dailyTicketStore.getItem(elem.value);
    const ticket = await masterTicketStore.getItem(elem.value);

    if (!option && ticket) {
        await dailyTicketStore.setItem(elem.value, ticket);

        disableSelectOption(TICKET_SELECT_ELEMENT, elem.selectedIndex);
        buildInputTable();
    }
    else {
        if (option) {
            alert('ERROR 1: Trying to add a duplicate ticket to the TICKET_LOG_ARRY');
        }
        if (!ticket) {
            alert('ERROR 2: Ticket does not exist');
        }
    }
};

//  Add ticket to Master List & add to input table
async function saveNewTicket(){
    const newTicket ={
        IssueId: document.getElementByid('formIssueId').value,
        Customer: document.getElementByid('formCustomer').value,
        Ticket: document.getElementByid('formTicket').value,
        Summary: document.getElementByid('formSummary').value,
        Status: document.getElementByid('formStatus').value
    };

    await masterTicketStore.setItem(newTicket.IssueId, newTicket).then(() => {
        addTicketToTable(newTicket.IssueId);
        addModal.hide();
    })
    .catch((err) => {
        console.log(err);
    });
}
