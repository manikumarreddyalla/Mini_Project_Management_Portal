import './Button.css';

export default function Button({ children, variant = 'primary', onClick, disabled = false, ...props }) {
  return (
    <button className={\tn-custom btn-\$\{variant}\} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
