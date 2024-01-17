import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='px-[100px] w-full'>{children}</div>;
};

export default Wrapper;
