const ScreenFrame = ({
  children,
  className = "",
  frameClassName = "",
  ariaLabelledby,
}) => {
  return (
    <section
      className={`screen-page ${className}`.trim()}
      aria-labelledby={ariaLabelledby}
    >
      <div className={`screen-frame portfolio-scrollbar ${frameClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
};

export default ScreenFrame;
