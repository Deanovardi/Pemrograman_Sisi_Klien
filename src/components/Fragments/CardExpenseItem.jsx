import React from "react";
import Icon from "../Elements/Icon";

function CardExpense({
  category,
  totalAmount,
  percentage,
  trend = "up",
  items = [],
  icon,
}) {
  const isIncrease = trend === "up";

  const getCategoryIcon = () => {
    const key = category?.toLowerCase() || "";
    switch (key) {
      case "housing":
        return <Icon.House size={24} />;
      case "food":
        return <Icon.Food size={24} />;
      case "transportation":
        return <Icon.Transport size={24} />;
      case "entertainment":
        return <Icon.Movie size={24} />;
      case "shopping":
        return <Icon.Shopping size={24} />;
      case "others":
        return <Icon.Other size={24} />;
      default:
        return icon || <Icon.Other size={24} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (typeof dateString === "string" && dateString.includes(" "))
      return dateString;
    const d = new Date(dateString);
    if (isNaN(d)) return dateString;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between p-4 bg-gray-100">
        <div className="flex items-start gap-3">
          <div className="bg-gray-200 p-2.5 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">{getCategoryIcon()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-base font-bold mb-1">
              {category}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${totalAmount}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-0.5">
            <span className="font-bold text-lg text-gray-400">
              {Math.abs(percentage)}%
            </span>
            {isIncrease ? (
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
              </svg>
            )}
          </div>
          <div className="text-base text-gray-400 whitespace-nowrap mt-0.5">
            Compare to the last month
          </div>
        </div>
      </div>

      {/* Items List */}
      {items && Array.isArray(items) && items.length > 0 ? (
        <div className="space-y-0 bg-white px-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-start py-3 ${
                index > 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="text-base text-gray-400 font-semibold">
                {item.description}
              </div>
              <div className="text-right">
                <div className="font-semibold text-base text-gray-400">
                  ${item.amount}
                </div>
                <div className="text-base text-gray-400 font-medium mt-0.5">
                  {formatDate(item.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-sm py-4 bg-white px-4">
          No transactions
        </div>
      )}
    </div>
  );
}

export default CardExpense;
