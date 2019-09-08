var graphData, allValues, tmp
var drow = (data_, linetype) => {
    var data = data_
    graphData = data_
    d3.select("svg").remove();
    var width = window.innerWidth - 440;
    var height = window.innerHeight - 250;
    var margin = 25;
    
    var lineOpacity = "0.7";
    
    
    allValues = data.reduce(( fullArr, d) => fullArr.concat(d.lineData), [])
   /* Scale */
    var xScale = d3.scaleTime()
        .domain([0, 9])
        .range([0, (width)]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(allValues), d3.max(allValues)])
        .range([0, height]);
    
    var colorArr = d3.scaleOrdinal(d3.schemeCategory10);
    var color = (d, i) => {
        var radios = document.getElementsByName('coloryze');
        var selected;
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                selected  = radios[i].value
                break;
            }
        }
        if(!selected) return 'steelblue';
        var arr = []
        for(var l = 0; l < drowDropdowns[selected].options.length; l++){
            arr.push(drowDropdowns[selected].options[l].value)
        }
        if(!d.data)  return 'steelblue';
        tmp = [arr, colorArr(arr.indexOf(d.data[selected])), arr.indexOf(d.data[selected]), d.data[selected]]//,d, selected, drowDropdowns[selected], d.data[selected]]
        // console.log(tmp)
        return colorArr(arr.indexOf(d.data[selected]))
    }
    
    /* Add SVG */
    var svg = d3.select("#chart").append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        .append('g')
        // .attr("transform", `translate(${150}, ${margin})`);
    
        // /* Add sieverts into SVG */
        
        var line = d3.line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(d));
        
    
    
    let lines = svg.append('g').attr('class', 'liness');
    
    lines.selectAll('.line-group')
        .data(data).enter()
        // .append('g')
        // .attr('class', 'line-group')  
        .append('path')
            .attr('class', 'line')
            .attr('stroke', (d, i) => color(d, i))
            .attr('d', d => line(d.lineData))
            // .attr('name', d => d.data.NarrID)
            // .attr('name', d => console.log(d.data))
            .style('opacity', .7)
            .style('stroke-width', 1.5)
            // .style('stroke-linecap', "round")
            // .style('fill', "none")
    
    let linesHov = svg.append('g').attr('class', 'lines-hov');
            
    linesHov.selectAll('.line-hov-group')
        .data(data).enter()
        // .append('g')
        // .attr('class', 'line-group')  
        .append('path')
        // .attr('class', 'line-hov')  
        .attr('d', d => line(d.lineData))
        .style('opacity', 0)
            .style('stroke-width', 6)
            .style('fill', "none")
            .style('stroke', (d, i) => color(i))
            .on("mouseover", (d) => hover(d))
            .on("mouseout", (d) => out(d))
            .on("click", (d) => show(d));
            
    return
    // let labels = svg.append('g').attr('class', 'labels');

    // labels.selectAll('.labels')
    //     .data(data).enter()
    //     .append('g')    
    //         .append("text")
    //         .attr("class", "label-text")
    //         .attr("height", 30)
    //         .attr("width", 200)
    //         .style("fill", (d, i) => color(i))        
    //         .text(d => d.name)
    //         // .attr("text-anchor", "middle")
    //         .attr("y", (d, i) => 30 * i )
    //         .attr("x", width - 180)
            // .on("mouseover", (d) => hover(d))
            // .on("mouseout", (d) => out(d));
        
    // let circles = svg.append('g')
    //         .attr('class', 'circles');

    // /* Add circles in the line */
    // circles.selectAll("circles")
    //     .data(data).enter()
    //     .append("g")
    //     .attr("class", "circle")
    //     .style("fill", (d, i) => color(i))
    //     .selectAll("circle")
    //     .data(d => d.sieverts).enter()
    //     .append("g")
    //     .append("circle")
    //     .attr("cx", d => xScale(d.date))
    //     .attr("cy", d => yScale(d.sievert))
    //     .attr("r", circleRadius)
    //     .attr('sievert-name', d => d.name)
    //     .style('opacity', circleOpacity)
    
    
    
    // /* Add Axis into SVG */
    // var xAxis = d3.axisBottom(xScale).ticks(5);
    // var yAxis = d3.axisLeft(yScale).ticks(5);
    
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", `translate(0, ${height-margin})`)
    //     .call(xAxis)
    //     .selectAll('text')
    //         .attr("transform", "translate(-10,10)rotate(-45)")
    //         .style("text-anchor", "end")
    //         .style("font-size", 20)
    //         .style("fill", "rgb(76, 77, 77)");
    
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis)
        
}

var show = (d) => {
    
    // alert(d.data.Experience)
    var msg = '';
    Object.keys(d.data).forEach(m => {
        msg += m + ': ' + d.data[m] + '\n'
    })
    alert(msg)
    // console.log(d)
}
     
var hover = (d) => {
    // console.log(d)
    d3.selectAll('.line').filter(line => line.data.NarrID != d.data.NarrID)
                    .style('opacity', .1);
    d3.selectAll('.line').filter(line => line.data.NarrID == d.data.NarrID)
                    .style('stroke-width', 3);
    // d3.selectAll('.label-text').filter(line => line.name != d.name)
    //             .style('opacity', .1);
    // d3.selectAll('.circle').filter(line => line.name != d.name)
    //             .style('opacity', .1);
}
var out = (d) => {
    d3.selectAll(".line").style('opacity', .9).style('stroke-width', 1.5);
    // d3.selectAll(".line").style('opacity', .9);
    // d3.selectAll(".label-text").style('opacity', .9);
    // d3.selectAll(".circle").style('opacity', .9);
}
// +row['3.0 Example-Working'],+row['3.0 Example-Sleeping'],+row['3.0 Example-Preparing/consuming food'],
const mapToChartData = row => ({ lineData: [+row['3.6 You did not act/do something because you…-Feared for your safety'],+row['3.6 You did not act/do something because you…-Believed it was not your job/place'],+row['3.6 You did not act/do something because you…-Did not know how to help'],+row['3.2 You did something because you-Could rely on support of public services'],+row['3.2 You did something because you-Felt responsible for dealing with it'],+row['3.2 You did something because you-Knew what to do/how to help'],+row['3.7 You decided to act/not act the way you did because-You did not have a choice'],+row['3.7 You decided to act/not act the way you did because-To you it was the right thing to do'],+row['3.7 You decided to act/not act the way you did because-It was an appropriate/acceptable thing to do']], data: row})

let globalData
d3.csv('./undp_ipv_ge_6Sept19-undp_ipv_ge_21Aug19.csv')
    .then(csv => {
        globalData = csv
        buildDropdowns(csv)
        drow(csv.map(mapToChartData))
    })


const buildDropdowns = (data) => {
    const columns = [ '2.1 Are you related to/do you know either the victim or the perpetrator?','2.2 How is the victim related to the perpetrator?','2.3 What is the age category of the victim?','2.5 What is the gender of the perpetrator?','2.6 Where did this situation happen?','2.8 Where did this situation happen?','3.1 Did you act/do something about this situation?','3.5 Have you contacted any services about this situation?','4.1 The outcome of this situation for the victim was…','4.2 Situations like these…','5.1 If you were to witness a similar situation in the future you would…','6.5 Education','6.1 Gender','6.2 Age','6.6 Marital status','6.3 Ethnicity','6.7 Monthly income','6.4 Attendance of religious services','6.8 Region of residence','6.11 Region originally from','6.9 Residence','6.10 How long have you lived here for?' ]
    options = {}
    columns.forEach(col => options[col] = [])
    data.forEach( row => {
        columns.forEach(col => {
            if(options[col].indexOf(row[col]) === -1) {
                options[col].push(row[col])
            }
        })
    })

    columns.forEach(col => {
        drowDropdown(col, options[col])
    })
}

const drowDropdowns = {}
const drowDropdown = (col, options) => {

    var form = document.getElementsByTagName('form')[0]
    
    var radio = document.createElement('input')
    radio.setAttribute('type', 'radio')
    radio.setAttribute('name', 'coloryze')
    radio.setAttribute('value', col)
    $(radio).on('change', filter)

    form.appendChild(radio)

    var select= document.createElement('select')
    
    select.setAttribute("multiple", "multiple")
    
    // console.log(select)
    form.appendChild(select)
    
    options.forEach(opt => {
        var option = document.createElement('option')    
        option.setAttribute("value", opt)
        option.innerHTML = opt
        select.appendChild(option)
    })
    

    $(select).multiselect({includeSelectAllOption: false, nonSelectedText: col, enableFiltering: false , enableClickableOptGroups: true});

    $(select).on('change', filter)
    drowDropdowns[col] = select;
}

const filter = () => {
    drow(Object.keys(drowDropdowns)
        .reduce((globalDataReduced,drowDropdownName) => 
            globalDataReduced.filter(row => !$(drowDropdowns[drowDropdownName]).val() || $(drowDropdowns[drowDropdownName]).val().indexOf(row[drowDropdownName]) !== -1)
        , globalData)
        .map(mapToChartData))
}