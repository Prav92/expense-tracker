import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import type { Expense } from "../../App";

import { useCategoriesList } from "@/hooks/useCatagoriesList";

interface AddExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: Omit<Expense, "id">) => void;
}

export interface Category {
  id: string;
  created_at: string;
  name: string;
}



export function AddExpenseForm({
  open,
  onOpenChange,
  onSubmit,
}: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    category_id: null,
    date: new Date().toISOString().split("T")[0],
    type: "expense" as "expense" | "income",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, isLoading } = useCategoriesList();

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.description ||
      !formData.category
    ) {
      return;
    }

    const matchedCategory = categories.find(
      (cat) => cat.name === formData.category
    );
    const categoryId = matchedCategory
      ? parseInt(matchedCategory.id, 10)
      : null;

    onSubmit({
      amount: parseFloat(formData.amount),
      description: formData.description,
      category_id: categoryId,
      date: formData.date,
      user_id: 1, // Assuming a static user_id for now
      type: formData.type,
    });

    // Reset form
    setFormData({
      amount: "",
      description: "",
      category: "",
      category_id: null,
      date: new Date().toISOString().split("T")[0],
      type: "expense",
    });
  
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="my-3">Transaction Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) =>
                handleInputChange("type", value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" className="border-1 border-gray-300"/>
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" className="border-1 border-gray-300"/>
                <Label htmlFor="income">Income</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              className="bg-gray-50 border-1 border-gray-300"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                handleInputChange("amount", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description..."
              className="bg-gray-50 border-1 border-gray-300"
              value={formData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleInputChange("category", value)
              }
            >
              <SelectTrigger className="bg-gray-50 border-1 border-gray-300 w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              {!isLoading && <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              className="bg-gray-50 border-1 border-gray-300"
              value={formData.date}
              onChange={(e) =>
                handleInputChange("date", e.target.value)
              }
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add{" "}
              {formData.type === "expense"
                ? "Expense"
                : "Income"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}