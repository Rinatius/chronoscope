import * as d3 from 'd3'

export default class D3Chart {
  constructor(element) {

    const data = [10, 20, 35, 40, 40];
    const svg = d3.select(element)
                .append("svg")
                  .attr("width", 500)
                  .attr("height", 500)
    const rects = svg.selectAll("rect")
    rects.data(data)
         .enter("rect")
         .append("rect")
          .attr("width", 40)
          .attr("height", d => d)
          .attr("x", (d, i) => 50 + 50 * i)
          .attr("y", d => 70 - d)

  }
}