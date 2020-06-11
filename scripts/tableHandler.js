var countyValues = []
var countyNames = []
function handleData(year){
    $.getJSON(getPath(year), function(json) {
        /* console.log(Object.values(json.value)) */
        var counties = Object.values(json.zupanije)
        var unformatedValues = Object.values(json.value)
        var formatedValues = formatData(unformatedValues)
        $("#tableData").empty();
        saveData(formatedValues,counties)
        fillTable(counties,formatedValues)
        addShortBarPlot(countyValues,counties)
    }); 
    
}

function saveData(dataValues,dataNames){
    countyValues = dataValues
    countyNames = dataNames
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


