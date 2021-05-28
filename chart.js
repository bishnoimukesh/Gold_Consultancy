$(document).ready(function(){
    const fetchParams = {
        method: 'GET',
        mode: 'cors',
    };

    const url = "https://fsapi.gold.org/api/v11/charts/goldprice/inr/grams/1520258770139,1614953170141";

    // fetch(url, fetchParams)̥.then(data => {
    //     console.log(data.result);
    // })



    // JSC.Chart('chartDiv', {
    //    type: 'horizontal column',
    //    series: [
    //       {
    //          name:'Andy',
    //          points: [
    //             {x: 'Apples', y: 50},
    //             {x: 'Oranges', y: 32}
    //          ]
    //       },{
    //          name:'Anna',
    //          points: [
    //             {x: 'Apples', y: 30},
    //             {x: 'Oranges', y: 22}
    //          ]
    //       }
    //    ]
    // });

    fetch(url, fetchParams)
    .then(res => {
        if (!res.ok) {
          console.log("error")
        }
        return res.json();
    })
    .then(
        data => {
            const result = data.chartData.INR;
            // console.log(result);
            let price = [];
            let time = [];
            // val jsvData = JSC.csv2Json(result);
            // console.log("jsvData : " + jsvData)
            for(i in result) {
                // console.log(result[i]);
                time.push(new Date(result[i][0]))
                price.push(result[i][1])
            }
            // result.forEach(function (res){
            //     response.push(res.INR[0])
            // })


            am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                var chart = am4core.create("chartdiv", am4charts.XYChart);

                var data = [];
                for(i in result){
                  var date = new Date(result[i][0]);
                  date.setHours(0,0,0,0);
                  // date.setDate(i);
                  var value = result[i][1];
                  data.push({date:date, value: value});
                }

                chart.data = data;

                // Create axes
                var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.minGridDistance = 50;

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                // Create series
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "value";
                series.dataFields.dateX = "date";
                series.tooltipText = "{value}"

                series.tooltip.pointerOrientation = "vertical";

                chart.cursor = new am4charts.XYCursor();
                chart.cursor.snapToSeries = series;
                chart.cursor.xAxis = dateAxis;

                chart.scrollbarY = new am4core.Scrollbar();
                chart.scrollbarX = new am4core.Scrollbar();
                }
            ); // end am4core.ready()




            // var chartOneData = {
            //     type: "line",
            //     title: {
            //         text: "Fetch + REST API Endpoint Demo",
            //         adjustLayout: true
            //     },
            //     scaleX: {
            //         item: {
            //         angle: '-45'
            //         }
            //     },
            //     scaleY: {
            //         item: {
            //             angle: '45'
            //         }
            //     },
            //     series: [
            //         {
            //             values : price
            //         }
            //     ],
            //     // data: [
            //     // xValueFormatString: "MMM YYYY",
            //     // yValueFormatString: "$#,##0.00"
            //     // ],
            //     plotarea: {
            //         margin: 'dynamic'
            //     }
            //     // slider: {
            //     //     minimum: new Date(2018, 04, 01),
            //     //     maximum: new Date(2020, 06, 01)
            //     //   }
            // };
            // zingchart.render({
            //     id: 'chart-one',
            //     data: chartOneData,
            //     height: '100%',
            //     width: '100%'
            // }); 
        }
    )
})