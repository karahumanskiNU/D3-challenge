// @TODO: YOUR CODE HERE!
var svgWidth =960;
var svgHeight = 600;

var margin ={
    top: 20,
    right: 40,
    bottom:100,
    left: 80
};

var chartHeight = svgHeight - margin.top -margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then(function(censusdata){
    console.log(censusdata);

    censusdata.forEach(function(data){
        data.poverty = +data.poverty
        data.healthcare = +data.healthcare
    });
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusdata, d => d.poverty) * 0.9, d3.max(censusdata, d => d.poverty)*1.1])
      .range([0, chartWidth]);
        console.log(xLinearScale);
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(censusdata, d =>d.healthcare) * 0.9, d3.max(censusdata, d => d.healthcare)* 1.1])
      .range([chartHeight, 0]);
      console.log(yLinearScale);
      
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
        chartGroup.append("g")
        .call(leftAxis);
    
    var circleGroup = chartGroup.selectAll("circle")
        .data(censusdata)
        .enter()

        circleGroup
        .append("circle")
        .classed("stateCircle", true)//maybe take out??
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("opacity", ".9");
        console.log(circleGroup)
        
        circleGroup.append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy", 5)
        .text((d) => d.abbr)
        .attr("font-size", "10px")
    
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)")
        .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '6px'});

        chartGroup.append("text")
        .attr("y", chartHeight + (margin.bottom/2))
        .attr("x",(chartWidth / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("In Poverty (%)")
        .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '6px'});
});