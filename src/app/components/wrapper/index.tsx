import React from "react";

const Wrapper = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  return <div className={`px-5 sm:px-5 md:px-5 lg:px-10 xl:px-[100px] w-full ${className} `} style={style}>{children}</div>;
};

export default Wrapper;
