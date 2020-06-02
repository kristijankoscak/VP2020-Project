var countyValues = []
function handleData(year){
    $.getJSON(getPath(year), function(json) {
        /* console.log(Object.values(json.value)) */
        var counties = Object.values(json.zupanije)
        var unformatedValues = Object.values(json.value)
        var formatedValues = formatData(unformatedValues)
        var randNumber = Math.round(Math.random() * 5)
        loading(randNumber)
        $("#tableData").empty();
        setTimeout(() => {
            d3.select("#spinnerBlock").select("svg").remove()
            fillTable(counties,formatedValues)
        },(1500+randNumber*1500));
        saveData(formatedValues)
        addGraph(countyValues,counties)
    }); 

}

function saveData(data){
    countyValues = data
}
function getCountyValues(){
    return countyValues
}
function getPath(year){
    var path = "data/json/EP22_HR_" + year + ".json"
    return path;

}

function formatData(data){
    var unformatedData = data
    var formatedData = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    var size = 0;
    var x = 0;
    var temp = 0;
    for(var i = 0;i< unformatedData.length ;i++){
        if(x==3){x=0;size++;}
        if(size==21){size=0;}
        formatedData[size].push(unformatedData[i])
        x++;  
    }  
    return formatedData
}

function fillTable(counties,values){
    /* $("#tableData").empty(); */
    for(var i = 0; i< counties.length ; i++){
        var element =   "<tr><th>"+counties[i]+"</th>"+
                        "<td>"+ values[i][0]+"</td>"+
                        "<td>"+ values[i][1] +"</td>"+
                        "<td>"+ values[i][2] +"</td>"+
                        "<td>"+ values[i][3] +"</td>"+
                        "<td>"+ values[i][4] +"</td>"+
                        "<td>"+ values[i][5] +"</td>"+
                        "<td>"+ values[i][6] +"</td>"+
                        "<td>"+ values[i][7] +"</td>"+
                        "<td>"+ values[i][8] +"</td>"+
                        "<td>"+ values[i][9] +"</td>"+
                        "<td>"+ values[i][10] +"</td>"+
                        "<td>"+ values[i][11] +"</td></tr>";
        
        $("#tableData").append(element)
    } 
}

function loading(randNumber){
    var blockHeight =100 //100
    var blockWidth = 300 //300
    var spinnerBlock = d3.select("#spinnerBlock")  
    var spinnerSVG = spinnerBlock.append("svg")
        .style("margin-left","auto")
        .style("margin-right","auto")
        .attr("id","spinnerSVG")
        .attr("width", blockWidth)
        .attr("height", blockHeight)
    var circle1 = spinnerSVG.append("circle")
        .attr("cx", blockWidth/2-30)
        .attr("cy", blockHeight/2)
        .attr("r",10)
        .style("fill", "black")
    var circle2 = spinnerSVG.append("circle")
        .attr("cx", blockWidth/2)
        .attr("cy", blockHeight/2)
        .attr("r",10)
        .style("fill", "black")  
    var circle3 = spinnerSVG.append("circle")
        .attr("cx", blockWidth/2+30)
        .attr("cy", blockHeight/2)
        .attr("r",10)
        .style("fill", "black")
        animateDots(circle1,circle2,circle3,randNumber)
}
function animateDots(circle1,circle2,circle3,iterrations){
    for(var i = 0;i<iterrations;i++){
        setTimeout(() => {animate(circle1)},(500+i*1500));
        setTimeout(() => {animate(circle2)},(1000+i*1500));   
        setTimeout(() => {animate(circle3)},(1500+i*1500));  
    }
}
function animate(circle){
    circle.transition()
    .duration(250)
    .attr("r",15)
    .transition()
    .duration(250)
    .attr("r",10)
}