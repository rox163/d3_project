var containerSel = d3.select("body").append("div").attr("class","container");

// var diameter = 960,
//     radius = diameter / 2,
//     innerRadius = radius - 120;
// var cluster = d3.layout.cluster()
//     .size([360, innerRadius])
//     .sort(null)
//     .value(function(d) { return d.size; });
 
// var bundle = d3.layout.bundle();
 
// var line = d3.svg.line.radial()
//     .interpolate("bundle")
//     .tension(.85)
//     .radius(function(d) { return d.y; })
//     .angle(function(d) { return d.x / 180 * Math.PI; });
var options = {
    nodeRadius: 5,
    maxNameLength: 40,
    fontSize: 12,
    width: 830,
    height: 500
};

// add the <svg> tags
var layoutRoot = containerSel.append("svg")
    .attr("width", "100%")
    .attr("height", options.height)
  .append("g")
    .attr("class", "container")
    .attr("transform", "translate(" + 19 + ",0)");

// initialise the Tree layout
var tree = d3.layout.tree()
    .sort(null)
    .size([460, 885 - options.maxNameLength * options.fontSize])
    .children(function(d) {
        return (!d.contents || d.contents.length === 0) ? null : d.contents;
    });

var nodes = tree.nodes(alsData);
var links = tree.links(nodes);

// Edges between nodes as a <path class="link" />
var link = d3.svg.diagonal()
    .projection(function(d)
    {
     return [d.y, d.x];
    });

layoutRoot.selectAll("path.link")
    .data(links)
    .enter()
    .append("svg:path")
    .attr("class", "link")
    .attr("d", link);

/*
    Nodes as
    <g class="node">
     <circle class="node-dot" />
     <text />
    </g>
  */
var nodeGroup = layoutRoot.selectAll("g.node")
    .data(nodes)
    .enter()
    .append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
    });

nodeGroup.append("svg:circle")
    .attr("class", "node-dot")
    .attr("r", options.nodeRadius)
    .attr("id", function(d) {
        return d.name;
    })
    .on("mouseover", function() {
        d3.select(this).style("cursor", "pointer");
    })
    .on("click", function() {
        jQuery('#name').text(this.id);
        jQuery('#addNodeModal').modal('show');
    });

nodeGroup.append("svg:text")
    .attr("text-anchor", function(d) {
        return d.children ? "end" : "start";
    })
    .attr("dx", function(d) {
        var gap = 2 * options.nodeRadius;
        return d.children ? -gap : gap;
    })
    .attr("dy", 3)
    .text(function(d) {
        return d.name;
    });

function saveNominee() {
   
    
}
