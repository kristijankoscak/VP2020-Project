
$( document ).ready(function() {
    hideDetailedData()
    $("#countyGraphType").hide()
    localStorage.removeItem("countyID")
    localStorage.removeItem("lastShow")
    localStorage.removeItem("lastSort")
});

function hideDetailedData(){
    $("#countiesGraphBlock").hide()
    $("#tableDataPerCountie").hide()
}

function showTable(){
    localStorage.setItem("lastShow","Table")
    var randNumber = Math.round(Math.random() * 5)
    hideDetailedData()
    loading(randNumber)
    setDisabled()
    setTimeout(() => {
        d3.select("#spinnerBlock").select("svg").remove()
        $("#tableDataPerCountie").show()
        removeDisabled()
        $("#btnFilter").removeAttr("disabled")
    },(1500+randNumber*1500));
    rowClick()
}
function showGraph(){
    localStorage.setItem("lastShow","Graph")
    var randNumber = Math.round(Math.random() * 5)
    hideDetailedData()
    loading(randNumber)
    setDisabled()
    setTimeout(() => {
        d3.select("#spinnerBlock").select("svg").remove()
        $("#countiesGraphBlock").show()
        removeDisabled()
        addShortBarPlot()
        $("#btnFilter").removeAttr("disabled")
    },(1500+randNumber*1500));
}

$('.dropdown-menu a').click(function() {
    if($(this).parent().attr("id") == "dropDownYears"){
        var id = "#" + $(this).parent().attr("id")+"Link"
        $(id).text($(this).text())
        removeDisabled()
        drawMap()
        var countyID = localStorage.getItem("countyID")
        var lastShow = localStorage.getItem("lastShow")
        console.log(lastShow)
        if(countyID != null){
            setTimeout(() => {
                handleGraphData(countyID)
                checkCountyGraphType()
            },(500))
        }
        if(lastShow == "Table"){
            setTimeout(() => {
                checkSortType()
                rowClick()
            },(500))    
        }
        if(lastShow=="Graph"){
            setTimeout(() => {
                checkSortType()
            },(500))  
        }

    }
    if($(this).parent().attr("id") == "dropDownMainGraph"){
        var id = "#" + $(this).parent().attr("id")+"Link"
        $(id).text($(this).text())
    }
});

$('.dropdown-menu button').click(function() {
    console.log(localStorage.getItem("lastShow"))
    if(($(this).text() == "Sortiraj po abecednom redu") && localStorage.getItem("lastShow") == "Table"){
        localStorage.setItem("lastSort","Alphabet")
        sortByAlphabet()
        rowClick()
    }
    if($(this).text() == "Sortiraj po količini zemljišta" && localStorage.getItem("lastShow") == "Table"){
        localStorage.setItem("lastSort","Size")
        sortByValue()
        rowClick()
    }
    if(($(this).text() == "Sortiraj po abecednom redu") && localStorage.getItem("lastShow") == "Graph"){
        localStorage.setItem("lastSort","Alphabet")
        sortByAlphabet()
        makeSortedGrapthByAlphabet()
    }
    if($(this).text() == "Sortiraj po količini zemljišta" && localStorage.getItem("lastShow") == "Graph"){
        localStorage.setItem("lastSort","Size")
        sortByValue()
        makeSortedGrapthBySize()
    }
})
function makeSortedGrapthBySize(){
    var tempValues = []
    var tempNames = []
    for(var i = 0 ;i<valuesBySize.length;i++){
        console.log(valuesBySize[i])
        tempValues.push(valuesBySize[i][2])
        tempNames.push(countiesNameBySize[i])
    }
    setTimeout(() => {
        addShortBarPlot(tempValues,tempNames)
    },(500))
    
    console.log(tempValues)
}
function makeSortedGrapthByAlphabet(){
    var tempValues = []
    var tempNames = []
    for(var i = 0 ;i<countiesByAlphabet.length;i++){
        tempValues.push(valuesByAlphabet[i][2])
        tempNames.push(countiesByAlphabet[i])
    }
    setTimeout(() => {
        addShortBarPlot(tempValues,tempNames)
    },(500))
}

function checkSortType(){
    if(localStorage.getItem("lastSort") == "Alphabet"){
        sortByAlphabet()
        if(localStorage.getItem("lastShow")=="Graph"){
            makeSortedGrapthByAlphabet()
        }
    }
    if(localStorage.getItem("lastSort") == "Size"){
        sortByValue()
        if(localStorage.getItem("lastShow")=="Graph"){
            makeSortedGrapthBySize()
        }
    }
    if(localStorage.getItem("lastSort") == null){
        if(localStorage.getItem("lastShow")=="Graph"){
            addShortBarPlot()
        }
    }
}

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
    $("#btnFilter").attr("disabled",true) 
    
}

function rowClick(){
    $('tr').on('click', function(){
        localStorage.setItem("countyID",this.id)
        handleGraphData(this.id)
        checkCountyGraphType()
        removeChosen()
        $("#countyGraphType").show()
        $("#countyGraphType option[value=1]").attr("selected","selected")
    })
}