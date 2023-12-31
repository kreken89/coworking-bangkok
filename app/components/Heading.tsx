'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: React.ReactNode;
}

const Heading = ({ title, subtitle, center, icon }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-fortyeight leading-none mxs:text-twentyfour xs:text-twentyeight sm:text-thirtytwo md:text-thirtysix font-bold font-poppins text-darkgray lg:text-fortyeight">
        {title}
      </div>
      <div className="flex items-center text-custombase text-lightgray mt-2">
        {icon && <span className="mr-2">{icon}</span>} {subtitle}
      </div>
    </div>
  );
};

export default Heading;
