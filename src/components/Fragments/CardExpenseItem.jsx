import React from "react";
import Icon from "../Elements/Icon";

function CardExpenseItem({ expense }) {
  // Map category ke icon - case insensitive
  const getCategoryIcon = (category) => {
    const categoryLower = category?.toLowerCase() || "";

    const iconMap = {
      housing: <Icon.House size={32} />,
      food: <Icon.Food size={32} />,
      transportation: <Icon.Transport size={32} />,
      entertainment: <Icon.Gamepad size={32} />,
      shopping: <Icon.Shopping size={32} />,
      other: <Icon.Other size={32} />,
      others: <Icon.Other size={32} />,
    };

    return iconMap[categoryLower] || <Icon.Other size={32} />;
  };

  // Determine arrow direction berdasarkan perubahan
  const isIncrease = Math.random() > 0.5;
  const percentageChange = Math.floor(Math.random() * 25);

  return (
    <div className="p-4 border border-gray-05 rounded-lg bg-white hover:shadow-md transition">
      {/* Header dengan icon dan persentase */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-05 rounded-lg text-primary">
          {getCategoryIcon(expense.category)}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-03 mb-1">
            Compare to the last month
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-bold ${
              isIncrease ? "text-special-red" : "text-special-green"
            }`}
          >
            <span>{percentageChange}%</span>
            {isIncrease ? (
              <Icon.ArrowUp size={14} />
            ) : (
              <Icon.ArrowDown size={14} />
            )}
          </div>
        </div>
      </div>

      {/* Category Name dan Amount */}
      <div className="mb-3">
        <h3 className="font-bold text-gray-01 mb-1">{expense.category}</h3>
        <div className="text-2xl font-bold text-gray-01">${expense.amount}</div>
      </div>

      {/* Detail Items - jika ada */}
      {expense.items && expense.items.length > 0 && (
        <div className="mb-3 space-y-2">
          {expense.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-xs text-gray-03"
            >
              <span>{item.name}</span>
              <span>${item.amount}</span>
            </div>
          ))}
        </div>
      )}

      {/* Description dan Date */}
      <div
        className={`${
          expense.items && expense.items.length > 0 ? "pt-3" : "pt-3"
        } border-t border-gray-05`}
      >
        <p className="text-xs text-gray-03 mb-1">{expense.description}</p>
        <p className="text-xs text-gray-03">
          {new Date(expense.date).toLocaleDateString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default CardExpenseItem;
