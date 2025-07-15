import React from "react";

function LanguageSelector({ selectedLang, onChange }) {
  return (
    <div className="mb-4 text-center">
      <label htmlFor="language" className="mr-2 font-semibold text-gray-600">🌐 Language:</label>
      <select
        id="language"
        value={selectedLang}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-full shadow-sm focus:ring-green-500"
      >
        <option value="en">English 🇬🇧</option>
        <option value="yo">Yoruba 🥁</option>
        <option value="ig">Igbo 🛖</option>
        <option value="ha">Hausa 🏜️</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
