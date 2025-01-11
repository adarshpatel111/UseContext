import React, { useContext, useState } from "react";
import MyContext, { MyContextProvider } from "./Context/Context";

const App = () => {
  const { items, addItem, removeItem, updateItem, setItems } =
    useContext(MyContext);
  const [newItem, setNewItem] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  const handleAddItem = () => {
    if (newItem) {
      addItem(newItem);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    removeItem(index);
  };

  const handleEditbtnClicked = (index, item) => {
    setSelectedItemIndex(index);
    setNewItem(item);
    setEditClicked(true);
  };

  const handleUpdateItem = () => {
    let data = [...items];
    data[selectedItemIndex] = newItem;
    setItems(data);
    setNewItem("");
    setEditClicked(false);
  };

  const handleCancelEdit = () => {
    setEditClicked(false);
    setNewItem("");
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Global Shopping List</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.itemInput}
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item"
        />
        {editClicked ? (
          <>
            <button style={styles.addButton} onClick={handleUpdateItem}>
              Update
            </button>
            <button style={styles.addButton} onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button style={styles.addButton} onClick={handleAddItem}>
            Add Item
          </button>
        )}
      </div>

      <ul style={styles.itemList}>
        {items.length === 0 ? (
          <li style={styles.emptyMessage}>No items in the list</li>
        ) : (
          items.map((item, index) => (
            <li key={index} style={styles.item}>
              <div>{item}</div>
              <div>
                {!editClicked && (
                  <>
                    <button
                      style={styles.updateButton}
                      onClick={() => handleEditbtnClicked(index, item)}
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Wrap the entire app with the MyContextProvider to provide access to the context
const Root = () => (
  <MyContextProvider>
    <App />
  </MyContextProvider>
);

export default Root;

// Inline styles
const styles = {
  appContainer: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "400px",
    margin: "auto",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    width: "100%",
  },
  itemInput: {
    width: "70%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    width: "25%",
    padding: "8px",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  itemList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    width: "100%",
    overflow: "auto",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f1f1f1",
    fontSize: "1rem",
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    margin: "10px",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  removeButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
};
