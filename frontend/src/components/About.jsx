// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">About Shortly</h1>

      <p className="text-lg mb-4">
        Welcome to <strong>Shortly</strong>, your simple and efficient URL shortener tool.
        In today's fast-paced digital world, long and complicated URLs can get in the way.
        Shortly helps you shorten, manage, and share your links easily.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔍 Why Use This URL Shortener?</h2>
      <ul className="list-disc list-inside mb-4">
        <li>✅ <strong>Clean & Simple</strong>: Convert long URLs into short, user-friendly links.</li>
        <li>📊 <strong>Trackable</strong>: (Optional) Add analytics to track click performance.</li>
        <li>🔒 <strong>Secure</strong>: All URLs are safely stored and redirected.</li>
        <li>⚡ <strong>Fast</strong>: Built using the modern MERN stack for quick performance.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🛠️ Tech Stack</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Frontend</strong>: React.js</li>
        <li><strong>Backend</strong>: Node.js + Express</li>
        <li><strong>Database</strong>: MongoDB</li>
        <li><strong>Routing</strong>: Custom short codes with redirect logic</li>
        <li><strong>Tools</strong>: Axios, Mongoose, Tailwind CSS (optional)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">👨‍💻 Developer</h2>
      <p className="mb-4">
        This project was built to explore full-stack development with real-world functionality.
        Contributions, suggestions, and ideas are welcome!
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📫 Contact</h2>
      <p className="mb-2">📧 Email: <a href="mailto:your.email@example.com" className="text-blue-500 underline">your.email@example.com</a></p>
      <p>🔗 GitHub: <a href="https://github.com/yourprofile/url-shortener" className="text-blue-500 underline">github.com/yourprofile/url-shortener</a></p>
    </div>
  );
};

export default About;
