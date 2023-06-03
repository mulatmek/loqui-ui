import React from "react";
import './Table.css'
const Table = (props) => {
  return (
    <table className="table-prediction">
      <thead>
        <tr>
          <th>Video</th>
          <th>Percent</th>
        </tr>
      </thead>
      <tbody>
        {props.prediction.map(([id, percent]) => (
          <tr key={id}>
            <td>{props.video_data[id+3]}</td>
            <td>{percent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
