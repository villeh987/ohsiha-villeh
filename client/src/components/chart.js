import React, {Component} from 'react';
import * as d3 from 'd3';
import './chart.css';

//const data = {"Search":[{"Title":"Batman Begins","Year":"2005","imdbID":"tt0372784","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"},{"Title":"Batman v Superman: Dawn of Justice","Year":"2016","imdbID":"tt2975590","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman","Year":"1989","imdbID":"tt0096895","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"},{"Title":"Batman Returns","Year":"1992","imdbID":"tt0103776","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"},{"Title":"Batman Forever","Year":"1995","imdbID":"tt0112462","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Batman & Robin","Year":"1997","imdbID":"tt0118688","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"},{"Title":"The Lego Batman Movie","Year":"2017","imdbID":"tt4116284","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"},{"Title":"Batman: The Animated Series","Year":"1992–1995","imdbID":"tt0103359","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"},{"Title":"Batman: Under the Red Hood","Year":"2010","imdbID":"tt1569923","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","imdbID":"tt2313197","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"}],"totalResults":"373","Response":"True"}
//const data = [1, 2, 3, 4];

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

        //console.log("PROPS", this.props.data , "PROPS");
        console.log("proppikset:", this.props.data);


        if (this.props.data === undefined || this.props.data.length === 0) {
            console.log("UNDEFINED");
            //this.categories = [1];
            this.pie = d3.pie()([1]);

            return (
                <svg className="chart-base-dimmed" height={this.height} width={this.width}>
                    <g transform={`translate(${this.width / 2}, ${this.height / 2})`}>

                        {this.pie.map((d, i) => (

                            
                            /*<Slice key={i} data={d} index={i} arc={this.arc} color={this.interpolate(i / (this.pie.length - 1))}/> */
                            <Slice key={i} data={d} index={i} arc={this.arc} color={this.colors}/>
                        ))

                        }
                    </g>
                </svg>
            );    


        } else {
            this.categories = d3.nest()
                        .key(d => d[this.props.attribute])
                        .rollup(v => v.length)
                        .entries(this.props.data)

            this.pie = d3.pie().value(d => d.value)(this.categories);

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



        //console.log("categories:", this.categories);

        



    }
}


const Slice = props => {
    let { data, index, arc, color} = props;

    /*var c = arc.centroid(data),
        x = c[0],
        y = c[1],
        
        h = Math.sqrt(x*x + y*y); */



    /*return "translate(" + (x/h * labelr) +  ',' +
       (y/h * labelr) +  ")"; */
    var _d = arc.centroid(data);
    _d[0] *= 1.8;
    _d[1] *= 1.8;

    //console.log(_d);


    //console.log(data.outerRadius);

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


