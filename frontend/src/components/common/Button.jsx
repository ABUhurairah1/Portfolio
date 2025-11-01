import React from "react";

const Button = ({
  type = "button",
  className = "",
  onClick,
  href,
  children,
  icon,
  variant = "",
  size = "", // 'small' for compact button
  fullWidth = false,
  animate = false,
  ...rest
}) => {
  const classes = [
    "tf-btn",
    variant,
    size ? `btn-${size}` : "",
    animate ? "animate-hover-btn" : "",
    fullWidth ? "btn-w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {icon ? (
          <>
            {icon} <span>{children}</span>
          </>
        ) : (
          children
        )}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {icon ? (
        <>
          {icon} <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
