const INPUT_TABLE_ID = 'inputTable';
const OUTPUT_TABLE_ID = 'outputTable';


// ___________________________________________________________________________
// -------------------------------------------------------------------- Shared
// ___________________________________________________________________________
const buildATable = (id) => {
    const elem = document.getElementById(id);
    elem.innerHTML='';

    const tbl = document.createElement('table');
    tbl.classList.add('table', 'table-striped', 'table-sm');
    elem.appendChild(tbl);
}

const addTableHead = (id, arrHeadData) => {
    if (!arrHeadData) return;

    const elem = document.getElementById(id).getElementsByTagName('table')[0];
    const thead = elem.createTHead();
    const tr = thead.insertRow();

    arrHeadData.forEach(val => {
        const th = document.createElement('th');
        th.textContent = val;
        tr.appendChild(th);
    });
}



// ___________________________________________________________________________
// --------------------------------------------------------- Build Input Table
// ___________________________________________________________________________
function insertBtnGroup() {
    return `<div class="input-group">
        <button class="btn btn-primary addTime" type="button">Now</button>
        <input type="time" class="form-control" aria-label="Time Now">
        </div>`;
}

async function createInputTableBody(tblElem) {
    const elem = document.getElementById(tblElem).getElementsByTagName('table')[0];
    const tbody = elem.createTBody();

    await dailyTicketStore.iterate((value, key) => {
        let tr = tbody.insertRow();
        tr.setAttribute('id', key);

        tr.innerHTML = `<td>${value.Customer}</td>
                        <td><a href="https://portal.myparadigm.com/browse/${value.Ticket}" target="_blank">${value.Ticket}</a></td>
                        <td>${value.Summary}</td>
                        <td>${insertBtnGroup()}</td>`;
    })
    .catch((err) => {
        console.log(err);
    });
}



function buildInputTable() {
    const tableKeys = ['Customer', 'Ticket', 'Summary', 'Action'];  //  'Time', 
    const tableElem = INPUT_TABLE_ID;

    buildATable(tableElem);
    addTableHead(tableElem, tableKeys);

    createInputTableBody(tableElem);
    //createInputTableFoot(tableElem, tableKeys);
}




// ___________________________________________________________________________
// -------------------------------------------------------- Build Output Table
// ___________________________________________________________________________
async function createOutputTableBody(tblElem) {
    const elem = document.getElementById(tblElem).getElementsByTagName('table')[0];
    const tbody = elem.createTBody();

    await dailyTicketStore.iterate((value, key) => {
        if (!value || !value.Time) { return };

        let tr = tbody.insertRow();
        tr.setAttribute('id', (key + 'output'));  //  ???  Need Id?

        updateOutputTableRow((key + 'output'), value);
    })
}

function buildOutputTableFoot(tblElem) {
    const elem = document.getElementById(tblElem).getElementsByTagName('table')[0];
    const tfoot = elem.createTFoot();
    const tr = tfoot.insertRow();
    tr.setAttribute('id', ('outputTotal'));

    updateOutputTableFoot('outputTotal', outputTotal);
}


async function buildOutputTable() {
    const tableKeys = ['Customer', 'Ticket', 'Total (min)', 'Round', 'Diff (min)', 'Val Add', 'Non-VA'];
    const tableElem = OUTPUT_TABLE_ID;

    buildATable(tableElem);
    addTableHead(tableElem, tableKeys);
    createOutputTableBody(tableElem);
    buildOutputTableFoot(tableElem);

    // add input listeners
    outputTableListeners();
}

const updateOutputTableFoot = (id, val) => {
    document.getElementById(id).innerHTML = 
        `<td></td>
        <td>Daily Total: </td>
        <td><input type="number" step="1" class="form-control form-control-sm totalT" value="${val.totalToday}"></input></td>
        <td><input type="number" class="form-control form-control-sm roundT" disabled value="${val.roundToday}"></input></td>
        <td><input type="number" class="form-control form-control-sm diffT" disabled value="${val.diffToday}"></input></td>
        <td><input type="number" step=".25" class="form-control form-control-sm totalVA" value="${val.valueAdded}"></input></td>
        <td><input type="number" step=".25" class="form-control form-control-sm totalNVA" value="${val.nonValueAdded}"></input></td>`;
}

const updateOutputTableRow = (id, val) => {
    document.getElementById(id).innerHTML = 
        `<td>${val.Customer}</td>
        <td><a href="https://portal.myparadigm.com/browse/${val.Ticket}">${val.Ticket}</a> ${val.Summary}</td>
        <td><input type="number" class="form-control form-control-sm editT" value="${val.Time.totalToday}"></input></td>
        <td><input type="text" class="form-control form-control-sm editR" value="${val.Time.round15}" disabled></input></td>
        <td><input type="text" class="form-control form-control-sm editD" value="${val.Time.totalToday - (val.Time.round15 * 60)}" disabled ></input></td>
        <td><input type="number" class="form-control form-control-sm editVA" value="${val.Time.valueAdded}" step=".25" max="${val.Time.round15}" min="0"></input></td>
        <td><input type="number" class="form-control form-control-sm editNVA" value="${val.Time.nonValueAdded}" step=".25" max="${val.Time.round15}" min="0"></input></td>`;
}