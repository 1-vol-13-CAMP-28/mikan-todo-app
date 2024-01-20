'use client';
import React, { useState, useEffect } from 'react';

const MikanForm = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api');
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    task: '',
    task_detail: '',
    task_deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
  };
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <p>みかん名</p>
          <input type="text" id="task" name="task" value={formData.task} onChange={handleChange} />
        </div>
        <div>
          <p>みかんの詳細</p>
          <input type="text" id="task_detail" name="task_detail" value={formData.task_detail} onChange={handleChange} />
        </div>
        <div>
          <p>みかんの期限</p>
          <input type="date" id="task_deadline" name="task_deadline" value={formData.task_deadline} onChange={handleChange} />
        </div>
        <input type="submit" value="送信する" />
      </form>
    </main>
  );
};

export default MikanForm;
