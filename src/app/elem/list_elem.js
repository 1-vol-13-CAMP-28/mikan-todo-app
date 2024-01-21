'use client';
import React, { useState, useEffect } from "react";
import { edit_text_todo_js, edit_done_todo_js, delete_todo_js } from "../api/api.js";

const todo = {
  "id": '',
  "text": '',
  "done": false,
};

const MikanForm = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo ? todo.text : "");
  console.log(editTitle);

  const handleEdit = async () => {
    try {
      setIsEditing(true);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const handleSave = async () => {
    try {
      await edit_text_todo_js(todo, editTitle);
      setIsEditing(false);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await delete_todo_js(todo);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const handleDone = async () => {
    try {
      await edit_done_todo_js(todo);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <div>
      <li
        key={todo?.id}
        className="flex justify-between p-4 bg-white border-1-4 border-blue-500 rounded shadow"
      >
        {isEditing ? (
          <input
            type="text"
            className="mr-2 px-2 rounded border-gray-400 border"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <div className="flex items-center ps-3">
            <input
              defaultChecked={false}
              id="checkbox"
              type="checkbox"
              value=""
              className="peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              onClick={handleDone}
            />
            <span id="checkbox">{editTitle}</span>
          </div>
        )}

        <div>
          {isEditing ? (
            <button className="text-blue-500 mr-3" onClick={handleSave}>
              save
            </button>
          ) : (
            <button className="text-green-500 mr-3" onClick={handleEdit}>
              edit
            </button>
          )}
          <button className="text-red-500 mr-3" onClick={handleDelete}>
            delete
          </button>
        </div>
      </li>
      
    </div>
    
  );
};

export default MikanForm;
