const FILE_INPUT_ELEMENT = document.getElementById('csvFileInput');
const FILE_UPLOAD_BTN = document.getElementById('uploadBtn');




// ___________________________________________________________________________
// ----------------------------------------------------------------- Listeners
// ___________________________________________________________________________

FILE_UPLOAD_BTN.addEventListener('click', () => { fileUpload(FILE_INPUT_ELEMENT); }, false);



// ___________________________________________________________________________
// ------------------------------------------------------------- File Uploader
// ___________________________________________________________________________

function fileUpload(elem) {
    const myfile = elem.files[0];

    Papa.parse(myfile, {
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: function (results, file) {
            ticketsArry = reformatInput(results.data);
            updateMasterTicketList(ticketsArry);
        }
    });
}

//  Format: samplejiraTixRev
const reformatInput = (arr) => {
    return arr.map(obj => {
        const revObj = {
            IssueId: obj['Issue id'],
            Status: obj.Status,
            Ticket: obj['Issue key'],
            Customer: obj['Custom field (Customer)'] ? shortCustName[obj['Custom field (Customer)']] : 'Unknown',
            Summary: shortenSummary(obj.Summary)
        }

        return revObj;
    })
}

function shortenSummary(str) {
    str.replace(/\s{2}/g, ' ');
    const str2 = str.indexOf('[');
    const str3 = str.indexOf(' for ');
    const str4 = str.indexOf('] ');

    if (str2 >= 0 && !!str3 && !!str4 && str3 < str4) {
        return str.substr(str2, str3).concat(str.substr(str4));
    }

    return str;
}

function updateMasterTicketList(arr) {
    arr.forEach((obj) => {
        if (obj.IssueId && obj.IssueId.length > 0) {
            masterTicketStore.getItem(obj.IssueId).then((value) => {
                if (!value) {
                    masterTicketStore.setItem(obj.IssueId, obj);
                }
                else {
                    console.log(obj.IssueId + ' ERROR: Trying to add a duplicate ticket to the Master List');
                }
            });
        }
    })
   // setupSynchronicityTimesheet();
}
