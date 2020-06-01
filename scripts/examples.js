var height = 400
addMap(height)
addGraph(height)

function addMap(height){
    var map = d3.select("#zupanijaBlok")
    var width = $("#zupanijaBlok").outerWidth()
    map.append("svg")
        .attr("width",width)
        .attr("height",height)
        .style("background","lightblue")

}

function addGraph(height){
    var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    var width = $("#grafBlok").outerWidth()
    var graph = d3.select("#grafBlok")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .style("background","lightblue")

    var barchart = graph.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return height*0.08 * i; })
        .attr("y", function(d) { return height - d * 15; })
        .attr("width", height*0.04)
        .attr("height", function(d) { return d * 15; })
        .attr("fill", "blue");
}



/* var barchart = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) { return 50 * i; })
    .attr("y", function(d) { return height - d * 50; })
    .attr("width", 40)
    .attr("height", function(d) { return d * 50; })
    .attr("fill", "blue"); */
