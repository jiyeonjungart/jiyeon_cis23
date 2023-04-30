d3.json("./data.json").then((rawData) => {
  const offenses = [
    {
      id: "offense-1",
      offense: "ASSAULT 3 & RELATED OFFENSES",
      display: "ASSAULT IN THE 3RD DEGREE & RELATED OFFENSES",
      stroke: "#FFEBF3",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-2",
      offense: "CRIMINAL MISCHIEF & RELATED OF",
      display: "CRIMINAL MISCHIEF & RELATED OFFENSES",
      stroke: "#F9F8FF",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-3",
      offense: "FELONY ASSAULT",
      display: "FELONY ASSAULT",
      stroke: "#FFEFF6",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-4",
      offense: "GRAND LARCENY",
      display: "GRAND LARCENY",
      stroke: "#FFE9E9",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-5",
      offense: "HARRASSMENT 2",
      display: "HARASSMENT IN THE 2ND DEGREE",
      stroke: "#FCF3FF",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-6",
      offense: "MISCELLANEOUS PENAL LAW",
      display: "MISCELLANEOUS PENAL LAW",
      stroke: "#FFFEF7",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-7",
      offense: "MURDER & NON-NEGL. MANSLAUGHTE",
      display: "MURDER & NON-NEGLIGENT MANSLAUGHTER",
      stroke: "#FAF3FF",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-8",
      offense: "OFF. AGNST PUB ORD SENSBLTY &",
      display: "OFFENSE AGAINST PUBLIC ORDER, PUBLIC SENSIBILITIES",
      stroke: "#FAF0FF",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-9",
      offense: "PETIT LARCENY",
      display: "PETIT LARCENY",
      stroke: "#FFFDF5",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-10",
      offense: "ROBBERY",
      display: "ROBBERY",
      stroke: "#FFEBFD",
      strokeOpacity: 0.7,
    },
    {
      id: "offense-11",
      offense: "SEX CRIMES",
      display: "SEX CRIMES",
      stroke: "#FFF0F0",
      strokeOpacity: 0.7,
    },
  ];

  const accessors = {
    year: (d) => d["Complaint Year Number"],
    month: (d) => d["Month Number"],
    offense: (d) => d["Offense Description"],
  };

  const parseDate = d3.timeParse("%Y-%-m");
  const formatDate = d3.timeFormat("%Y %B");

  const dataByMonth = d3.rollup(
    rawData,
    (v) => v.length,
    (d) => parseDate(`${accessors.year(d)}-${accessors.month(d)}`),
    accessors.offense
  );

  const [minDate, maxDate] = d3.extent(dataByMonth.keys());

  const data = d3.timeMonth
    .range(minDate, d3.timeMonth.offset(maxDate, 1))
    .map((date) => {
      if (dataByMonth.has(date)) {
        return {
          date,
          values: Array.from(dataByMonth.get(date), ([key, value]) => ({
            offense: key,
            count: value,
          })).sort((a, b) => d3.descending(a.count, b.count)),
          total: d3.sum(dataByMonth.get(date).values()),
        };
      } else {
        return {
          date,
          values: [],
          total: 0,
        };
      }
    });

  const tickRadius = 6;
  const maxBubbleRadius = 80;

  const marginTop = maxBubbleRadius * 2 + 1;
  const marginRight = 40;
  const marginBottom = 32;
  const marginLeft = 40;

  const legendSwatchSize = 26;

  const x = d3.scalePoint().domain(data.map((d) => d.date));

  const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.total)]);

  const r = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d3.max(d.values, (d) => d.count))])
    .range([0, maxBubbleRadius]);

  const fill = d3
    .scaleOrdinal()
    .domain(offenses.map((d) => d.offense))
    .range(offenses.map((d) => `#${d.id}`));

  const stroke = d3
    .scaleOrdinal()
    .domain(offenses.map((d) => d.offense))
    .range(offenses.map((d) => d.stroke));

  const strokeOpacity = d3
    .scaleOrdinal()
    .domain(offenses.map((d) => d.offense))
    .range(offenses.map((d) => d.strokeOpacity));

  /**
   * Legend
   */
  let selectedOffenses = new Map(offenses.map((d) => [d.offense, true]));
  const legend = d3.select("#legend").classed("legend", true);
  const legendItem = legend
    .selectAll(".legend-item")
    .data(offenses)
    .join("div")
    .attr("class", "legend-item")
    .on("pointerenter", enteredLegendItem)
    .on("pointerleave", leftLegendItem)
    .on("click", clickedLegendItem)
    .call((div) =>
      div
        .append("svg")
        .attr("class", "legend-swatch")
        .attr("width", legendSwatchSize)
        .attr("height", legendSwatchSize)
        .append("use")
        .attr("x", 0.5)
        .attr("y", 0.5)
        .attr("width", legendSwatchSize - 1)
        .attr("height", legendSwatchSize - 1)
        .attr("xlink:href", (d) => fill(d.offense))
        .attr("stroke", (d) => stroke(d.offense))
        .attr("stroke-opacity", (d) => strokeOpacity(d.offense))
    )
    .call((div) =>
      div
        .append("div")
        .attr("class", "legend-label")
        .text((d) => d.display)
    );

  function enteredLegendItem(event, d) {
    legendItem.classed("is-muted", (e) => e.offense !== d.offense);

    bubble
      .classed("is-muted", (e) => e.offense !== d.offense)
      .filter((e) => e.offense === d.offense)
      .raise();
  }

  function leftLegendItem() {
    highlightStep();
  }

  function clickedLegendItem(event, d) {
    const allSelected = [...selectedOffenses.values()].every((e) => e);
    if (allSelected) {
      selectedOffenses = new Map(
        offenses.map((e) => [e.offense, e.offense === d.offense])
      );
    } else {
      selectedOffenses.set(d.offense, !selectedOffenses.get(d.offense));
      const noSelected = [...selectedOffenses.values()].every((e) => !e);
      if (noSelected)
        selectedOffenses = new Map(offenses.map((e) => [e.offense, true]));
    }

    legendItem
      .select(".legend-swatch")
      .classed("is-hidden", (e) => !selectedOffenses.get(e.offense));

    bubble.classed("is-hidden", (e) => !selectedOffenses.get(e.offense));
  }

  /**
   * Tooltip
   */
  let tooltipRect;
  let tooltipOffset = 8;

  const tooltip = d3.select("#tooltip").classed("tooltip", true);
  const tooltipDate = tooltip.append("div").attr("class", "tooltip-date");
  const tooltipOffense = tooltip.append("div").attr("class", "tooltip-offense");
  const tooltipCount = tooltip.append("div").attr("class", "tooltip-count");

  /**
   * Chart
   */
  const svg = d3.select("#chart").classed("chart", true);
  const axisG = svg.append("g").attr("class", "axis");
  const tickG = axisG
    .selectAll(".tick")
    .data(x.domain())
    .join("g")
    .attr("class", "tick")
    .classed("is-year", (d) => d.getMonth() === 0)
    .call((g) =>
      g
        .append("circle")
        .attr("class", "tick-circle")
        .attr("r", tickRadius)
        .attr("stroke", "")
    )
    .call((g) =>
      g
        .filter((d) => d.getMonth() === 0)
        .append("text")
        .attr("class", "tick-label")
        .attr("text-anchor", "middle")
        .attr("dy", "0.71em")
        .attr("y", 12 + tickRadius)
        .text((d) => d.getFullYear())
    );
  const bubblesG = svg.append("g").attr("class", "bubbles");
  const bubbleClusterG = bubblesG
    .selectAll(".bubble-cluster")
    .data(data)
    .join("g")
    .attr("class", "bubble-cluster");
  const bubble = bubbleClusterG
    .append("g")
    .selectAll(".bubble")
    .data((d) => d.values)
    .join("g")
    .attr("class", "bubble")
    .call((g) =>
      g
        .append("use")
        .attr("class", "bubble-use")
        .attr("xlink:href", (d) => fill(d.offense))
        .attr("x", (d) => -r(d.count))
        .attr("y", (d) => -r(d.count) * 2)
        .attr("width", (d) => r(d.count) * 2)
        .attr("height", (d) => r(d.count) * 2)
    )
    .call((g) =>
      g
        .append("circle")
        .attr("class", "bubble-circle")
        .attr("cy", (d) => -r(d.count))
        .attr("r", (d) => r(d.count))
        .attr("fill", "none")
        .attr("stroke", (d) => stroke(d.offense))
        .attr("stroke-opacity", (d) => strokeOpacity(d.offense))
    )
    .on("pointerenter", enteredBubble)
    .on("pointermove", movedBubble)
    .on("pointerleave", leftBubble);
  const stemsG = svg.append("g").attr("class", "stems");
  const stemLine = stemsG
    .selectAll(".stem-line")
    .data(data)
    .join("line")
    .attr("class", "stem-line");

  function resizeChart() {
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;

    x.range([marginLeft, width - marginRight]);
    y.range([height - marginBottom - tickRadius, marginTop]);

    svg.attr("width", width).attr("height", height);

    axisG.attr("transform", `translate(0,${height - marginBottom})`);
    tickG.attr("transform", (d) => `translate(${x(d)},0)`);

    bubbleClusterG.attr(
      "transform",
      (d) => `translate(${x(d.date)},${y(d.total)})`
    );

    stemLine
      .attr("transform", (d) => `translate(${x(d.date)},0)`)
      .attr("y1", y(0))
      .attr("y2", (d) => y(d.total));
  }

  function enteredBubble(event, d) {
    const p = d3.select(this.parentNode).datum();

    tooltipDate.text(formatDate(p.date));
    tooltipOffense.text(
      offenses.find((e) => e.offense === d.offense).display.toLowerCase()
    );
    tooltipCount.text(`Total recorded cases: ${d.count}`);

    tooltip.classed("is-visible", true);

    tooltipRect = tooltip.node().getBoundingClientRect();
  }

  function movedBubble(event) {
    let tx, ty;
    if (event.x < window.innerWidth / 2) {
      tx = event.x + tooltipOffset;
    } else {
      tx = event.x - tooltipOffset - tooltipRect.width;
    }
    if (event.y < window.innerHeight / 2) {
      ty = event.y + tooltipOffset;
    } else {
      ty = event.y - tooltipOffset - tooltipRect.height;
    }
    tooltip.style("transform", `translate(${tx}px,${ty}px)`);
  }

  function leftBubble() {
    tooltip.classed("is-visible", false);
  }

  /**
   * Scrolling
   */
  let step = 0;

  const scroller = scrollama();
  scroller
    .setup({
      step: "article .step",
      offset: 0.66,
    })
    .onStepEnter(handleStepEnter);

  function handleStepEnter({ index }) {
    step = index;
    highlightStep();
  }

  function highlightStep() {
    legendItem.classed("is-muted", false);
    bubble.order();
    switch (step) {
      case 0:
      case 1:
      case 6:
        bubble.classed("is-muted", false);
        break;
      case 2:
        bubble.classed("is-muted", function () {
          const d = d3.select(this.parentNode).datum();
          return d.date.getFullYear() !== 2020;
        });
        break;
      case 3:
      case 4:
      case 5:
        bubble.classed("is-muted", function () {
          const d = d3.select(this.parentNode).datum();
          return d.date.getFullYear() !== 2021;
        });
        break;
      default:
        break;
    }
  }

  function resized() {
    resizeChart();
    scroller.resize();
  }

  window.addEventListener("resize", resized);
  resized();
});
