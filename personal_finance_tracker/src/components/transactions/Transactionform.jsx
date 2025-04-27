"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.amount || !formData.date || !formData.description) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();

        setFormData({ amount: "", date: "", description: "", category: "" });
      } else {
        alert("Failed to add transaction.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <div>
        <Label>Amount*</Label>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Date*</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Description*</Label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Category (optional)</Label>
        <Input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}
