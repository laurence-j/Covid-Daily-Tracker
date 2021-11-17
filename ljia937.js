const showHome = (info) => {
    document.getElementById("Home").style.display = "block";
    document.getElementById("Timeline").style.display = "none";
    document.getElementById("Infographics").style.display = "none";
    
    document.getElementById("HomeTab").style.backgroundColor = "grey";
    document.getElementById("TimelineTab").style.backgroundColor = "transparent";
    document.getElementById("InfographicsTab").style.backgroundColor = "transparent";

    const homeTable = document.getElementById("homeTable");
    let tableContent = "";

    const addHome = (record) => {
        tableContent += 
        "<tr><td> 🤒 Cases: " + record.total_cases + "</td><td> 😊 Recovered: " + record.total_recovered +"</td><td> 😵 Unresolved: " + record.total_unresolved + "</td><td> ☠️ Deaths: " 
        + record.total_deaths + "</td><tr><td> 🤢 New Cases: " + record.total_new_cases_today + "</td><td> 👻 New Deaths: " 
        + record.total_new_deaths_today + "</td><td> 🤧 Active Cases: " + record.total_active_cases + "</td><td> 🤒 Serious Cases: " + record.total_serious_cases + "</td>" ;
    }
    
    info.forEach(addHome)
    homeTable.innerHTML = tableContent;
}

const getHome = () => {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTotal=NZ',
    {
        headers : {
            "Accept" : "application/json",
        },   
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showHome(data.countrydata));
}

window.onload = getHome;

const showTimeline = (timeline) => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Timeline").style.display = "block";
    document.getElementById("Infographics").style.display = "none";
    
    document.getElementById("HomeTab").style.backgroundColor = "transparent";
    document.getElementById("TimelineTab").style.backgroundColor = "grey";
    document.getElementById("InfographicsTab").style.backgroundColor = "transparent";

    const timelineTable = document.getElementById("timelineTable");
    const latestDate = document.getElementById("latest-date");
    let tableContent = "";
    
    Object.keys(timeline).forEach(key =>{ 
    let data = timeline[key];
    
        if (key != "stat"){
            tableContent += 
            "<tr><td><br><b>"+ key +": </b><br></td><td><br> New Cases: " 
            + data.new_daily_cases + "<br></td><td><br> New Deaths: " + data.new_daily_deaths + "<br></td><td><br> Total Cases: " + data.total_cases 
            + "<br></td><td><br> Total Recoveries: " + data.total_recoveries + "<br></td><td><br> Total Deaths: " + data.total_deaths + "<br></td>";
        }         

        timelineTable.innerHTML = tableContent;
    });
    value = Object.keys(timeline);
    
    latestDate.innerHTML = value[value.length-2];
}

const getTimeline = () => {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ',
    {
        headers : {
            "Accept" : "application/json",
        },   
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showTimeline(data.timelineitems["0"]));
}

const showInfographics = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Timeline").style.display = "none";
    document.getElementById("Infographics").style.display = "block";
    
    document.getElementById("HomeTab").style.backgroundColor = "transparent";
    document.getElementById("TimelineTab").style.backgroundColor = "transparent";
    document.getElementById("InfographicsTab").style.backgroundColor = "grey";
}

const getInfographics = () => {

    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ',
    {
        headers : {
            "Accept" : "application/json",
        },   
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => createGraph(data.timelineitems["0"])); 
}

const createGraph = (data) => {
    const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    Dict = Object.keys(data);

    var value = [];
    value.push(data[Dict[Dict.length -2]].new_daily_cases);
    value.push(data[Dict[Dict.length -3]].new_daily_cases);
    value.push(data[Dict[Dict.length -4]].new_daily_cases);
    value.push(data[Dict[Dict.length -5]].new_daily_cases);
    value.push(data[Dict[Dict.length -6]].new_daily_cases);
    value.push(data[Dict[Dict.length -7]].new_daily_cases);
    value.push(data[Dict[Dict.length -8]].new_daily_cases);
    SVG.setAttribute("viewBox", "0 10 500 200");
    
    for(let i = 0; i< value.length; i++){
        for(let j = 0; j < (value[i]); j++ ){
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", ( (j/10)*120 + 40));
        circle.setAttribute("cy", (i*20) + 20) ;
        circle.setAttribute("r", "5");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("fill", "red");
        SVG.appendChild(circle) ;
    }

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '8.5');
        text.setAttribute('y', (i*20)+21.5);
        text.setAttribute('fill', 'black');
        text.setAttribute('font-size', '5');
        text.textContent = "Day " + (i+1) + ":";
        SVG.appendChild(text);

        document.getElementById("Graph").appendChild(SVG)
        document.getElementById('info').innerHTML = "<b>Day 1 (" + Dict[Dict.length -2] + "): </b>" + value[0] + " cases  &nbsp<b>Day 2 (" + Dict[Dict.length -3] + "): </b>" + value[1] + " cases &nbsp <b>Day 3 (" + Dict[Dict.length -4] + "):</b> " + value[2] + " cases &nbsp <b> Day 4 (" +
        Dict[Dict.length -5] + "):</b> " + value[3] + " cases &nbsp <b> Day 5: (" + Dict[Dict.length -6] + "): </b>" + value[4] + " cases  &nbsp <b> Day 6: (" + Dict[Dict.length -7] + "): </b>" + value[5] + " <b>cases &nbsp Day 7 (" +
        Dict[Dict.length -8] + "): </b>" + value[6] + " cases" 

    }
}

getInfographics();