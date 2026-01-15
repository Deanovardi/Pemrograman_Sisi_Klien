import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "../Elements/Button";
import LabeledInput from "../Elements/Input";
import { createGoalService } from "../../services/dataService";

function CreateGoalModal({ open, onClose, onSuccess }) {
  const [targetAmount, setTargetAmount] = useState("");
  const [presentAmount, setPresentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    try {
      // Validation
      if (!targetAmount || isNaN(targetAmount) || targetAmount <= 0) {
        setError("Target amount harus berisi angka lebih dari 0");
        return;
      }

      if (presentAmount && (isNaN(presentAmount) || presentAmount < 0)) {
        setError("Present amount tidak boleh negatif");
        return;
      }

      setLoading(true);
      setError(null);

      const present = presentAmount ? parseInt(presentAmount) : 0;
      const target = parseInt(targetAmount);

      await createGoalService(target, present);

      // Reset form
      setTargetAmount("");
      setPresentAmount("");

      // Close modal and trigger refresh
      onClose();
      onSuccess();
    } catch (err) {
      setError(err.msg || "Gagal membuat goals");
      console.error("Error creating goal:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTargetAmount("");
    setPresentAmount("");
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="font-bold">Buat Target Keuangan</DialogTitle>
      <DialogContent className="pt-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-01">
            Target Amount *
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Contoh: 200000"
            className="w-full px-4 py-2 border border-gray-05 rounded-lg focus:outline-none focus:border-primary"
            disabled={loading}
          />
          <p className="text-xs text-gray-03 mt-1">
            Total target keuangan yang ingin Anda capai
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-01">
            Present Amount (Optional)
          </label>
          <input
            type="number"
            value={presentAmount}
            onChange={(e) => setPresentAmount(e.target.value)}
            placeholder="Contoh: 50000"
            className="w-full px-4 py-2 border border-gray-05 rounded-lg focus:outline-none focus:border-primary"
            disabled={loading}
          />
          <p className="text-xs text-gray-03 mt-1">
            Jumlah yang sudah dicapai (default: 0)
          </p>
        </div>
      </DialogContent>
      <DialogActions className="p-4">
        <button
          onClick={handleClose}
          disabled={loading}
          className="px-4 py-2 text-gray-01 hover:bg-gray-05 rounded transition"
        >
          Batal
        </button>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Buat"}
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGoalModal;
