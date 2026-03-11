import React from "react";

function RFPSelector({ rfpId, setRfpId }) {

  const rfpList = [
    { id: "RFP_001", name: "RFP_001" },
    { id: "RFP_002", name: "RFP_002" }
  ];

  return (

    <select
      className="rfp-select"
      value={rfpId}
      onChange={(e) => setRfpId(e.target.value)}
    >

      <option value="">
        Select RFP
      </option>

      {rfpList.map((rfp) => (
        <option key={rfp.id} value={rfp.id}>
          {rfp.name}
        </option>
      ))}

    </select>

  );

}

export default RFPSelector;