import React from "react";
import {ResponsiveContainer} from "recharts";

class GraphContainer extends React.Component {
    render() {
        return (
            <div style={{width: "90vw", maxWidth: "1140px", height: "70vw", maxHeight: "80vh" }}>
                <ResponsiveContainer>
                    {this.props.children}
                </ResponsiveContainer>
            </div>

        );
    }
}

export default GraphContainer;
