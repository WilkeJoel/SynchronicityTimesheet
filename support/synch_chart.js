



const buildChart = async () => {
    const timeArray = [];
    const issueIdArray = [];

    await timeLogStore.iterate((value, key) => {
        const idx = issueIdArray.indexOf(value.IssueId);
    
        idx < 0 ? issueIdArray.push(value.IssueId) : null;

        timeArray.push(value);

    }).then(() => {

        Highcharts.chart('container', {
            chart: {
                type: 'xrange'
            },
            title: {
                text: ''
            },
            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            category = point.yCategory,
                            from = new Date(point.x),
                            to = new Date(point.x2);
                        return ix + '. ' + category + ', ' + from.toDateString() +
                            ' to ' + to.toDateString() + '.';
                    }
                }
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: ''
                },
                categories: issueIdArray,
                reversed: true
            },
            series: [{
                name: 'Project 1',
                // pointPadding: 0,
                // groupPadding: 0,
                borderColor: 'gray',
                pointWidth: 20,
                data: timeArray,

                dataLabels: {
                    enabled: true
                }
            }]
        });
    })
    .catch((err) => {
        console.log(err);
    });

    // console.log("init: " + initialize());
    // console.log("getkeys: " + getKeys());
  //  setInterval(fiveMinInterval, 1000 * 15 * 1);
}

//  setInterval(fiveMinInterval, 1000*60*5);



function fiveMinInterval() {
    //  alert("Last one: " +  JSON.stringify(xAxis[xAxis.length - 1]));

    xAxis[xAxis.length - 1].x2 = Date.now();

    //  alert("Last one Again: " +  JSON.stringify(xAxis[xAxis.length - 1]));

}
