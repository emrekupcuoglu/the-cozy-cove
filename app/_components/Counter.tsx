"use client";
// import { use, useState } from "react";

function Counter({ users }: { users?: any[] }) {
  // const [count, setCount] = useState(0);
  console.log(users);

  return (
    <div>
      <p>There are {users?.length || 0} users</p>
      <button>static</button>
      {/* <button onClick={() => setCount((prev) => prev + 1)}>{count}</button> */}
    </div>
  );
}

export default Counter;
