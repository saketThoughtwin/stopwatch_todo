import React, { useEffect, useState } from "react";

const Playground: React.FC = () => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    console.log("useEffect ran");
    // setVal(val + 1); // This triggers another render immediately
  });

  return (
    <div>
      <h1>Value: {val}</h1>
      <button onClick={()=> setVal(val + 1)}>okk</button>
    </div>
  );
};

export default Playground;
