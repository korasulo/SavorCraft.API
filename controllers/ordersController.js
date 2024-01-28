const express = require("express");
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");

const db = require("../db");
const app = express();
app.use(bodyParser.json());

const getOrder = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM orders";

  try {
    const [...rows] = await db.query(query);
    //console.log("Rows from the database:", rows); // Log the results
    res.json(rows);
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).send("Internal Server Error");
  }
});

const postOrder = asyncHandler(async (req, res) => {
  const order = req.body;

  try {
    const columnsToInsert = Object.keys(order).join(", ");
    const valuesToInsert = Object.values(order);
    const placeholders = valuesToInsert.map(() => "?").join(", ");

    const insertQuery = `INSERT INTO orders (${columnsToInsert}) VALUES (${placeholders})`;
    console.log(`Order created successfully`);

    await db.query(insertQuery, valuesToInsert);

    res.status(201).send("Order created successfully");
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).send("Internal Server Error");
  }
});

const putOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const updatedOrder = req.body;

  try {
    const columnsToUpdate = Object.keys(updatedOrder)
      .map((column) => `${column} = ?`)
      .join(", ");
    const valuesToUpdate = Object.values(updatedOrder);

    valuesToUpdate.push(orderId);

    const updateQuery = `UPDATE orders SET ${columnsToUpdate} WHERE id = ?`;
    console.log(`Order with id ${orderId} updated successfully`);

    await db.query(updateQuery, valuesToUpdate);
    res.send("Order updated successfully");
  } catch (err) {
    console.error("Database update failed", err);
    res.status(500).send("Internal Server Error");
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  try {
    const deleteQuery = `DELETE FROM orders WHERE id = ?`;
    await db.query(deleteQuery, [orderId]);

    console.log(`Order with id ${orderId} deleted successfully`);
    res.send("Order deleted successfully");
  } catch (err) {
    console.error("Database query failed", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { getOrder, postOrder, putOrder, deleteOrder };
