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
