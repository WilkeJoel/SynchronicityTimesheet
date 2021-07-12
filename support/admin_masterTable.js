const MASTER_TICKET_TABLE_ELEMENT = 'masterTicketTable';
const myModal = new bootstrap.Modal(document.getElementById('myModal'));



// ___________________________________________________________________________
// ----------------------------------------------------------------- Listeners
// ___________________________________________________________________________
const deleteListener = () => {
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async(e) => {
            await deleteTicket(e);
        })
   });
}

const editListener = () => {
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', async(e) => {
            await editTicket(e);
        })
   });
}

 document.getElementById('saveBtn').addEventListener('click', async(e) => {
    e.preventDefault();
    await saveTicket();
})

window.addEventListener('load', async() => {
    await buildMasterTicketTable();

    deleteListener();
    editListener();
 })



// ___________________________________________________________________________
// --------------------------------------------------------- Revised Functions
// ___________________________________________________________________________
const deleteTicket = async(e) => {
    const row = e.target.parentElement.parentElement;
    const key = row.id;
    row.remove();

    await masterTicketStore.removeItem(key);
}

let editKey;

const editTicket = async(e) => {
    editKey =  e.target.parentElement.parentElement.id;

    const editCustomer = document.getElementById('Customer');
    const editTicket = document.getElementById('Ticket');
    const editSummary = document.getElementById('Summary');
    const editStatus = document.getElementById('Status');

    await masterTicketStore.getItem(editKey).then((value) => {
        editCustomer.value = value.Customer;
        editTicket.value = value.Ticket;
        editSummary.value = value.Summary;
        editStatus.value = value.Status;

        myModal.show();
    })
    .catch((err) => {
        console.log(err.message);
    });
}

const saveTicket = async() => {
    const editedTicket = {
        Customer: document.getElementById('Customer').value,
        Ticket: document.getElementById('Ticket').value,
        Summary: document.getElementById('Summary').value,
        Status: document.getElementById('Status').value
    }

    //  Delete from Table & replace
    document.getElementById(editKey).innerHTML = 
        `<td>${editedTicket.Customer}</td>
        <td>${editedTicket.Ticket}</td>
        <td>${editedTicket.Summary}</td>
        <td>${editedTicket.Status}</td>
        <td><button class="btn btn-primary edit" type="button">Edit</button></td>
        <td><button class="btn btn-primary delete">Delete</button></td>`;

    await masterTicketStore.setItem(editKey, editedTicket).then(() => {
        myModal.hide();
    })
    .catch((err) => {
        console.log(err.message);
    });
}



// ___________________________________________________________________________
// ------------------------------------------------------------- Ticket Table
// ___________________________________________________________________________

const buildMasterTicketTable = async() => {
    const tableKeys = ['Customer', 'Ticket', 'Summary', 'Status', 'Edit', 'Delete'];
    const tableElem = MASTER_TICKET_TABLE_ELEMENT;

    buildATable(tableElem);
    addTableHead(tableElem, tableKeys);

    const elem = document.getElementById(tableElem).getElementsByTagName('table')[0];
    const tbody = elem.createTBody();

    await masterTicketStore.iterate((value, key) => {
        let tr = tbody.insertRow();
        tr.setAttribute('id', key);

        tr.innerHTML = `<td>${value.Customer}</td>
                        <td>${value.Ticket}</td>
                        <td>${value.Summary}</td>
                        <td>${value.Status}</td>
                        <td><button class="btn btn-primary edit" type="button">Edit</button></td>
                        <td><button class="btn btn-primary delete">Delete</button></td>`;
    })
    .catch((err) => {
        console.log(err);
    });
}

/**
inProgressTable
toDoTable
resolvedTable

 */