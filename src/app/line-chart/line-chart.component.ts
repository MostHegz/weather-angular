
import { Component, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChart implements OnChanges {

  @ViewChild("chart", { static: true }) protected chartContainer = {} as ElementRef;
  svg: any;
  g: any;
  tooltip: any;
  margin = {} as { top: number; right: number; bottom: number; left: number; };
  contentWidth= {} as number;
  contentHeight= {} as number;
  width= {} as number;
  height= {} as number;
  @Input() dataset= {} as {x: number, y: number}[];
  @Input() extraSpace = 0.1 as number;
  maximumVertical ={} as number;
  minimumVertical ={} as number;


  constructor() { }

  ngOnChanges(changes: SimpleChanges):void {
    // only run when property "dataset" changed
    if (changes['dataset']) {
        console.log('onchange',this.dataset)
        if(this.dataset.length){
            this.maximumVertical = this.findMaxDrawnVertical(this.dataset, this.extraSpace)
            this.minimumVertical = this.findMinDrawnVertical(this.dataset, this.extraSpace)
        }
        this.initChart();
        this.createChart();
    }
  }

//   ngOnInit(): void {
//     this.initChart();
//     console.log(this.dataset)
//     this.createChart();
//   }

    findMaxDrawnVertical(dataset: {x: number, y: number}[],extraSpace: number): number {
        const maximum = this.findMaxVerticalValue(dataset);
        console.log(maximum)
        return (maximum* (1 + extraSpace) )
    }
    findMaxVerticalValue(dataset: {x: number, y: number}[]): number{
        console.log(dataset)
        const valuesArray = dataset.map((element) => element.y)
        return Math.max(...valuesArray)
    }
    findMinDrawnVertical(dataset: {x: number, y: number}[],extraSpace: number): number {
        const minimum = this.findMinVerticalValue(dataset);
        console.log(minimum)
        return (minimum* (1 - extraSpace) )
    }
    findMinVerticalValue(dataset: {x: number, y: number}[]): number{
        const valuesArray = dataset.map((element) => element.y)
        return Math.min(...valuesArray)
    }

  initChart() {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element);

    this.margin = {
      top: +this.svg.style("margin-top").replace("px", ""),
      right: +this.svg.style("margin-right").replace("px", ""),
      bottom: +this.svg.style("margin-bottom").replace("px", ""),
      left: +this.svg.style("margin-left").replace("px", "")
    };

    this.width = +this.svg.style("width").replace("px", "");
    this.height = +this.svg.style("height").replace("px", "");

    this.contentWidth = this.width - this.margin.left - this.margin.right;
    this.contentHeight = this.height - this.margin.top - this.margin.bottom;

    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }


  createChart() {

    // The number of datapoints
    // var n = 21;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
      .domain([0, this.dataset.length]) // input
      .range([0, this.contentWidth]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
      .domain([this.minimumVertical, this.maximumVertical]) // input 
      .range([this.contentHeight, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
      .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
      .y(function (d: any) { return yScale(d.y); }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    // var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } })

    // 3. Call the x axis in a group tag
    this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + this.contentHeight + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    this.g.append("g")
      .attr("class", "y axis")
      // .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    this.g.append("path")
      .datum(this.dataset) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    this.g.selectAll(".dot")
      .data(this.dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d: any, i: any) { return xScale(i) })
      .attr("cy", function (d: any) { return yScale(d.y) })
      .attr("r", 5)
    //   .on("mouseover", 
    //     function (a: number, b: number, c: number) {
    //         console.log(a)
    //         this.attr('class', 'focus')
    //     })
    //   .on("mouseout", function () { })
  }
  

}