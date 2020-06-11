

function drawMap(){

    var projection = d3.geo.mercator()
         .center([0, 10])
        .scale(6000)
        .translate([17470, 4480]) 
        .rotate([-180, 0]);
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#zupanijaBlok").select("svg")
    d3.json("./data/json/cro_regv3.json", function(error, cro) {
        var data = topojson.feature(cro, cro.objects.layer1);
        var states = svg.selectAll("path.county")
            .data(data.features)
            .enter()
            .append("path")
            .attr("class", "county")
            .attr("id", function(d) { return d.id; })
            .attr("d", path) .style("fill", "gray")
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("stroke-opacity", 1)
            .on("mouseover",handleMouseOverCounty)
            .on("mouseout",handleMouseOutCounty)
            .on("click",handleMouseClickOverCounty)
    });
}
function handleMouseOverCounty(d,i){
    d3.select(this)
        .style("fill", "white")
        .attr("fill-opacity",0.5)
    d3.select("#selectedCounty").html("")
    d3.select("#selectedCounty").html(countyNames[d.id])
}

function handleMouseOutCounty(d,i){
    d3.select(this)
        .style("fill", "gray")
        .attr("fill-opacity",1)
}
function handleMouseClickOverCounty(d,i){
    //d.id - ID clicked county
    $("#countyGraphType").show()
    $("#countyGraphType option[value=1]").attr("selected","selected")
    localStorage.setItem("countyID",d.id)
    handleGraphData(d.id)
    checkCountyGraphType()
}
