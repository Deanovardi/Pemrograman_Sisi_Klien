import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import CardExpenseItem from "../components/Fragments/CardExpenseItem";
import CircularProgress from "@mui/material/CircularProgress";
import { getExpensesService } from "../services/dataService";

function Expenses() {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getExpensesService();
        setExpensesData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setExpensesData([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-01 mb-2">
          Expenses Comparison
        </h1>
        <p className="text-gray-03">Lihat dan kelola pengeluaran Anda</p>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 text-primary">
          <CircularProgress color="inherit" size={50} enableTrackSlot />
          <div className="mt-4">Loading Data</div>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-20 text-red-500">
          <div>{error}</div>
        </div>
      ) : expensesData.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20 text-gray-03">
          <div>Tidak ada data expenses</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expensesData.map((expense) => (
            <CardExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Expenses;
