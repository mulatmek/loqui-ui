import React from "react";
import "./Table.css";

const Table = (props) => {
  return (
    <div className="table-container">
      <h2 className="table-header">Top 10 Predictions</h2>
      <table className="table-prediction">
        <thead>
          <tr>
            <th>Label</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {props.prediction.map(([id, percent]) => (
            <tr key={id}>
              <td>{props.video_data[id + 3]}</td>
              <td>{percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
