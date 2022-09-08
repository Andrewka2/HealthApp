export function calendarDataNormalize(data) {
    let resultObj = {};
    resultObj[data[0].date] = [];
    data.forEach((elem, i) => {
        if(resultObj.hasOwnProperty(elem.date)){
            resultObj[elem.date].push(elem);
        }else{
            resultObj[elem.date] = [];
        } 
    })
    return resultObj
}