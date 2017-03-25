import React from "react";
import {ResponsiveContainer} from "recharts";

class GraphContainer extends React.Component {
    render() {
        return (
            <div style={{width: "95vw", height: "70vw", maxHeight: "100vh" }}>
                <ResponsiveContainer>
                    {this.props.children}
                </ResponsiveContainer>
            </div>

        );
    }
}

export default GraphContainer;
