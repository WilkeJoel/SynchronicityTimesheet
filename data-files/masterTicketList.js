let sampleMasterTicketArry = [
    { "IssueId": "560259", "Status": "To Do", "Ticket": "PS-57972", "Customer": "Hayfield", "Summary": "[DEPLOY]  Hayfield: 3046.4 Upgrade - Test Front-End Output"},
    { "IssueId": "416759", "Status": "In Investigation", "Ticket": "PS-57913", "Customer": "PWS", "Summary": "[DEV]  Details section appearing incorrectly on line items"},
    { "IssueId": "9639073", "Status": "To Do", "Ticket": "PS-57849", "Customer": "Alliance", "Summary": "[DEV]  Alliance: 3046.5 FE Audit"},
    { "IssueId": "217895", "Status": "Done", "Ticket": "PS-57695", "Customer": "Harvey", "Summary": "[DEPLOY] Deploy Harvey Sandbox Upgrade"},
    { "IssueId": "579348", "Status": "Done", "Ticket": "PS-57659", "Customer": "Home Depot", "Summary": "[DEPLOY]  FE Prep for THD Production Deploy "},
    { "IssueId": "215478", "Status": "To Do", "Ticket": "PS-57550", "Customer": "Bayer Built", "Summary": "[DEPLOY] Bayer Built - FE deploy - Upgrade PROD to 3045.6"}
];


const shortCustName = {
    "The Home Depot - US": "Home Depot",
    "Paradigm Window Solutions": "PWS",
    "American Building Supply": "ABS",
    "Upstate Door": "Upstate Door",
    "Vector Windows": "Vector",

    "Bayer Built": "Bayer Built",
    "MasterGrain": "MasterGrain",
    "Masonite": "Masonite",
    "Parksite": "Parksite",
    "Alliance": "Alliance",
    "Hayfield": "Hayfield",
    "Lowe's": "Lowe's",
    "Harvey": "Harvey",
    "Marvin": "Marvin",
    "PGT": "PGT"
}

const statusList = {
    "Status": "To Do",
    "Status": "In Investigation",
    "Status": "Done",
    "Status": "Resolved",
    "Status": "In Progress",
    "Status": "In Review",
    "Status": "QA Comp",
    "Status": "In Development",
    "Status": "PQA Comp",
    "Status": "Closed",
    "Status": "In QA",
    "Status": "Delivered"
}

const statusListWeedOut = {
    "Status": "Done",
    "Status": "Resolved",
    "Status": "QA Comp",
    "Status": "Closed",
    "Status": "Delivered"
}