var chart = AmCharts.makeChart( "chartdatausage", {
  "type": "pie",
  "theme": "light",
  "titles": [ {
    "text": "",
  } ],
  "dataProvider": [ {
    "Type": "International calls",
    "calls": 7252
  }, {
    "Type": "Operator calls",
    "calls": 3882
  }, {
    "Type": "Domestic calls",
    "calls": 1809
  }],
  "valueField": "calls",
  "titleField": "Type",
  "depth3D": 15,
    "outlineAlpha": 0.4,
    "radius": "30%",
  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
  "angle": 30,
  "export": {
    "enabled": true
  },
  "responsive": {
    "enabled": true
  },
} );


var chart = AmCharts.makeChart( "chartdatausage2", {
  "type": "pie",
  "theme": "light",
  "dataProvider": [ {
    "title": "International calls",
    "value": 7252
  }, {
    "title": "Operator calls",
    "value": 3882
  } ,{
    "title": "Domestic calls",
    "value": 1809
  }],
  "titleField": "title",
  "valueField": "value",
  "labelRadius": 5,

  "radius": "42%",
  "innerRadius": "60%",
  "labelText": "[[title]]",
  "export": {
    "enabled": true
  }
} );




var chart = AmCharts.makeChart("datausage_stackedchartdiv", {
    "type": "serial",
    "theme": "dark",
    "marginRight":30,
    "legend": {
        "equalWidths": false,
        "periodValueText": "total: [[value.sum]]",
        "position": "top",
        "valueAlign": "left",
        "valueWidth": 100
    },
    "dataProvider": [{
        "date": 1,
        "internationalcall": 1,
        "operatorcall": 6,
        "domesticcall": 10
    }, {
        "date": 2,
        "internationalcall": 0,
        "operatorcall": 3,
        "domesticcall": 8
    }, {
        "date": 3,
        "internationalcall": 5,
        "operatorcall": 3,
        "domesticcall": 6
    }, {
        "date": 4,
        "internationalcall": 8,
        "operatorcall": 10,
        "domesticcall": 15
    }, {
        "date": 5,
        "internationalcall": 8,
        "operatorcall": 8,
        "domesticcall": 12
    }, {
        "date": 6,
        "internationalcall": 6,
        "operatorcall": 2,
        "domesticcall": 10
    }, {
        "date": 7,
        "internationalcall": 9,
        "operatorcall": 2,
        "domesticcall": 10
    },{
        "date": 8,
        "internationalcall": 12,
        "operatorcall": 10,
        "domesticcall": 16
    },{
        "date": 9,
        "internationalcall": 12,
        "operatorcall": 10,
        "domesticcall": 18
    },{
        "date": 10,
        "internationalcall": 24,
        "operatorcall": 16,
        "domesticcall": 22
    },{
        "date": 11,
        "internationalcall": 19,
        "operatorcall": 22,
        "domesticcall": 21
    },{
        "date": 12,
        "internationalcall": 19,
        "operatorcall": 26,
        "domesticcall": 30
    },{
        "date": 13,
        "internationalcall": 19,
        "operatorcall": 8,
        "domesticcall": 15
    },{
        "date": 14,
        "internationalcall": 8,
        "operatorcall": 12,
        "domesticcall": 18
    },{
        "date": 15,
        "internationalcall": 10,
        "operatorcall": 8,
        "domesticcall": 14
    },{
        "date": 16,
        "internationalcall": 0,
        "operatorcall": 0,
        "domesticcall": 6
    },{
        "date": 17,
        "internationalcall": 13,
        "operatorcall": 4,
        "domesticcall": 15
    },{
        "date": 18,
        "internationalcall": 6,
        "operatorcall": 6,
        "domesticcall": 6
    },{
        "date": 19,
        "internationalcall": 1,
        "operatorcall": 1,
        "domesticcall": 7
    },{
        "date": 20,
        "internationalcall": 3,
        "operatorcall": 2,
        "domesticcall": 3
    },{
        "date": 21,
        "internationalcall": 2,
        "operatorcall": 2,
        "domesticcall": 2
    },{
        "date": 22,
        "internationalcall": 0,
        "operatorcall": 0,
        "domesticcall": 1
    },{
        "date": 23,
        "internationalcall": 2,
        "operatorcall": 1,
        "domesticcall": 4
    },{
        "date": 24,
        "internationalcall": 6,
        "operatorcall": 5,
        "domesticcall": 8
    },{
        "date": 25,
        "internationalcall": 48,
        "operatorcall": 42,
        "domesticcall": 50
    },{
        "date": 26,
        "internationalcall": 26,
        "operatorcall": 25,
        "domesticcall": 32
    },{
        "date": 27,
        "internationalcall": 16,
        "operatorcall": 12,
        "domesticcall": 18
    },{
        "date": 28,
        "internationalcall": 9,
        "operatorcall": 8,
        "domesticcall": 18
    },

    {
        "date": 29,
        "internationalcall": 13,
        "operatorcall": 10,
        "domesticcall": 17
    }, {
        "date": 30,
        "internationalcall": 10,
        "operatorcall": 12,
        "domesticcall": 16
    }, {
        "date": 31,
        "internationalcall": 38,
        "operatorcall": 30,
        "domesticcall": 42
    }],
    "valueAxes": [{
        "stackType": "regular",
        "gridAlpha": 0.07,
        "position": "left",
        "title": "Data Usage"
    }],
    "graphs": [{
        "balloonText": "<span style='font-size:14px; color:#000000;'>International calls-<b>[[value]]</b></span>",
        "fillAlphas": 0.6,
        "hidden": true,
        "lineAlpha": 0.4,
        "title": "International calls",
        "valueField": "internationalcall"
    }, {
        "balloonText": "<span style='font-size:14px; color:#000000;'>Operator calls-<b>[[value]]</b></span>",
        "fillAlphas": 0.6,
        "lineAlpha": 0.4,
        "title": "Operator calls",
        "valueField": "operatorcall"
    }, {
        "balloonText": "<span style='font-size:14px; color:#000000;'>Domestic calls-<b>[[value]]</b></span>",
        "fillAlphas": 0.6,
        "lineAlpha": 0.4,
        "title": "Domestic calls",
        "valueField": "domesticcall"
    }],
    "plotAreaBorderAlpha": 0,
    "marginTop": 10,
    "marginLeft": 0,
    "marginBottom": 0,
    "chartScrollbar": {},
    "chartCursor": {
        "cursorAlpha": 0
    },
    "categoryField": "date",
    "categoryAxis": {
        "startOnAxis": true,
        "axisColor": "#DADADA",
        "gridAlpha": 0.07,
        "title": "Jan 2017",
        "guides": [{
            category: "2001",
            toCategory: "2003",
            lineColor: "#CC0000",
            lineAlpha: 1,
            fillAlpha: 0.2,
            fillColor: "#CC0000",
            dashLength: 2,
            inside: true,
            labelRotation: 90,
            label: ""
        }, {
            category: "2007",
            lineColor: "#CC0000",
            lineAlpha: 1,
            dashLength: 2,
            inside: true,
            labelRotation: 90,
            label: ""
        }]
    },
    "export": {
      "enabled": true
     }
});