import React, { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import "../App.css";
const translations = {
  en: {
    questions: [
      "Do you have a fever?",
      "Do you feel nauseous or weak?",
      "Do you have a headache or chills?",
    ],
    malaria:
      "🟡 You may have symptoms related to Malaria. Please consult a healthcare provider.",
    healthy:
      "🟢 Symptoms don’t strongly match major conditions. Stay hydrated and monitor your health.",
    yes: "✅ Yes",
    no: "❌ No",
  },
  yo: {
    questions: [
      "Ṣe o ni iba?",
      "Ṣe o n rẹ tabi o n da ara rẹ loju?",
      "Ṣe o ni irora orí tabi tutù?",
    ],
    malaria: "🟡 O le ni aami arun palara. Jọwọ ṣàbẹwò si dokita kan.",
    healthy:
      "🟢 Aami ko fi hàn pé o ní àìlera tó le. Mura sile, máa mu omi púpọ̀.",
    yes: "✅ Bẹẹni",
    no: "❌ Rárá",
  },
  ig: {
    questions: [
      "Ị nwere ọrịa ọkụ?",
      "Ị na-enwe ntachi obi ma ọ bụ adịghị ike?",
      "Ị nwere mgbu isi ma ọ bụ oyi?",
    ],
    malaria: "🟡 Ị nwere ike inwe mgbaàmà malaria. Biko hụ dọkịta.",
    healthy: "🟢 Mgbaàmà adịghị egosipụta ọrịa dị ukwuu. Nọgidenụ n’ịṅụ mmiri.",
    yes: "✅ Ee",
    no: "❌ Mba",
  },
  ha: {
    questions: [
      "Kana da zazzabi?",
      "Kana jin kasala ko rashin lafiya?",
      "Kana da ciwon kai ko sanyi?",
    ],
    malaria: "🟡 Watakila kana da alamun Maleriya. Da fatan za a ga likita.",
    healthy: "🟢 Babu manyan alamun rashin lafiya. Ci gaba da shan ruwa.",
    yes: "✅ Eh",
    no: "❌ A'a",
  },
};

function SymptomChecker() {
  const [language, setLanguage] = useState("en");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const currentLang = translations[language];
  const questions = currentLang.questions;

  useEffect(() => {
    if (currentQIndex < questions.length && !result) {
      speak(questions[currentQIndex], language);
    }
  }, [currentQIndex, language]);

  const speak = (text, lang) => {
    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        lang === "yo"
          ? "yo-NG"
          : lang === "ig"
          ? "ig-NG"
          : lang === "ha"
          ? "ha-NG"
          : "en-US";
      synth.cancel();
      synth.speak(utterance);
    }
  };

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQIndex]: answer,
    }));

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      const finalAnswers = { ...answers, [currentQIndex]: answer };
      calculateResult(finalAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const yesCount = Object.values(finalAnswers).filter(
      (ans) =>
        ans.includes("Yes") ||
        ans.includes("Ee") ||
        ans.includes("Bẹẹni") ||
        ans.includes("Eh")
    ).length;
    const finalMessage =
      yesCount >= 2 ? currentLang.malaria : currentLang.healthy;
    setResult(finalMessage);
    speak(finalMessage, language);
  };

  return (
    <div id="sym" className="text-center">
      <LanguageSelector selectedLang={language} onChange={setLanguage} />
      {result ? (
        <div className="mt-6 px-4 py-6 bg-green-50 border border-green-200 rounded-xl shadow-md animate-fade-in">
          <p className="text-lg text-gray-800 font-semibold">{result}</p>
        </div>
      ) : (
        <>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-gray-800 text-xl font-medium mb-6 animate-fade-in">
            {questions[currentQIndex]}
          </p>
          <div id="btns" className="flex justify-center gap-6">
            <button
              id="btn1"
              onClick={() => handleAnswer(currentLang.yes)}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow hover:scale-105 transition"
            >
              {currentLang.yes}
            </button>
            <button
              id="btn2"
              onClick={() => handleAnswer(currentLang.no)}
              className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow hover:scale-105 transition"
            >
              {currentLang.no}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SymptomChecker;
