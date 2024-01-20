'use client';
import React, { useState, useEffect } from 'react';

function createTable(taskData) {
    let tableHTML = '<table border="1">';
    tableHTML += '<tr>';
    for (const key in taskData[0]){
        tableHTML += `<th>${key}</th>`;
    }
    tableHTML += '</tr>';
    taskData.forEach(task => {
        tableHTML += '<tr>';
        for (const key in task) {
        tableHTML += `<td>${task[key]}</td>`;
        }
        tableHTML += '</tr>';
    });
    tableHTML += '</table>';
    return tableHTML;
}


const MikanList = () => {
    const test = {
      "tasks": [
        {
          "TaskID": 1,
          "UID": 1,
          "taskDetail": "Complete project proposal",
          "category": "Work",
          "registrationDate": "2022-01-20",
          "deadline": "2022-01-30",
          "taskStatus": "In Progress"
        },
        {
          "TaskID": 2,
          "UID": 1,
          "taskDetail": "Exercise for 30 minutes",
          "category": "Personal",
          "registrationDate": "2022-01-22",
          "deadline": "2022-02-05",
          "taskStatus": "Pending"
        },
        {
          "TaskID": 3,
          "UID": 2,
          "taskDetail": "Read a book",
          "category": "Personal",
          "registrationDate": "2022-01-25",
          "deadline": "2022-02-10",
          "taskStatus": "New"
        },
      ]
    };
    test.tasks.forEach((TaskData) =>{
      console.log(TaskData.TaskID);
  });

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div dangerouslySetInnerHTML={{ __html: createTable(test.tasks) }} />
      </main>
    );
  };
  
  export default MikanList;
  