
$( document ).ready(function() {
    hideDetailedData()
    $("#countyGraphType").hide()
});



function hideDetailedData(){
    $("#countiesGraphBlock").hide()
    $("#tableDataPerCountie").hide()
}

function showTable(){
    var randNumber = Math.round(Math.random() * 5)
    hideDetailedData()
    loading(randNumber)
    setDisabled()
    setTimeout(() => {
        d3.select("#spinnerBlock").select("svg").remove()
        $("#tableDataPerCountie").show()
        removeDisabled()
    },(1500+randNumber*1500));
}
function showGraph(){
    var randNumber = Math.round(Math.random() * 5)
    hideDetailedData()
    loading(randNumber)
    setDisabled()
    setTimeout(() => {
        d3.select("#spinnerBlock").select("svg").remove()
        $("#countiesGraphBlock").show()
        removeDisabled()
        addShortBarPlot()
    },(1500+randNumber*1500));
}

$('.dropdown-menu a').click(function() {
    if($(this).parent().attr("id") == "dropDownYears"){
        var id = "#" + $(this).parent().attr("id")+"Link"
        $(id).text($(this).text())
        removeDisabled()
        drawMap()
    }
    if($(this).parent().attr("id") == "dropDownMainGraph"){
        var id = "#" + $(this).parent().attr("id")+"Link"
        $(id).text($(this).text())
    }
});

function checkCountyGraphType(){
    if($("#countyGraphType :selected").text() =="Kružni graf"){
        $("#barPlotSVG").remove() 
        addPieChart()    
    } 
    if($("#countyGraphType :selected").text() =="Stupčasti graf"){
        $("#pieChartSVG").remove() 
        addDetailedBarPlot()
    } 
}

$("#countyGraphType").change(function() {
    checkCountyGraphType()
});

function removeDisabled(){
    $("#btnShowTable").removeAttr("disabled")
    $("#btnShowGraph").removeAttr("disabled")
}
function setDisabled(){
    $("#btnShowTable").attr("disabled",true)
    $("#btnShowGraph").attr("disabled",true) 
}