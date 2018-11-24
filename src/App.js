import React, { Component } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
//import COSEBilkent from "cytoscape-cose-bilkent";
import dagre from "cytoscape-dagre";
//Cytoscape.use(dagre);
//Cytoscape.use(COSEBilkent);
import styles from './cy-style';
class App extends Component {
  render() {
    // const layout = {
    //   name: "dagre",
    //   fit: true,
    //   padding: 30,
    //   width: function( edge ){ debugger; return edge.weight; }
    // }; //cose-bilkent, dagre, grid

    const layout = { name: 'cose',
      idealEdgeLength: 100,
      nodeOverlap: 20,
      refresh: 20,
      fit: true,
      padding: 30,
      randomize: false,
      componentSpacing: 100,
      nodeRepulsion: 400000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0}
    const dep = [
      { parent: "bootifulmeters", child: "app_db", callCount: 4 },
      { parent: "kafka", child: "servicea", callCount: 4 },
      { parent: "servicea", child: "kafka", callCount: 9 },
      { parent: "kafka", child: "serviceb", callCount: 3 },
      { parent: "apip", child: "evcache_g", callCount: 1 },
      { parent: "apip", child: "api", callCount: 1 },
      { parent: "api", child: "session_logs", callCount: 1 }
    ];
    const services = new Set();
    const elements = [];
    dep.forEach(service => {
      services.add(service.parent);
      services.add(service.child);
    });

    services.forEach(service => {
      let el = { data: { id: service, name: service } };
      elements.push(el);
    });
    dep.forEach(ele => {
      let el = {
        data: {
          source: ele.parent,
          target: ele.child,
          weight: ele.callCount,
          width: ele.callCount
        }
      };
      elements.push(el);
    });
    return (
      <CytoscapeComponent
        stylesheet = {styles}
        // stylesheet={[
        //   {
        //     selector: "node",
        //     style: {
        //       content: "data(id)",
        //       shape: "roundrectangle",
        //       "text-opacity": 0.5,
        //       "text-valign": "center",
        //       "text-halign": "right",
        //       "background-color": "#11479e"
        //     }
        //   },
        //
        //   {
        //     selector: "edge",
        //     style: {
        //       "curve-style": "bezier",
        //       "target-arrow-shape": "triangle",
        //       width: 2,
        //       "line-color": "#ddd",
        //       "target-arrow-color": "#ddd"
        //     }
        //   }
        // ]}
        elements={elements}
        style={{ minWidth: "800", minHeight: "600px" }}
        layout={layout}
      />
    );
  }
}

export default App;
