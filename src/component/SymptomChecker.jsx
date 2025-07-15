import React, { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";

const translations = {
  en: {
    questions: [
      "Do you have a fever?",
      "Do you feel nauseous or weak?",
      "Do you have a headache or chills?",
    ],
    malaria: "🟡 You may have symptoms related to Malaria. Please consult a healthcare provider.",
    healthy: "🟢 Symptoms don’t strongly match major conditions. Stay hydrated and monitor your health.",
    yes: "Yes",
    no: "No",
  },
  yo: {
    questions: [
      "Ṣe o ni iba?",
      "Ṣe o n rẹ tabi o n da ara rẹ loju?",
      "Ṣe o ni irora orí tabi tutù?",
    ],
    malaria: "🟡 O le ni aami arun palara. Jọwọ ṣàbẹwò si dokita kan.",
    healthy: "🟢 Aami ko fi hàn pé o ní àìlera tó le. Mura sile, máa mu omi púpọ̀.",
    yes: "Bẹẹni",
    no: "Rárá",
  },
  ig: {
    questions: [
      "Ị nwere ọrịa ọkụ?",
      "Ị na-enwe ntachi obi ma ọ bụ adịghị ike?",
      "Ị nwere mgbu isi ma ọ bụ oyi?",
    ],
    malaria: "🟡 Ị nwere ike inwe mgbaàmà malaria. Biko hụ dọkịta.",
    healthy: "🟢 Mgbaàmà adịghị egosipụta ọrịa dị ukwuu. Nọgidenụ n’ịṅụ mmiri.",
    yes: "Ee",
    no: "Mba",
  },
  ha: {
    questions: [
      "Kana da zazzabi?",
      "Kana jin kasala ko rashin lafiya?",
      "Kana da ciwon kai ko sanyi?",
    ],
    malaria: "🟡 Watakila kana da alamun Maleriya. Da fatan za a ga likita.",
    healthy: "🟢 Babu manyan alamun rashin lafiya. Ci gaba da shan ruwa.",
    yes: "Eh",
    no: "A'a",
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
      utterance.lang = lang === "yo" ? "yo-NG" : lang === "ig" ? "ig-NG" : lang === "ha" ? "ha-NG" : "en-US";
      synth.cancel(); // Cancel any ongoing speech
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
    const yesCount = Object.values(finalAnswers).filter((ans) => ans === "yes").length;
    const finalMessage = yesCount >= 2 ? currentLang.malaria : currentLang.healthy;
    setResult(finalMessage);
    speak(finalMessage, language);
  };

  if (result) {
    return (
      <div className="text-center">
        <LanguageSelector selectedLang={language} onChange={setLanguage} />
        <p className="text-lg text-gray-700">{result}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <LanguageSelector selectedLang={language} onChange={setLanguage} />
      <p className="text-gray-800 text-lg mb-6">{questions[currentQIndex]}</p>
      <div className="flex justify-center gap-4">
        <button onClick={() => handleAnswer("yes")} className="px-4 py-2 bg-green-600 text-white rounded-full">
          {currentLang.yes}
        </button>
        <button onClick={() => handleAnswer("no")} className="px-4 py-2 bg-red-500 text-white rounded-full">
          {currentLang.no}
        </button>
      </div>
    </div>
  );
}

export default SymptomChecker;
