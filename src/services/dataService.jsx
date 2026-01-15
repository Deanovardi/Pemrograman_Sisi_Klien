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
      }
      else {
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
    let data = [];

    if (Array.isArray(response.data)) {
      data = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      data = response.data.data;
    }

    console.log("Processed expenses data:", data);
    return data;
  } catch (error) {
    console.error("Expenses API Error:", error.message);
    // Return empty array instead of throwing
    return [];
  }
};
