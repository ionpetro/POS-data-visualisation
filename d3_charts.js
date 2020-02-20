// initial cluster to display

var cluster = 'Dairy'; 

      // charts size
      var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      var tooltip = d3.select("body").append("div").attr("class", "toolTip");

      // _______________
      // Values Barchart
      // _______________

      const values_svg = d3.select('#values_barchart')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr("transform",  "translate(" + margin.left + "," + margin.top + ")");
      
      // initialize promise
      var pos = d3.csv('data/average_basket.csv');
      pos.then(function (data) {

      // X axis
        var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(function(d) { return d.cluster; }))
          .padding(0.2);
        values_svg.append("g")
          .attr('class', 'axis-text')
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleLinear()
          .domain([0, 25])
          .range([height, 0]);
        values_svg.append("g")
          .attr('class', 'axis')
          .call(d3.axisLeft(y));

        
        // Bars
        values_svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
            .attr('x', function(d) {return x(d.cluster); })
            // .attr('y', function(d) {return y(d.avalue); })
            .attr('width', x.bandwidth())
            // .attr('height', function(d) {return height - y(d.avalue); })
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); })
            .attr('fill', '#4285F4')
            .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.avalue));
            })
    		    .on("mouseout", function(d){ tooltip.style("display", "none");});

          // Chart Title
          values_svg.append('text')
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "20px") 
            .text("Average Basket Value per Cluster");


          // Animation
          values_svg.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("y", function(d) { return y(d.avalue); })
            .attr("height", function(d) { return height - y(d.avalue); })
            .delay(function(d, i){return(i*100)})

      // _______________
      // Units Barchart
      // _______________

      const units_svg = d3.select('#units_barchart')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr("transform",  "translate(" + margin.left + "," + margin.top + ")");

        // X axis

        var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(function(d) { return d.cluster; }))
          .padding(0.2);
        units_svg.append("g")
          .attr('class', 'axis-text')
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        // Y axis

        var y = d3.scaleLinear()
          .domain([0, 12])
          .range([height, 0]);
        units_svg.append("g")
          .attr('class', 'axis')
          .call(d3.axisLeft(y));
        
        // Bars

        units_svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
            .attr('x', function(d) {return x(d.cluster); })
            // .attr('y', function(d) {return y(d.aunits); })
            .attr('width', x.bandwidth())
            // .attr('height', function(d) {return height - y(d.aunits); })
            .attr("height", function(d) { return height - y(0); }) // always equal to 0
            .attr("y", function(d) { return y(0); })
            .attr('fill', '#4285F4')
            .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.aunits));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});

        // Animation

        units_svg.selectAll("rect")
          .transition()
          .duration(2000)
          .attr("y", function(d) { return y(d.aunits); })
          .attr("height", function(d) { return height - y(d.aunits); })
          .delay(function(d, i){return(i*100)})
        
          // Chart Title
        units_svg.append('text')
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .text("Average Basket Units per Cluster");
      });

      

      // get the spesific cluster

        var ch_barplot = d3.select("#changing_barplot")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
          
        var pos = d3.csv('data/weekday_cluster.csv');
        pos.then(function (data) {
          // X axis
          var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.weekday; }))
            .padding(0.2);
          ch_barplot.append("g")
            .attr('class', 'axis-text')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, 1800])
            .range([ height, 0]);
          ch_barplot.append("g")
            .attr('class', 'axis')
            .call(d3.axisLeft(y));

          var u = ch_barplot.selectAll("rect")
            .data(data.filter(function(d){ return d.cluster == cluster;}))

            u
            .enter()
            .append("rect")
            .merge(u)
            .transition()
            .duration(1000)
              .attr("x", function(d) {console.log(d.weekday); return x(d.weekday); })
              .attr("y", function(d) {console.log(d.value); return y(d.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return height - y(d.value); })
              .attr("fill", "#4285F4")
          
          // Chart Title

          ch_barplot.append('text')
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "20px")
            .text("Baskets per Weekday and Cluster");
          
      });

        function getCluster(cluster) {
          var cluster = cluster.value;
          console.log(cluster)
        // initialize promise
        var pos = d3.csv('data/weekday_cluster.csv');
        pos.then(function (data) {
          // X axis
          var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.weekday; }))
            .padding(0.2);
          ch_barplot.append("g")
            .attr('class', 'axis-text')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, 1800])
            .range([ height, 0]);
          ch_barplot.append("g")
            .attr('class', 'axis')
            .call(d3.axisLeft(y));

          var u = ch_barplot.selectAll("rect")
            .data(data.filter(function(d){ return d.cluster == cluster;}))

            u
            .enter()
            .append("rect")
            .merge(u)
            .transition()
            .duration(1000)
              .attr("x", function(d) {console.log(d.weekday); return x(d.weekday); })
              .attr("y", function(d) {console.log(d.value); return y(d.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return height - y(d.value); })
              .attr("fill", "#4285F4")

          
      });
    }

    // This function is called by the buttons on top of the plot
    function update(cluster) {

      var pos = d3.csv('average_basket.csv');
      pos.then(function (data) {

      for(key in data) {
        if (data[key]['cluster'] == cluster) {
          // console.log(data[key]['avalue']);
          document.getElementById("value").innerHTML = data[key]['avalue'] + ' €';
          document.getElementById("unit").innerHTML = data[key]['aunits'] + ' items';
        }
      }
    });

    d3.selectAll('rect')
      .style('fill', '#4285F4')

    d3.selectAll('rect')
      .filter(function(d) {return d.cluster == cluster; })
      .transition()
      .style('fill', '#0d47a1')

    }