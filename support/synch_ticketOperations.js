const addModal = new bootstrap.Modal(document.getElementById('addModal'));



// ___________________________________________________________________________
// ----------------------------------------------------------------- Listeners
// ___________________________________________________________________________
const TICKET_SELECT_ELEMENT = document.getElementById('ticketSelect');
TICKET_SELECT_ELEMENT.addEventListener('change', () => { addTicketToTable(TICKET_SELECT_ELEMENT); }, false);

document.getElementById('addTicketButton').addEventListener('click', () => { addModal.show() }, false);
document.getElementById('formAdd').addEventListener('click', (e) => { saveNewTicket(e) }, false);

const addTimeListener = () => {
    document.querySelectorAll('.addTime').forEach(button => {
        button.addEventListener('click', async (e) => {
            await addTaskStartTime(e);
        })
    });
}

const customOptionListener = () => {
    document.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', (e) => {
            revAddTicketToTable(e)
        }, false);
    });
};


function revAddTicketToTable(e) {
    alert("Element: " + e.target.dataset.value);
}


for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', async (e) => {
        if (!this.classList.contains('disabled')) {
            alert("Element: " + e.target.dataset.value);

            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('disabled');
            // this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
};




// ___________________________________________________________________________
// ----------------------------------------------------------- Dropdown Select
// ___________________________________________________________________________
const buildTicketSelectDropDown = async () => {
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

const buildSortedTicketDropDown = async () => {
    const optTicketSelectElem = document.getElementById('dropdownMenu');
    const statuses = ['Current', 'Future', 'Past'];
    const currentArr = ['To Do', "In Progress", "In Development"];
    const futureArr = ["Backlog", "In PR Rev", "In QA", "In Review", "QA Pass"];

    for (let x in statuses) {
        const ul = document.createElement('UL');
        ul.setAttribute('id', (statuses[x]));

        const li = document.createElement('li');
        li.innerHTML = `<h6 class="dropdown-header">${statuses[x]} Tickets</h6>`;
        ul.appendChild(li);

        optTicketSelectElem.appendChild(ul);
    }

    const currentParent = document.getElementById('Current');
    const futureParent = document.getElementById('Future');
    const pastParent = document.getElementById('Past');

    await masterTicketStore.iterate((value, key) => {
        const elem = document.createElement('li');
        elem.innerHTML = `<a class="dropdown-item" href="#">${value.Customer} :: ${value.Ticket} ${value.Summary.substr(0, 50)}</a>`

        if (currentArr.includes(value.Status)) {
            currentParent.appendChild(elem);
        }
        else if (futureArr.includes(value.Status)) {
            futureParent.appendChild(elem);
        }
        else {
            pastParent.appendChild(elem);
        }
    })
        .catch((err) => {
            console.log(err);
        });
}

const revBuildSortedTicketDropDown = async () => {
    const revOptTicketSelectElem = document.getElementById('dropdownMenu');
    const statuses = ['Current', 'Future', 'Past'];
    const currentArr = ['To Do', "In Progress", "In Development"];
    const futureArr = ["Backlog", "In PR Rev", "In QA", "In Review", "QA Pass"];

    for (let x in statuses) {
        const ul = document.createElement('UL');
        ul.setAttribute('id', (statuses[x]));

        const li = document.createElement('li');
        li.innerHTML = `<h6 class="dropdown-header">${statuses[x]} Tickets</h6>`;
        ul.appendChild(li);

        revOptTicketSelectElem.appendChild(ul);
    }

    const currentParent = document.getElementById('Current');
    const futureParent = document.getElementById('Future');
    const pastParent = document.getElementById('Past');

    await masterTicketStore.iterate((value, key) => {
        const elem = document.createElement('li');
        const textNode = document.createTextNode(`${value.Customer} :: ${value.Ticket} ${value.Summary.substr(0, 50)}`);

        elem.appendChild(textNode);
        elem.setAttribute('class', 'custom-option dropdown-item');
        elem.setAttribute('data-value', key);

        if (currentArr.includes(value.Status)) {
            currentParent.appendChild(elem);
        }
        else if (futureArr.includes(value.Status)) {
            futureParent.appendChild(elem);
        }
        else {
            pastParent.appendChild(elem);
        }
    }).then(() => {
        customOptionListener();
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
async function saveNewTicket() {
    const newTicket = {
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







// ___________________________________________________________________________
// ---------------------------------------------------- Test Area
// ___________________________________________________________________________
