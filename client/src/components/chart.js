import React, {Component} from 'react';
import * as d3 from 'd3';
import './chart.css';

class Chart extends Component {

    constructor(props) {
        super(props);

        this.height = this.props.height;
        this.width = this.props.width;
        this.arc = d3.arc().innerRadius(this.props.innerRadius).outerRadius(this.props.outerRadius);
        this.interpolate = d3.interpolateRgb('#eaaf79', '#bc3358');
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);       
    }

    render() {

        if (this.props.data === undefined || this.props.data.length === 0) {
            this.pie = d3.pie()([1]);

            return (
                <svg className="chart-base-dimmed" height={this.height} width={this.width}>
                    <g transform={`translate(${this.width / 2}, ${this.height / 2})`}>

                        {this.pie.map((d, i) => (
                            <Slice key={i} data={d} index={i} arc={this.arc} color={this.colors}/>
                         ))
                        }
                    </g>
                </svg>
            );    

        } else {
            let categories = d3.nest()
                        .key(d => d[this.props.attribute])
                        .rollup(v => v.length)
                        .entries(this.props.data)

            let reduced = [];

            if (this.props.reduce && this.props.reduceamount) {
                let counter = 0;
                categories.forEach(d => {
                    if (d.value < this.props.reduceamount) {
                        ++counter;
                    } else {
                        reduced.push(d);
                    }
                })

                if (counter > 0) {
                    reduced.push({key: "Other", value: counter});
                    categories = reduced;
                }
            }


            this.pie = d3.pie().value(d => d.value)(categories);

            return (
                <svg className="chart-base" height={this.height} width={this.width}>
                    <g transform={`translate(${this.width / 2}, ${this.height / 2})`}>

                        {this.pie.map((d, i) => (  
                            <Slice key={i} data={d} index={i} arc={this.arc} color={this.colors}/>
                        ))

                        }
                    </g>
                </svg>
            );    
        }
    }
}


const Slice = props => {
    let { data, index, arc, color} = props;

    var _d = arc.centroid(data);
    _d[0] *= 1.8;
    _d[1] *= 1.8;

    return (
    <g key={index} className="arc">
        <path key={index} d={arc(data)} fill={color(index)} />
        {/*<text className="chart-text" transform={`translate(${arc.centroid(data)})`} textAnchor="middle" alignmentBaseline="middle" fill="white">{data.data.key} : {data.data.value}</text> */}
        <text className="chart-text" transform={`translate(${_d})`} textAnchor="middle" alignmentBaseline="middle" fill="black">{data.data.key}</text>
        <text className="chart-text" transform={`translate(${arc.centroid(data)})`} textAnchor="middle" alignmentBaseline="middle" fill="black">{data.data.value}</text>
    </g>
    );
}

export default Chart;
