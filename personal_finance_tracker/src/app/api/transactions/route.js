import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// ADD a transaction
export async function POST(request) {
  try {
    await connectMongoDB();
    const { amount, date, description, category } = await request.json();

    const newTransaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    return NextResponse.json(
      {
        message: "Transaction added successfully!",
        transaction: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: "Failed to add transaction" },
      { status: 500 }
    );
  }
}

// GET all transactions
export async function GET() {
  try {
    await connectMongoDB();
    const transactions = await Transaction.find().sort({ date: -1 }); // latest first
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// UPDATE a transaction
export async function PATCH(request) {
  try {
    await connectMongoDB();
    const { id, amount, date, description, category } = await request.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Transaction updated successfully!",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { message: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

// DELETE a transaction
export async function DELETE(request) {
  try {
    await connectMongoDB();
    const { id } = await request.json();

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
