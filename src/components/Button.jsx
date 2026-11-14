import { Link } from 'react-router-dom';

/** variant: primary | sun | outline | light | danger */
export default function Button({ to, variant = 'primary', className = '', children, ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
