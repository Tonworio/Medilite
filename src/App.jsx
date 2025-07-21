import React from "react";
import SymptomChecker from "./components/SymptomChecker";
import "./App.css";

function App() {
  return (
    <div
    /*className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center p-4"*/
    >
      <div
      /*className="max-w-lg w-full bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-green-200 animate-fade-in"*/
      >
        <div className="interface">
          <h1
            className="text" /*className="text-3xl font-bold text-green-800 mb-6 text-center font-[Inter]"*/
          >
            🌿 MediLite Symptom Checker
          </h1>
          <SymptomChecker />
        </div>
      </div>
    </div>
  );
}

export default App;
