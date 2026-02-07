import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetching goals with token:", token ? "exists" : "missing");

    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Goals API Response:", response.data);

    let data = null;

    if (response.data?.data && Array.isArray(response.data.data)) {
      // If array is not empty, get first element
      if (response.data.data.length > 0) {
        data = response.data.data[0];
      } else {
        console.log("Goals data is empty array");
        data = {};
      }
    } else if (response.data?.data && typeof response.data.data === "object") {
      data = response.data.data;
    } else if (response.data?.target_amount) {
      data = response.data;
    }

    console.log("Processed goals data:", data);
    // Always return a valid object
    return data || {};
  } catch (error) {
    console.error("Goal API Error:", error.message);
    return {};
  }
};

export const createGoalService = async (targetAmount, presentAmount = 0) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Creating goal with target:", targetAmount);

    const response = await axios.post(
      `${API_URL}/goals`,
      {
        target_amount: targetAmount,
        present_amount: presentAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Create Goal Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create Goal API Error:", error.message);
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || error.message || "Gagal membuat goals",
    };
  }
};

export const getExpensesService = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetching expenses with token:", token ? "exists" : "missing");

    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Expenses API Response:", response.data);

    // Handle different response structures
    let rawData = [];

    if (Array.isArray(response.data)) {
      rawData = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      rawData = response.data.data;
    } else if (
      response.data?.expenses &&
      Array.isArray(response.data.expenses)
    ) {
      rawData = response.data.expenses;
    }

    console.log("Raw expenses data:", rawData);

    // Log first item structure to see what fields are available
    if (rawData.length > 0) {
      console.log("First expense item structure:", rawData[0]);
      console.log("First expense keys:", Object.keys(rawData[0]));
    }

    // API returns array of expenses grouped by category
    // Each item has: {category, amount, percentage, trend, detail: Array}
    const transformedData = rawData.map((expense) => {
      // Log detail structure for debugging
      if (expense.detail && expense.detail.length > 0) {
        console.log("Detail item structure:", expense.detail[0]);
        console.log("Detail item keys:", Object.keys(expense.detail[0]));
      }

      const items = (expense.detail || []).map((detailItem) => ({
        description:
          detailItem.item ||
          detailItem.description ||
          detailItem.name ||
          "Untitled",
        amount: detailItem.amount || 0,
        date: detailItem.date || new Date().toISOString(),
      }));

      return {
        category: expense.category || "Others",
        totalAmount: expense.amount || 0,
        percentage: expense.percentage || 0,
        trend: expense.trend || "up",
        items: items,
      };
    });
    console.log("Transformed expenses data:", transformedData);

    return transformedData;
  } catch (error) {
    console.error("Expenses API Error:", error.message);
    // Return empty array instead of throwing
    return [];
  }
};
