import React from "react";

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  className = "",
}) => {
  return (
    <div className={`metric-card area-effect ${className}`}>
      <div className="metric-card-header d-flex align-items-center justify-content-between mb_16">
        <h5 className="text_white font-4 mb_0">{title}</h5>
        {Icon && <Icon className="metric-card-icon" />}
      </div>
      <div className="metric-card-value">
        <h2 className="text_white font-4 mb_8">{value}</h2>
        {trend && trendValue && (
          <div className={`metric-card-trend ${trend}`}>
            <span className="text-caption-1">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
