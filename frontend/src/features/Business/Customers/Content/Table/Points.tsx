import React from "react";

function Points({ points }: { points: number }) {
  return (
    <p className='font-semibold text-foreground'>{points.toLocaleString()}</p>
  );
}

export default React.memo(Points);
