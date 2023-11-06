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
      <div className="text-6xl font-bold font-poppins text-darkgray">
        {title}
      </div>
      <div className="flex items-center text-xl font-light text-semilightgray mt-2">
        {icon && <span className="mr-2">{icon}</span>}{' '}
        {subtitle}
      </div>
    </div>
  );
}

export default Heading