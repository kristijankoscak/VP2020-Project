// -------------------- local variables
var mainHeight = 650
var mainWidth = 750

var detailValues 
var subValues1 
var subValues2 
var subValuesTotal 
var tempArray
var detailValuesType = ["Ukupno","Oranice i vrtovi","Trajni travnjaci","Trajni nasadi"]
var subValuesType = ["U prijelaznom razdoblju","Završno prijelazno razdoblje"]

function handleGraphData(id){
    detailValues = []
    subValues1 = []
    subValues2 = []
    subValuesTotal = []
    tempArray = []
    
    tempArray = countyValues[id]
    
    for(var i = 0;i< tempArray.length;i++){
        if(i == 2 || i == 5 || i == 8 || i == 11){
            i++;
        }
        if(i!=12){
            detailValues.push(tempArray[i])
        }
    }
    for(var i = 0;i< detailValues.length;i++){
        if(i%2==0){
            subValues1.push(detailValues[i])
        }
        else{
            subValues2.push(detailValues[i])
        }
    }
    for(var i = 0;i < subValues1.length;i++){
        subValuesTotal.push(subValues1[i]+subValues2[i])
    }
}

addMap()
function addMap(){
    var map = d3.select("#zupanijaBlok")
    map.append("svg")
        .attr("width",mainWidth)
        .attr("height",mainHeight)
        .style("background","none")

}

// ============================================
function addPieChart(){
    let totalValue = subValuesTotal[0]
    let values = []
    let valuesType = []
    for(var i = 1; i<subValuesTotal.length;i++){
        values.push(subValuesTotal[i])
        valuesType.push(detailValuesType[i])
    }

    $("#grafBlok").empty();
    let outerRadius = 150;
    let innerRadius = 0;

    let margin = {top: 20, bottom: 150};
    let height = mainHeight - margin.top - margin.bottom;

    let color = d3.scale.ordinal()
        .domain(valuesType)
        .range(['#c93455','#b3ad36','#bd5c33'])

    let arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    let pie = d3.layout.pie()
        .value(function(d) { return d; });

    let graphBlock = d3.select("#grafBlok")
    let pieChartSVG = graphBlock.append("svg")
        .attr("id","pieChartSVG")
        .attr("width",mainWidth)
        .attr("height",mainHeight)
        .style("background","none")
    
    let pieArcs = pieChartSVG.selectAll("g.pie")
        .data(pie(values))
        .enter()
        .append("g")
        .attr("class", "pie")
        .attr("transform", "translate(" + (mainWidth / 2) + ", " + ((mainHeight-margin.top-margin.bottom) / 2) + ")");
    pieArcs.append("path")
        .attr("fill", function(d,i) { return color(valuesType[i]); })
        .attr("d", arc)
        .on("mouseover",mouseOverPie)
        .on("mousemove",mouseMovePie)
        .on("click",mouseClickPie)
        .on("mouseout",mouseOutPie)
    
    let countyText = pieChartSVG.append("g")
        .attr("transform",function(d,i){return "translate(10,20)"})
        .append("text")
        .style("text-anchor", "center")
        .text("Županija: "+countyNames[localStorage.getItem("countyID")])    
    let totalValueText = pieChartSVG.append("g")
        .attr("transform",function(d,i){return "translate(10,40)"})
            .append("text")
            .style("text-anchor", "center")
            .text("Ukupno: "+totalValue + " ha.")    

    let pieChartLegend = pieChartSVG.selectAll("g.const")
        .data(valuesType)   
        .enter()
        .append("g")
        .attr("transform",function(d,i){return "translate(80,"+(height+30+20*i)+")"})
            .append("rect")
            .attr("height",10)
            .attr("width",10)
            .attr("fill",function(d){return color(d)})
    pieChartSVG.selectAll("g.const")
        .data(valuesType)
        .enter()
        .append("g")
        .attr("transform",function(d,i){return "translate(100,"+(height+40+20*i)+")"})
            .append("text")
            .style("text-anchor", "center")
            .text(function(d){return d})
    var pieInfo =  d3.select("#grafBlok")
        .append("div")
        .attr("id","pieInfo")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
} 


function mouseOverPie(d,i){
    d3.select(this)
        .attr("fill-opacity",0.5)
    d3.select("#pieInfo").style("opacity",1)
}   
function mouseClickPie(d,i){
    addDonutChart(i+1)
}
function mouseMovePie(d,i){
    d3.select("#pieInfo")
        .html(d.data+" ha")
        .style("left", (d3.mouse(this)[0]+300) + "px")
        .style("top", (d3.mouse(this)[1]+200) + "px")
}
function mouseOutPie(d,i){
    d3.select(this)
        .attr("fill-opacity",1)
    d3.select("#pieInfo").style("opacity",0)
}
// ============================================

function addDonutChart(id){
    d3.selectAll("#donutParts").remove()
    d3.selectAll("#donutChartLegend").remove()

    let margin = {top: 20, bottom: 150};
    let height = mainHeight - margin.top - margin.bottom;

    let values  = []
    values.push(subValues1[id])
    values.push(subValues2[id])

    let color = d3.scale.ordinal()
        .domain(subValuesType)
        .range(['#4daf4a','#377eb8'])

    let arc = d3.svg.arc()
        .innerRadius(155)
        .outerRadius(155);
    let arc1 = d3.svg.arc()
        .innerRadius(155)
        .outerRadius(180);


    let pie = d3.layout.pie()
        .value(function(d) { return d; });

    let pieChartSVG = d3.select("#grafBlok").select("svg")
    
    let pieArcs = pieChartSVG.selectAll("g.xd")
        .data(pie(values))
        .enter()
        .append("g")
        .attr("id","donutParts")
        .attr("class", "pie")
        .attr("transform", "translate(" + (mainWidth / 2) + ", " + ((mainHeight-margin.top-margin.bottom) / 2) + ")");
    pieArcs.append("path")
        .attr("fill", function(d,i) { return color(subValuesType[i]); })
        .attr("d", arc)
        .on("mouseover",mouseOverPie)
        .on("mousemove",mouseMovePie)
        .on("mouseout",mouseOutPie)

    let donutChartLegend = pieChartSVG.selectAll("g.const")
        .data(subValuesType)   
        .enter()
        .append("g")
        .attr("id","donutChartLegend")
        .attr("transform",function(d,i){return "translate(250,"+(height+30+20*i)+")"})
            .append("rect")
            .attr("height",10)
            .attr("width",10)
            .attr("fill",function(d){return color(d)})
    pieChartSVG.selectAll("g.const").data(subValuesType)
        .enter()
        .append("g")
        .attr("id","donutChartLegend")
        .attr("transform",function(d,i){return "translate(270,"+(height+40+20*i)+")"})
            .append("text")
            .style("text-anchor", "center")
            .text(function(d){return d})
    
    pieArcs.selectAll("path")
        .transition()
        .duration(200)
        .attr("d",arc1)
}

// ============================================
function addDetailedBarPlot(){
    $("#grafBlok").empty();

    let margin = {top: 20, bottom: 150, left:70, right: 20};
    let width =  mainWidth - margin.left - margin.right;
    let height = mainHeight - margin.top - margin.bottom;
    let barPadding = 4;
    let barWidth = width / 4 - barPadding;

    let color = d3.scale.ordinal()
        .domain(subValuesType)
        .range(['#4daf4a','#377eb8'])
    let x = d3.scale.ordinal()
        .domain(d3.range(detailValuesType.length))
        .rangeRoundBands([0, width]);
    let y = d3.scale.linear()
        .domain([0, d3.max(tempArray)+500])
        .range([height,0]);
    let y0 = d3.scale.linear()
        .domain([0, d3.max(tempArray)+500])
        .range([0,height]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(d, i) {return detailValuesType[i] });
    let  yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(8);

    let graphBlock = d3.select("#grafBlok")
    let barPlotSVG = graphBlock.append("svg")
        .attr("id","barPlotSVG")
        .attr("width",mainWidth)
        .attr("height",mainHeight)
        .attr("stroke","none")
        .style("background","none")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +")")
        .attr("background","gray")
        
    barPlotSVG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "translate(0,0)")
        .style("text-anchor", "center")
    barPlotSVG.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0),translate(0,-20)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "start")
        .text("ha");

    let barchartLower = barPlotSVG.selectAll("rect")
        .data(subValues1)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("height", function(d) { return height-y(0) })
        .attr("y", function(d) {return y(0)})
        .attr("width", barWidth)
        .attr("fill", color(subValuesType[0]))
        .on("mouseover",mouseOverBarPlot)
        .on("mousemove",mouseMoveBarPlot)
        .on("mouseout",mouseOutBarPlot)
    
    let barchartUpper = barPlotSVG.selectAll("rect.const")
        .data(subValues2)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("height", function(d,i) { return height-y(0)})
        .attr("y", function(d,i) {return y(subValues1[i])}) 
        .attr("width", barWidth)
        .attr("fill", color(subValuesType[1]))
        .on("mouseover",mouseOverBarPlot)
        .on("mousemove",mouseMoveBarPlot)
        .on("mouseout",mouseOutBarPlot)
    barPlotSVG.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d,i) { 
            if(i>3){
                return y(d+subValues1[i-4])
            }
            else{
                return y(d)
            } 
        })
        .attr("height", function(d){return height - y(d)})
        .delay(function(d,i){
            if(i>=3) {
                return(i*200)
            } 
            else{return(i*100)}
        })


    let totalValue = barPlotSVG.selectAll("g.const")
        .data([0,1,2,3])
        .enter()   
        .append("g") 
        .attr("transform", function(d,i){return ("translate("+(x(i)+barWidth)+","+(height-y0(subValues1[i])-y0(subValues2[i])-5)+")")})
            .append("text")
            .style("text-anchor", "end")
            .text(function(d){return (subValues1[d]+subValues2[d])})

    let barplotLegend = barPlotSVG.selectAll("g.const")
        .data(subValuesType)   
        .enter()
        .append("g")
        .attr("transform",function(d,i){return "translate(80,"+(height+50+50*i)+")"})
            .append("rect")
            .attr("height",10)
            .attr("width",10)
            .attr("fill",function(d){return color(d)})
    barPlotSVG.selectAll("g.const")
    .data(subValuesType)
    .enter()
    .append("g")
    .attr("transform",function(d,i){return "translate(100,"+(height+60+50*i)+")"})
        .append("text")
        .style("text-anchor", "center")
        .text(function(d){return d})

    var barInfo =  d3.select("#grafBlok")
        .append("div")
        .attr("id","barInfo")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
} 
    
    
function mouseOverBarPlot(d,i){
    d3.select(this)
        .attr("fill-opacity",0.5)
    d3.select("#barInfo").style("opacity",1)
}   
function mouseMoveBarPlot(d,i){
    d3.select("#barInfo")
        .html(d+" ha")
        .style("left", (d3.mouse(this)[0]) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
}
function mouseOutBarPlot(d,i){
    d3.select(this)
        .attr("fill-opacity",1)
    d3.select("#barInfo").style("opacity",0)
}

// ============================================

function addShortBarPlot(){
    let middleValue = 0;
    $("#countiesGraph").empty();
    let data = []
    countyValues.forEach(element => {
        data.push(element[2])
        middleValue+=element[2]
    });
    let margin = {top: 20, bottom: 150, left:60, right: 20};
    let width =  mainWidth - margin.left - margin.right;
    let height = mainHeight - margin.top - margin.bottom;
    let barPadding = 4;
    let barWidth = width / 21 - barPadding;

    let x = d3.scale.ordinal()
        .domain(d3.range(21))
        .rangeRoundBands([0, width]);
    let y = d3.scale.linear()
        .domain([0, d3.max(data)+2000])
        .range([height,0]);

    let graph = d3.select("#countiesGraph")
        .append("svg")
        .attr("id","shortBarPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("background-color", "none")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(d, i) {return countyNames[i] });
    let yAxis = d3.svg.axis()
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

    let barchart = graph.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return x(i); })
        .attr("height", function(d) { return height-y(0) })
        .attr("y", function(d) {return y(0)})
        .attr("width", barWidth)
        .attr("fill", "#4daf4a")
        .on("mouseover",mouseOverShortBP)
        .on("mousemove",mouseMoveShortBP)
        .on("mouseout",mouseOutShortBP)

    let linechart = graph.append("line")
        .attr("id",middleValue)
        .style("stroke", "black")
        .attr("x1", 0)
        .attr("y1", y(middleValue/21))
        .attr("x2", width)
        .attr("y2", y(middleValue/21))
    let middleValueText = graph.append("g")
        .append("text")
        .attr("transform", "translate("+width+","+(y(Math.round(middleValue/21))-10)+")")
        .style("text-anchor", "end")
        .text(Math.round(middleValue/21)+" ha");

    var barInfo =  d3.select("#countiesGraph")
        .append("div")
        .attr("id","barInfoLower")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    graph.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d,i) {return y(d)})
        .attr("height", function(d){return height - y(d)})
        .delay(function(d,i){return(i*100)})
}
function mouseOverShortBP(d,i){
    d3.select(this)
        .attr("fill-opacity",0.5)
    d3.select("#barInfoLower").style("opacity",1)
}   
function mouseMoveShortBP(d,i){
    let offset = $("#countiesGraph").width()
    d3.select("#barInfoLower")
        .html(d+" ha")
        .style("left", (d3.mouse(this)[0]+offset/4) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
}
function mouseOutShortBP(d,i){
    d3.select(this)
        .attr("fill-opacity",1)
    d3.select("#barInfoLower").style("opacity",0)
}


