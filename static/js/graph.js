queue()
    .defer(d3.json, "/fishingUK/projects")  //get data from hosted API (flask)
    .await(makeGraphs);

function makeGraphs(error, fishingUKProject) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean Projects data
    var dateFormat = d3.time.format("%d/%m/%Y");
    fishingUKProject.forEach(function (d) {
        d["date"] = dateFormat.parse(d["date"]);
        d["date"].setDate(1);
        d["quantity"] = +d["quantity"];
        d["value"] = +d["value"];
    });


    //Create a Crossfilter instance
    var ndx = crossfilter(fishingUKProject);

      //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date"];
    });
    var fishTypeDim = ndx.dimension(function (d) {
        return d["fish_type"];
    });
    var regionDim = ndx.dimension(function (d) {
        return d["region"];
    });
    var portDim = ndx.dimension(function (d) {
        return d["main_port"];
    });
    var fishNameDim = ndx.dimension(function (d) {
        return d["fish_name"];
    });


        //Calculate metrics for graphs
    var numFishByDate = dateDim.group();
    var numFishByType = fishTypeDim.group();
    var numFishByRegion = regionDim.group();
    var numFishByPort = portDim.group();
    var totalFishNameByValue = fishNameDim.group().reduceSum(function (d) {
        return d["value"];
    });
    var fishGroup = fishNameDim.group();


    var all = ndx.groupAll();

    var totalFishValue = ndx.groupAll().reduceSum(function (d) {
        return d["value"];
    });

      var fishQuantity = ndx.groupAll().reduceSum(function (d) {
        return d["quantity"];
    });

    //Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["date"];
    var maxDate = dateDim.top(1)[0]["date"];



    //Charts
    var yearChart = dc.lineChart("#year-chart");
    var fishTypeChart = dc.rowChart("#fish-type-row-chart");
    var portChart = dc.pieChart("#port-row-chart");
    var totalFishAmount = dc.numberDisplay("#total-fish-value");
    var regionChart = dc.pieChart("#region-chart");
    var selectField = dc.selectMenu('#menu-select');
    var quantityChart = dc.numberDisplay ("#total-fish-quantity");



    selectField
        .dimension(fishNameDim)
        .group(fishGroup);


      totalFishAmount
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalFishValue)
        .formatNumber(d3.format(".3s"));



        yearChart
        .ordinalColors(["#80bfff"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .dimension(dateDim)
        .group(numFishByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxisLabel ("Tonnes")
        .yAxis().ticks(6);



       fishTypeChart
        .ordinalColors(["#00cc99", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(fishTypeDim)
        .group(numFishByType)
        .xAxis().ticks(4);

        portChart
        .ordinalColors(["#00cc99", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(portDim)
        .group(numFishByPort);


        regionChart
        .ordinalColors(["#00cc99", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(regionDim)
        .group(numFishByRegion);

        quantityChart
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(fishQuantity)
        .formatNumber(d3.format(",d"));

  dc.renderAll();

}