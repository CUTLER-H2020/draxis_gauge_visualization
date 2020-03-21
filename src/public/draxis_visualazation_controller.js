// import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';
import { uiModules } from 'ui/modules';
// import * as am4core from '../node_modules/@amcharts/amcharts4/core';
// import * as am4charts from '../node_modules/@amcharts/amcharts4/charts';
// get the kibana/kbn_radar module, and make sure that it requires the "kibana" module if it
// import './scripts/charts';
// import './scripts/core';
require('./scripts/core');
require('./scripts/charts');
// didn't already
const module = uiModules.get('kibana/draxis_visualazation', ['kibana']);

// add a controller to tha module, which will transform the esResponse into a
// tabular format that we can pass to the table directive
module.controller('KbnRadarVisController', function(
  $scope,
  $element,
  $timeout,
  Private
) {
  // const tabifyAggResponse = Private(AggResponseTabifyProvider);
  $scope.$watch('esResponse', function(resp) {
    if (resp) {
      $scope.updateDates();

      setTimeout(() => {
        $scope.$apply();
      }, 1000);

      if ($scope.chart) {
        $scope.prepareData();
        // $scope.calculatePollutan();
      }
      // $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
    }
  });

  $scope.prepareData = () => {
    $scope.startedDatePollutant = $scope.esResponse.rows.filter(row => {
      let date = row['col-0-2'];
      if (typeof(date) == 'string') {
        return parseInt(date) === parseInt($scope.startDate);
      } else {
        // date is already int (number)
        return date === parseInt($scope.startDate);        
      }
      // return row['col-0-2'] === parseInt($scope.startDate);
    })[0];

    $scope.endDatePollutant = $scope.esResponse.rows.filter(row => {
      let date = row['col-0-2'];
      if (typeof(date) == 'string') {
        return parseInt(date) === parseInt($scope.endDate);
      } else {
        // date is already int (number)
        return date === parseInt($scope.endDate);        
      }
      // return row['col-0-2'] === parseInt($scope.endDate);
    })[0];

    $scope.calculatePollutan();
  };

  $scope.calculatePollutan = () => {
    const value =
      $scope.startedDatePollutant['col-1-1'] /
      $scope.endDatePollutant['col-1-1'];

    const parsedValue = parseInt(value * 100);

    $scope.hand.value = parsedValue > 200 ? 200 : parsedValue;
    $scope.label.text = parsedValue;
  };

  $scope.updateDates = () => {
    $scope.availableDates = $scope.esResponse.rows.map(row => {
      // In order this plugin to work properly
      // it requires the date to be numbers. 
      // In our new indices some they have the 'year' field as int/float and other as string
      // We should handle this situation so as it works in either case
      let date = row['col-0-2'];
      if (typeof(date) == 'string') {
        return parseInt(date);
      } else {
        // date is already int (number)
        return date;        
      }
    });

    $scope.availableDates.sort().reverse();

    if (!$scope.startDate) {
      $scope.startDate = $scope.availableDates[0];
      $scope.endDate = $scope.availableDates[0];
    }
  };

  $timeout(function() {
    $scope.startDate = null;
    $scope.endDate = null;
    //DOM has finished rendering
    // am4core.useTheme(am4themes_animated);
    // Themes end
    $scope.availableDates = [];
    // create chart
    $scope.chart = am4core.create(
      `chartdiv_${$scope.$id}`,
      am4charts.GaugeChart
    );
    $scope.chart.innerRadius = am4core.percent(82);
    $scope.updateDates();
    /**
     * Normal axis
     */

    let axis = $scope.chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 200;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 100;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add('text', function(text) {
      return parseInt(text) === 100 ? text : '';
    });
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
      'background'
    );
    axis.renderer.grid.template.strokeOpacity = 0.3;
    axis.renderer.minGridDistance = 500;

    /**
     * Axis for ranges
     */

    const colorSet = new am4core.ColorSet();

    const axis2 = $scope.chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 200;
    axis.strictMinMax = true;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    const range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 100;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = '#2E8B57';
    colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;

    const range1 = axis2.axisRanges.create();
    range1.value = 100;
    range1.endValue = 200;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = '#FF0800';
    colorSet.getIndex(0);
    range1.axisFill.zIndex = -1;

    /**
     * Label
     */

    $scope.label = $scope.chart.radarContainer.createChild(am4core.Label);
    $scope.label.isMeasured = false;
    $scope.label.fontSize = 45;
    $scope.label.x = am4core.percent(50);
    $scope.label.y = am4core.percent(100);
    $scope.label.horizontalCenter = 'middle';
    $scope.label.verticalCenter = 'bottom';
    $scope.label.text = '30';

    /**
     * Hand
     */

    $scope.hand = $scope.chart.hands.push(new am4charts.ClockHand());
    $scope.hand.axis = axis2;
    $scope.hand.innerRadius = am4core.percent(20);
    $scope.hand.startWidth = 10;
    $scope.hand.pin.disabled = true;
    $scope.hand.value = 30;

    $scope.hand.events.on('propertychanged', function(ev) {
      range0.endValue = 100;
      range1.value = 100;
      axis2.invalidate();
    });

    $scope.prepareData();
  });
});
