let sampleTimeLogArry = [
    { "IssueId": "560259","Ticket": "PS-57972","Summary": "[DEV EST for PS-47043] FE- (P13) Customer PO# Value Not Syncing","Customer": "Loewen"},
    { "IssueId": "415459","Ticket": "PS-49213", "Summary": "[DEV/PQA/QA for PS-49158] Update WebCP Theme", "Customer": "ABC Supply" },
    { "IssueId": "9639073","Ticket": "PS-53587", "Summary": "[DEV for PS-53031] JeldWen Reports Endpoint for Email - QA Fix - FE", "Customer": "JeldWen" },
    { "IssueId": "217895","Ticket": "PS-48562", "Summary": "[DEPLOY for PS-52993] Login Page/Line Item Branding", "Customer": "Vector" },
    { "IssueId": "579348","Ticket": "PS-65741", "Summary": "[DEV for PS-53031] THD Reports Endpoint for Email - FE", "Customer": "Home Depot" },
    { "IssueId": "215478","Ticket": "PS-45741", "Summary": "[DEV for PS-54543] On opening staged orders, Omni design number is displayed instead of H order number ", "Customer": "Vector" }
];

const shortCustName = [
    { "Customer": "The Home Depot Inc", "ShortName": "Home Depot" },
    { "Customer": "Pella Corporation", "ShortName": "Pella" },
    { "Customer": "Menard Inc", "ShortName": "Menards" },
    { "Customer": "Associated Materials LLC", "ShortName": "Alside" },
    { "Customer": "ABC Supply Co.", "ShortName": "ABC" },
    { "Customer": "Andersen Corporation", "ShortName": "Andersen" },
    { "Customer": "Ply Gem Residential Solutions", "ShortName": "PlyGem" },
    { "Customer": "US LBM Holdings Inc", "ShortName": "US LBM" },
    { "Customer": "JELD-WEN Inc", "ShortName": "JeldWen" },
    { "Customer": "Simonton Windows Inc", "ShortName": "Simonton" },
    { "Customer": "Milgard Manufacturing LLC", "ShortName": "Milgard" },
    { "Customer": "Lowe’s Home Improvement", "ShortName": "Lowe’s" },
    { "Customer": "Harvey Windows & Doors", "ShortName": "Harvey" },
    { "Customer": "Loewen Windows", "ShortName": "Loewen" },
    { "Customer": "PGT Custom Windows + Doors", "ShortName": "PGT"}
];

const statusList = {
    "Status": "Backlog",
    "Status": "To Do",
    "Status": "In Progress",
    "Status": "In Development",
    "Status": "In PR Rev",
    "Status": "In QA",
    "Status": "In Review",
    "Status": "QA Pass",
    "Status": "Done",
    "Status": "Resolved",
    "Status": "Delivered"
}

const statusListWeedOut = {
    "Status": "Done",
    "Status": "Resolved",
    "Status": "QA Pass",
    "Status": "Completed",
    "Status": "Delivered"
}

const sampleChartTimes = [
    { "IssueId": "579348", "y": 4, "x": 1625299352000, "x2": 1625299913000 }, 
    { "IssueId": "415459", "y": 1, "x": 1625299913000, "x2": 1625301152000 }, 
    { "IssueId": "415459", "y": 1, "x": 1625301152000, "x2": 1625301944000 }, 
    { "IssueId": "9639073", "y": 2, "x": 1625301944000, "x2": 1625304460000 }, 
    { "IssueId": "215478", "y": 5, "x": 1625304460000, "x2": 1625308399000 }, 
    { "IssueId": "217895", "y": 3, "x": 1625308399000, "x2": 1625311016000 }, 
    { "IssueId": "579348", "y": 4, "x": 1625311016000, "x2": 1625313888000 }, 
    { "IssueId": "215478", "y": 5, "x": 1625313888000, "x2": 1625314623000 }, 
    { "IssueId": "217895", "y": 3, "x": 1625314623000, "x2": 1625316476000 }, 
    { "IssueId": "560259", "y": 0, "x": 1625316476000, "x2": 1625318610000 }, 
    { "IssueId": "579348", "y": 4, "x": 1625318610000, "x2": 1625323189000 }, 
    { "IssueId": "215478", "y": 5, "x": 1625323189000, "x2": 1625324828000 }, 
    { "IssueId": "560259", "y": 0, "x": 1625324828000, "x2": 1625326584000 }, 
    { "IssueId": "9639073", "y": 2, "x": 1625326584000, "x2": 1625329005000 }, 
    { "IssueId": "415459", "y": 1, "x": 1625329005000, "x2": 1625330480000 }, 
    { "IssueId": "9639073", "y": 2, "x": 1625330480000, "x2": 1625331424000 }, 
    { "IssueId": "560259", "y": 0, "x": 1625331424000, "x2": 1625331799000 }, 
    { "IssueId": "217895", "y": 3, "x": 1625331799000 }
];

/*
1. Andersen Windows
2. Pella Windows
3. Milgard Windows
4. Simonton Windows
5. Harvey Windows
6. Loewen Windows
7. Ply Gem Windows
8. Alside Windows
9. PGT Windows
10. Jeld Wen Windows

https://modernize.com/windows/brands


Do it Best
Building Materials Outlet
Lowe’s Home Improvement
Menard, Inc.
The Home Depot, Inc.,



ABC Supply Co.
Beacon
84 Lumber
US LBM Holdings Inc
*/