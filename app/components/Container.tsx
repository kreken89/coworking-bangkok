'use client';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
      bg-white
      mx-auto
      xl:px-20
      md:px-10
      sm:px-2
      px-4
      pb-8
   ">
      {children}
    </div>
  );
};

export default Container;
