var countyValues = []
var countyNames = []
function handleData(year){
    $.getJSON(getPath(year), function(json) {
        var counties = Object.values(json.zupanije)
        var unformatedValues = Object.values(json.value)
        var formatedValues = formatData(unformatedValues)
        $("#tableData").empty();
        saveData(formatedValues,counties)
        fillTable(counties,formatedValues)
    }); 
    
}
var valuesBySize
var countiesNameBySize
function sortByValue(){
    var originalValues = []
    for(var i = 0; i < countyValues.length;i++){
        originalValues.push(countyValues[i])
    }
    var temp = []
    for(var i =0; i<countyValues.length;i++){
        temp.push(originalValues[i][2])
    }
    temp.sort(function(a,b){return b-a})
    console.log(temp)
    console.log(originalValues)
    console.log(originalValues.length)
    valuesBySize = []
    countiesNameBySize = []
    for(var i = 0 ;i<temp.length;i++){          //  loop through biggest nummbers
        for(var j = 0 ;j<temp.length;j++){      //  loop through array of arrays
            console.log(originalValues[j].includes(temp[i]))
            if(originalValues[j][2]== temp[i]){
                valuesBySize.push(originalValues[j])
                countiesNameBySize.push(countyNames[j])
            }
        }
    }
    $("#tableData").empty();
    fillTable(countiesNameBySize,valuesBySize)
    console.log(countiesNameBySize)
    console.log(valuesBySize)
}

var countiesByAlphabet
var valuesByAlphabet 
function sortByAlphabet(){
    valuesByAlphabet = []
    var originalCountyNames = []
    for(var i = 0; i < countyNames.length;i++){
        originalCountyNames.push(countyNames[i])
    }
    countiesByAlphabet = letterSort("cro",originalCountyNames)
    for(var i=0;i<countiesByAlphabet.length;i++){
        var countyID = countyNames.indexOf(countiesByAlphabet[i])
        console.log(countyID)
        valuesByAlphabet.push(countyValues[countyID])
    }
    $("#tableData").empty();
    fillTable(countiesByAlphabet,valuesByAlphabet)
}
function letterSort(lang, letters) {
    letters.sort(new Intl.Collator(lang).compare);
    return letters;
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
    for(var i = 0; i< counties.length ; i++){
        var element =   "<tr class=tableCounty id="+countyNames.indexOf(counties[i])+"><th>"+counties[i]+"</th>"+
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


