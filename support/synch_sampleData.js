const sampleJiraCSV =
  `Issue key,IssueId,Parent IssueId,Summary,Status,Custom field (Customer)
PS-57972,451169,,[DEPLOY for PS-57967]  Hayfield: 3046.4 Upgrade - Test Front-End Output,To Do,Hayfield
PS-57913,450991,,[DEV for PS-56108]  Details section appearing incorrectly on line items,In Investigation,Paradigm Window Solutions
PS-57849,450797,,[DEV for PS-57842]  Alliance: 3046.5 FE Audit,To Do,Alliance
PS-57695,450177,,[DEPLOY for PS-57691] Deploy Harvey Sandbox Upgrade,Done,Harvey
PS-57692,450172,,[DEPLOY for PS-57691] FE Harvey Sandbox Upgrade Prep,Done,Harvey`;


const reformatedInput = [
  {
    "IssueId": "451169",
    "Status": "To Do",
    "Ticket": "PS-57972",
    "Summary": "[DEPLOY]  Hayfield: 3046.4 Upgrade - Test Front-End Output"

  },
  {
    "IssueId": "450991",
    "Status": "In Investigation",
    "Ticket": "PS-57913",
    "Customer": "PWS",
    "Summary": "[DEV]  Details section appearing incorrectly on line items"

  },
  {
    "IssueId": "450797",
    "Status": "To Do",
    "Ticket": "PS-57849",
    "Customer": "Alliance",
    "Summary": "[DEV]  Alliance: 3046.5 FE Audit"

  },
  {
    "IssueId": "450177",
    "Status": "Done",
    "Ticket": "PS-57695",
    "Customer": "Harvey",
    "Summary": "[DEPLOY] Deploy Harvey Sandbox Upgrade"

  },
  {
    "IssueId": "450172",
    "Status": "Done",
    "Ticket": "PS-57692",
    "Customer": "Harvey",
    "Summary": "[DEPLOY] FE Harvey Sandbox Upgrade Prep"

  },
];

const sampleTimes = [
  { "IssueId": "416759", "x": 1615731300000 },
  { "IssueId": "560259", "x": 1615743900000 },
  { "IssueId": "9639073", "x": 1615754040000 },
  { "IssueId": "217895", "x": 1615762800000 },
  { "IssueId": "579348", "x": 1615746120000 },
  { "IssueId": "215478", "x": 1615750500000 },
  { "IssueId": "416759", "x": 1615756320000 },
  { "IssueId": "560259", "x": 1615760520000 },
  { "IssueId": "9639073", "x": 1615733100000 },
  { "IssueId": "217895", "x": 1615735800000 },
  { "IssueId": "579348", "x": 1615738620000 },
  { "IssueId": "215478", "x": 1615741440000 },
  { "IssueId": "416759", "x": 1615732200000 },
  { "IssueId": "560259", "x": 1615752120000 },
  { "IssueId": "9639073", "x": 1615758240000 },
  { "IssueId": "217895", "x": 1615742220000 },
  { "IssueId": "579348", "x": 1615730400000 },
  { "IssueId": "215478", "x": 1615735620000 }
];

const initChoreList = [
  { "IssueId": 579348, "x": 1615730400000, "x2": 1615731300000, "duration": 15 },
  { "IssueId": 416759, "x": 1615731300000, "x2": 1615732200000, "duration": 15 },
  { "IssueId": 416759, "x": 1615732200000, "x2": 1615733100000, "duration": 15 },
  { "IssueId": 9639073, "x": 1615733100000, "x2": 1615735620000, "duration": 42 },
  { "IssueId": 215478, "x": 1615735620000, "x2": 1615735800000, "duration": 3 },
  { "IssueId": 217895, "x": 1615735800000, "x2": 1615738620000, "duration": 47 },
  { "IssueId": 579348, "x": 1615738620000, "x2": 1615741440000, "duration": 47 },
  { "IssueId": 215478, "x": 1615741440000, "x2": 1615742220000, "duration": 13 },
  { "IssueId": 217895, "x": 1615742220000, "x2": 1615743900000, "duration": 28 },
  { "IssueId": 560259, "x": 1615743900000, "x2": 1615746120000, "duration": 37 },
  { "IssueId": 579348, "x": 1615746120000, "x2": 1615750500000, "duration": 73 },
  { "IssueId": 215478, "x": 1615750500000, "x2": 1615752120000, "duration": 27 },
  { "IssueId": 560259, "x": 1615752120000, "x2": 1615754040000, "duration": 32 },
  { "IssueId": 9639073, "x": 1615754040000, "x2": 1615756320000, "duration": 38 },
  { "IssueId": 416759, "x": 1615756320000, "x2": 1615758240000, "duration": 32 },
  { "IssueId": 9639073, "x": 1615758240000, "x2": 1615760520000, "duration": 38 },
  { "IssueId": 560259, "x": 1615760520000, "x2": 1615762800000, "duration": 38 },
  { "IssueId": 217895, "x": 1615762800000, "x2": 1618187173358, "duration": 40406 }
];

const choreList = [
  { "IssueId": 579348, "y": 4, "x": 1615730400000, "x2": 1615731300000, "duration": 15 },
  { "IssueId": 416759, "y": 1, "x": 1615731300000, "x2": 1615732200000, "duration": 15 },
  { "IssueId": 416759, "y": 1, "x": 1615732200000, "x2": 1615733100000, "duration": 15 },
  { "IssueId": 9639073, "y": 2, "x": 1615733100000, "x2": 1615735620000, "duration": 42 },
  { "IssueId": 215478, "y": 5, "x": 1615735620000, "x2": 1615735800000, "duration": 3 },
  { "IssueId": 217895, "y": 3, "x": 1615735800000, "x2": 1615738620000, "duration": 47 },
  { "IssueId": 579348, "y": 4, "x": 1615738620000, "x2": 1615741440000, "duration": 47 },
  { "IssueId": 215478, "y": 5, "x": 1615741440000, "x2": 1615742220000, "duration": 13 },
  { "IssueId": 217895, "y": 3, "x": 1615742220000, "x2": 1615743900000, "duration": 28 },
  { "IssueId": 560259, "y": 0, "x": 1615743900000, "x2": 1615746120000, "duration": 37 },
  { "IssueId": 579348, "y": 4, "x": 1615746120000, "x2": 1615750500000, "duration": 73 },
  { "IssueId": 215478, "y": 5, "x": 1615750500000, "x2": 1615752120000, "duration": 27 },
  { "IssueId": 560259, "y": 0, "x": 1615752120000, "x2": 1615754040000, "duration": 32 },
  { "IssueId": 9639073, "y": 2, "x": 1615754040000, "x2": 1615756320000, "duration": 38 },
  { "IssueId": 416759, "y": 1, "x": 1615756320000, "x2": 1615758240000, "duration": 32 },
  { "IssueId": 9639073, "y": 2, "x": 1615758240000, "x2": 1615760520000, "duration": 38 },
  { "IssueId": 560259, "y": 0, "x": 1615760520000, "x2": 1615762800000, "duration": 38 },
  { "IssueId": 217895, "y": 3, "x": 1615762800000 }
];

const yAxix = [560259, 416759, 9639073, 217895, 579348, 215478];

const xAxix = [
  { "IssueId": "579348", "y": 4, "x": 1625299352000, "x2": 1625299913000 }, 
  { "IssueId": "416759", "y": 1, "x": 1625299913000, "x2": 1625301152000 }, 
  { "IssueId": "416759", "y": 1, "x": 1625301152000, "x2": 1625301944000 }, 
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
  { "IssueId": "416759", "y": 1, "x": 1625329005000, "x2": 1625330480000 }, 
  { "IssueId": "9639073", "y": 2, "x": 1625330480000, "x2": 1625331424000 }, 
  { "IssueId": "560259", "y": 0, "x": 1625331424000, "x2": 1625331799000 }, 
  { "IssueId": "217895", "y": 3, "x": 1625331799000 }
];





let sampleTimeLogArry = [
  {
    "IssueId": 560259,
    "Ticket": "PS-52096",
    "Summary": "[DEV EST for PS-47043] FE- (P13) Customer PO# Value Not Syncing",
    "Customer": "Western"
  },
  { "IssueId": 416759, "Ticket": "PS-49213", "Summary": "[DEV/PQA/QA for PS-49158] Update WebCP Theme", "Customer": "Upstate Door" },
  { "IssueId": 9639073, "Ticket": "PS-53587", "Summary": "[DEV for PS-53031] THD Reports Endpoint for Email - QA Fix - FE", "Customer": "Home Depot" },
  { "IssueId": 217895, "Ticket": "PS-48562", "Summary": "[DEPLOY for PS-52993] Login Page/Line Item Branding", "Customer": "Vector" },
  { "IssueId": 579348, "Ticket": "PS-65741", "Summary": "[DEV for PS-53031] THD Reports Endpoint for Email - FE", "Customer": "Home Depot" },
  { "IssueId": 215478, "Ticket": "PS-45741", "Summary": "[DEV for PS-54543] On opening staged orders, Omni design number is displayed instead of H order number ", "Customer": "Vector" }
];

let samplejiraTixRev2 = [
  {
    "IssueId": 560259,
    "Ticket": "PS-52096",
    "Summary": "[DEV EST for PS-47043] FE- (P13) Customer PO# Value Not Syncing",
    "Custom field (Customer)": "Western",
    "Time": {
      "date": "2021-03-27T20:39:49.400Z",
      "totalToday": 107,
      "valueAdded": 107
    }
  },
  { "IssueId": 416759, "Ticket": "PS-49213", "Summary": "[DEV/PQA/QA for PS-49158] Update WebCP Theme", "Custom field (Customer)": "Upstate Door", "Time": { "date": "2021-03-27T20:39:49.400Z", "totalToday": 62, "valueAdded": 62 } },
  {
    "IssueId": 9639073, "Ticket": "PS-53587", "Summary": "[DEV for PS-53031] THD Reports Endpoint for Email - QA Fix - FE", "Custom field (Customer)": "Home Depot", "Time": { "date": "2021-03-27T20:39:49.400Z", "totalToday": 118, "valueAdded": 118 }
  },
  {
    "IssueId": 217895, "Ticket": "PS-48562", "Summary": "[DEPLOY for PS-52993] Login Page/Line Item Branding", "Custom field (Customer)": "Vector", "Time": { "date": "2021-03-27T20:39:49.400Z", "totalToday": 18655, "valueAdded": 18655 }
  },
  {
    "IssueId": 579348, "Ticket": "PS-65741", "Summary": "[DEV for PS-53031] THD Reports Endpoint for Email - FE", "Custom field (Customer)": "Home Depot", "Time": { "date": "2021-03-27T20:39:49.400Z", "totalToday": 135, "valueAdded": 135 }
  },
  {
    "IssueId": 215478, "Ticket": "PS-45741", "Summary": "[DEV for PS-54543] On opening staged orders, Omni design number is displayed instead of H order number ", "Custom field (Customer)": "Vector", "Time": { "date": "2021-03-27T20:39:49.400Z", "totalToday": 43, "valueAdded": 43 }
  }
];

// {
//   215478: [
//     { IssueId: "215478", x: 1615735620000, x2: 1615735800000, duration: 3 },
//     { IssueId: "215478", x: 1615741440000, x2: 1615742220000, duration: 13 },
//     { IssueId: "215478", x: 1615750500000, x2: 1615752120000, duration: 27 },
//     { IssueId: "215478", x: 1619992344012, x2: 1619992346932, duration: 0 }
//   ],

//     217895: [
//       { IssueId: "217895", x: 1615735800000, x2: 1615738620000, duration: 47 },
//       { IssueId: "217895", x: 1615742220000, x2: 1615743900000, duration: 28 },
//       { IssueId: "217895", x: 1615762800000, x2: 1619992344012, duration: 70492 }
//     ],

//       416759: [
//         { IssueId: "416759", x: 1615731300000, x2: 1615732200000, duration: 15 },
//         { IssueId: "416759", x: 1615732200000, x2: 1615733100000, duration: 15 },
//         { IssueId: "416759", x: 1615756320000, x2: 1615758240000, duration: 32 }
//       ],

//         560259: [
//           { IssueId: "560259", x: 1615743900000, x2: 1615746120000, duration: 37 },
//           { IssueId: "560259", x: 1615752120000, x2: 1615754040000, duration: 32 },
//           { IssueId: "560259", x: 1615760520000, x2: 1615762800000, duration: 38 }
//         ],

//           579348: [
//             { IssueId: "579348", x: 1615730400000, x2: 1615731300000, duration: 15 },
//             { IssueId: "579348", x: 1615738620000, x2: 1615741440000, duration: 47 },
//             { IssueId: "579348", x: 1615746120000, x2: 1615750500000, duration: 73 }
//           ],

//             9639073: [
//               { IssueId: "9639073", x: 1615733100000, x2: 1615735620000, duration: 42 },
//               { IssueId: "9639073", x: 1615754040000, x2: 1615756320000, duration: 38 },
//               { IssueId: "9639073", x: 1615758240000, x2: 1615760520000, duration: 38 },
//               { IssueId: "9639073", x: 1619992346932, x2: 1619992349476, duration: 0 }
//             ],

//               9999999999: [
//                 { IssueId: "9999999999", x: 1619992349476, x2: 1619992390580, duration: 1 }
//               ]
// }
