import React from "react";

function LanguageSelector({ selectedLang, onChange }) {
  return (
    <div className="mb-4 text-center">
      <label htmlFor="language" className="mr-2 font-medium text-gray-600">Select Language:</label>
      <select
        id="language"
        value={selectedLang}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="en">English</option>
        <option value="yo">Yoruba</option>
        <option value="ig">Igbo</option>
        <option value="ha">Hausa</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
