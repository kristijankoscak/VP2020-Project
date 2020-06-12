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
    var loadinText = spinnerSVG.append("text")
        .attr("x",blockWidth/2 -30)
        .attr("y",blockHeight-20)
        .attr("fill","black")
        .text("Loading")
}
function animateDots(circle1,circle2,circle3,iterrations){
    for(var i = 0;i<iterrations;i++){
        setTimeout(() => {animate(circle1)},(0+i*1500));
        setTimeout(() => {animate(circle2)},(500+i*1500));   
        setTimeout(() => {animate(circle3)},(1000+i*1500));  
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