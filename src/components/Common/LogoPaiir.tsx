import React from 'react';
import Paiir from '../../assets/images/logo.svg';
export enum Size {
  sm = 24,
  md = 32,
  lg = 64,
}
type LogoSize = 'sm' | 'md' | 'lg';
function LogoPaiir({
  size,
  className = '',
}: {
  size: LogoSize;
  className?: string;
}) {
  const style = {
    width: `${Size[size]}px`,
    height: `${Size[size]}px`,
    boxShadow: '1px 5px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
  };
  return (
    <img src={Paiir} className={className} alt="logo-paiir" style={style} />
  );
}

export default LogoPaiir;
