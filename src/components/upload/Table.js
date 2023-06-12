import React from "react";
import "./Table.css";

const Table = (props) => {
  return (
    <div className="table-container">
      {props.check === "UNSEEN"&&<h2 className="table-header">Top 5 Predictions</h2>}
      {props.check !== "UNSEEN"&&<h2 className="table-header">Top 10 Predictions</h2>}
      <table className="table-prediction">
        <thead>
          <tr>
            <th>Label</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {props.prediction.map(([label, percent]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
