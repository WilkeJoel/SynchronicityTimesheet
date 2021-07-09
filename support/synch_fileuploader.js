const FILE_INPUT_ELEMENT = document.getElementById('csvFileInput');
const FILE_UPLOAD_BTN = document.getElementById('uploadBtn');

FILE_UPLOAD_BTN.addEventListener('click', () => { fileUpload(FILE_INPUT_ELEMENT); }, false);



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

// function typedArrayToURL(data, mimeType) {
//     return URL.createObjectURL(new Blob([data], { type: mimeType }))
// }

// const downloadToFile = (content, filename, contentType) => {
//     const mimeType = 'application/json';
//     const jsonContent = JSON.stringify(content, null, 2);
//     const url = typedArrayToURL(jsonContent, mimeType);
//     const link = document.createElement('a');

//     link.href = url;
//     link.download = filename;
//     link.click();

//     URL.revokeObjectURL(url);

//     alert('Finished with downloading file');
// };

// function searchTest(val) {
//     const ticket = _.find(MASTER_TICKET_ARRY, { 'props.Ticket': val });

//     alert('Search: ' + ticket);
// }

// function enterNewTicket(e) {
//     e.preventDefault();
//     let myArr = [];
//     const inputs = ADD_TICKET_FORM.elements;
//     const myObj = {};

//     if (!inputs.formIssueId.value) {
//         const ticket = _.find(masterTixArr, { 'IssueId': elem.value });

//         const tempId = Date.now().toString();

//         newTime = Date.now();
//         //= 13
//     }
//     else {
//         myobj.IssueId = inputs.formIssueId.value; // Most likely NOT available
//     }

//     const ticket = _.find(masterTixArr, { 'IssueId': elem.value });

//     myObj.Ticket = inputs.formTicket.value;
//     myObj.Summary = shortenSummary(inputs.formSummary.value);
//     myObj.Customer = shortCustName(inputs.formCustomer.value);

//     //TODO::  if IssueId is blank -------------------------------------------------------------------------------

//     myobj.IssueId = 1969;
//     myObj.Ticket = 'JW-Joel';
//     myObj.Customer = 'Wilke';
//     myObj.Summary = 'I want my MTV.';

//     myArr.push(myObj);

//     //setupTicketSelect(myArr);

//     //updateMasterTicketList(myArr);

//     //MASTER_TICKET_ARRY.push(myObj);
// };
