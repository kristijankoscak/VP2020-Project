var mainHeight = 550
var mainWidth = 750
addMap()

function addMap(){
    var map = d3.select("#zupanijaBlok")
    map.append("svg")
        .attr("width",mainWidth)
        .attr("height",mainHeight)
        .style("background","lightblue")

}
function addGraph(countyData,counties){
    var middleValue = 0;
    var middleValueArray = []
    $("#grafBlok").empty();
    var data = []
    countyData.forEach(element => {
        data.push(element[2])
        middleValue+=element[2]
    });
    for(var i=0;i<21;i++){
        middleValueArray.push(middleValue/21)
    }
    var margin = {top: 20, bottom: 150, left:60, right: 20};
    var width =  mainWidth - margin.left - margin.right;
    var height = mainHeight - margin.top - margin.bottom;
    var barPadding = 4;
    var barWidth = width / 21 - barPadding;

    var x = d3.scale.ordinal()
        .domain(d3.range(21))
        .rangeRoundBands([0, width]);
    var y = d3.scale.linear()
        .domain([0, d3.max(data)+2000])
        .range([height,0]);
    var graphColor = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0.3,1]);
    var valueline = d3.svg.line()
        .interpolate("linear")
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d); })

    var graph = d3.select("#grafBlok")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("background-color", "lightblue")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(d, i) {return counties[i] });
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(8);
    graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-50),translate(-10,-10)")
        //.attr("transform", "translate(0,0)")
        .style("text-anchor", "end")
    graph.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Hektara");

    var barchart = graph.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("y", y) 
        .attr("height", function(d) { return height - y(d); })
        .attr("width", barWidth)
        .attr("fill", "green")
        .on("mouseover",handleMouseOver)
        .on("mouseout",handleMouseOut)
    var linechart = graph.append("path")
        .attr("class", "line")
        .attr("d", valueline(middleValueArray))
        .attr("fill","none")
        .style("stroke", "black");
}

function handleMouseOver(d,i){
    var mouseCords = d3.mouse(this)
    var x = mouseCords[0]+80
    var y = mouseCords[1]+20
    if (i>18){x = mouseCords[0]-20}

    d3.select(this)
        .attr("fill-opacity",0.5)

    var graphSvg = d3.select("#grafBlok").select("svg")
    var gElement = graphSvg.append("g")
        .attr("class", "y axis")    
        .attr("id","countyInfo")
        .style("stroke","black")   
    var text = gElement.append("text")
        .attr("x",x)
        .attr("y",y)
        .text(d + " ha")
}
function handleMouseOut(d,i){
    d3.select(this)
        .attr("fill-opacity",1)
    d3.select("#countyInfo").remove()
}
