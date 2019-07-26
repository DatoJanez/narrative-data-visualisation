var graphData, allValues
var drow = (data_, linetype) => {
    var data = data_
    graphData = data_
    d3.select("svg").remove();
    var width = screen.width - 100;
    var height = screen.height - 200;
    var margin = 80;
    
    var lineOpacity = "0.7";
    
    
    allValues = data.reduce(( fullArr, d) => fullArr.concat(d), [])
   /* Scale */
    var xScale = d3.scaleTime()
        .domain([0, 9])
        .range([0, (width-margin) - 200]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(allValues), d3.max(allValues)])
        .range([0, height-margin]);
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    /* Add SVG */
    var svg = d3.select("#chart").append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        .append('g')
        .attr("transform", `translate(${150}, ${margin})`);
    
        // /* Add sieverts into SVG */
        
        var line = d3.line()
            .x((d, i) => xScale(i))
            .y((d, i) => yScale(d));
        
    
    
    let lines = svg.append('g').attr('class', 'lines');
    
    lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')  
        .append('path')
            .attr('class', 'line')  
            .attr('d', d => line(d))
            // .style('stroke', (d, i) => color(i))
            // .style('opacity', lineOpacity)
            // .style('stroke-width', 1.5)
            // .style('stroke-linecap', "round")
            // .style('fill', "none")
    
    return
    // let linesHov = svg.append('g').attr('class', 'lines-hov');

    // linesHov.selectAll('.line-hov-group')
    //     .data(data).enter()
    //     .append('g')
    //     .attr('class', 'line-group')  
    //     .append('path')
    //         .attr('class', 'line-hov')  
    //         .attr('d', d => line(d.sieverts))
    //         .style('opacity', 0)
    //         .style('stroke-width', 6)
    //         .style('fill', "none")
    //         .style('stroke', (d, i) => color(i))
            // .on("mouseover", (d) => hover(d))
            // .on("mouseout", (d) => out(d));

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


     
var hover = (d) => {
    d3.selectAll('.line').filter(line => line.name != d.name)
                    .style('opacity', .1);
    d3.selectAll('.label-text').filter(line => line.name != d.name)
                .style('opacity', .1);
    d3.selectAll('.circle').filter(line => line.name != d.name)
                .style('opacity', .1);
}
var out = (d) => {
    d3.selectAll(".line").style('opacity', .9);
    d3.selectAll(".label-text").style('opacity', .9);
    d3.selectAll(".circle").style('opacity', .9);
}

const mapToChartData = row => [+row['T3UseOfCSWillDependOn-Time'], +row['T3UseOfCSWillDependOn-Leadership'], +row['T3UseOfCSWillDependOn-Resources'], +row['T1CSHelpedTo-ObtainKnowledge'], 
+row['T1CSHelpedTo-ImproveSkills'], +row['T1CSHelpedTo-ChangeAttitude'], +row['T2CSupportWas-Timely'], +row['T2CSupportWas-Clear'], +row['T2CSupportWas-Relevant']]

let globalData
d3.csv('./dataset-csscan.csv')
    .then(csv => {
        globalData = csv
        buildDropdowns(csv)
        drow(csv.map(mapToChartData))
    })


const buildDropdowns = (data) => {
    const columns = [ 'Modality', 'Q1Feeling', 'Q2CSFocus', 'Q3CSTopic', 'Q4ModeOfDelivery', 'Q3dModeOfDelivery', 'Q3cModeOfDelivery', 'Q3bModeOfDelivery', 'Q5aExpectations', 'Q6Project', 'Q6bProjectName', 'DQ3Institution', 'DQ2Role', 'DQ2Other', 'DQ5Country', 'DQ4Region', 'DQ6Gender', 'DQ7Age' ]
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