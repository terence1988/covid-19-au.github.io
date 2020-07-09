import React from 'react';
import Plot from 'react-plotly.js';


class TreeMap extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        var trace1 = {
            x: [20, 14, 23],
            y: ['giraffes', 'orangutans', 'monkeys'],
            name: 'SF Zoo',
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
            },
            type: 'bar'
        };

        var trace2 = {
            x: [12, 18, 29],
            y: ['giraffes', 'orangutans', 'monkeys'],
            name: 'LA Zoo',
            orientation: 'h',
            type: 'bar',
            marker: {
                color: 'rgba(255,153,51,0.6)',
                width: 1
            }
        };

        var data = [trace1, trace2];

        var layout = {
            title: 'Colored Bar Chart',
            barmode: 'stack'
        };

        return (
            <Plot
                data={[{
                    type: 'treemap',
                    values: this.state.values||[],
                    labels: this.state.labels||[],
                    parents: this.state.parents||[],
                    marker: {colorscale: 'Blues'}
                }]}
                layout={ {
                    //width: '100%',
                    height: 500,
                    margin: {
                        l: 10,
                        r: 10,
                        b: 10,
                        t: 10,
                        pad: 0
                    }
                } }
                style={{
                    'font-size': '15px'
                }}
            />
        );
    }

    setCasesInst(casesInst, numDays) {
        this.__casesInst = casesInst;

        let values = [],
            labels = [],
            parents = [];

        for (let regionType of casesInst.getRegionChildren()) {
            labels.push(regionType.prettified());
            if (numDays) {
                values.push(casesInst.getCaseNumberOverNumDays(regionType, null, numDays).getValue());
            } else {
                values.push(casesInst.getCaseNumber(regionType, null).getValue());
            }
            parents.push("");
        }

        this.setState({
            values: values,
            labels: labels,
            parents: parents
        });
    }
}

export default TreeMap;
