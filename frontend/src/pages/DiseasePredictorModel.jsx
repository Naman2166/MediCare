import React, { useState } from "react";

export default function DiseasePredictorModel() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const symptomsList = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "vomiting",
    "fatigue",
    "headache",
    "nausea",
    "loss_of_appetite",
    "high_fever",
  ];

  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((s) => s.filter((x) => x !== symptom));
    } else {
      setSelectedSymptoms((s) => [...s, symptom]);
    }
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select symptoms!");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Backend error. Check console or backend server.");
    }

    setLoading(false);
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 p-6 -mt-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[83vh]">
        {/* Left: Input Panel */}
        <aside className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
          <header className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">🩺 Symptom-Based Predictor</h1>
            {/* <p className="text-sm text-gray-600 mt-1">Select symptoms on the left and tap <span className="font-semibold text-indigo-600">Predict</span>.</p> */}
          </header>

          <section className="flex-1 overflow-auto">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Select Symptoms</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {symptomsList.map((symptom) => {
                const selected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomSelect(symptom)}
                    aria-pressed={selected}
                    className={`p-3 text-sm text-center rounded-lg border transition-all duration-150 text-left break-words ${
                      selected
                        ? "bg-indigo-600 text-white border-indigo-700"
                        : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                    }`}
                  >
                    {symptom.replace(/_/g, " ")}
                  </button>
                );
              })}
            </div>
          </section>

          <footer className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              Selected: <span className="font-medium text-indigo-600">{selectedSymptoms.join(", ") || "None"}</span>
            </p>

            <button
              onClick={handlePredict}
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition-all ${
                loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </footer>
        </aside>

        {/* Right: Result Panel */}
        <main className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-indigo-700 text-center mb-3">Prediction Result</h2>

          {/* Empty state when no prediction */}
          {!prediction && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <p className="text-gray-600">No prediction yet.<br />
              Choose Symptoms and click <span className="font-semibold text-indigo-600">Predict</span>, the result will appear here.</p>
              <div className="mt-5 w-full max-w-sm">
                <div className=" rounded-lg p-4">
                  <p className="text-sm text-gray-500">Tip: choose 2–6 relevant symptoms for better results.</p>
                </div>
              </div>
            </div>
          )}

          {/* Show prediction */}
          {prediction && (
            <div className="flex-1 overflow-auto">
              <div className="text-center">
                <p className="text-3xl font-bold mt-2 text-green-700">{(prediction.predicted_disease || "Unknown").toUpperCase()}</p>
                <p className="text-sm text-gray-600 mt-2">Confidence: <span className="font-semibold text-indigo-600">{prediction.confidence ? (prediction.confidence * 100).toFixed(2) + "%" : "N/A"}</span></p>
              </div>

              <section className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Top Possible Diseases</h3>
                <div className="space-y-2">
                  {Array.isArray(prediction.top_matches) && prediction.top_matches.length > 0 ? (
                    prediction.top_matches.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{item.disease}</div>
                          <div className="text-xs text-gray-500 mt-1">Probability: {(item.prob * 100).toFixed(2)}%</div>
                        </div>
                        <div className="text-sm font-medium text-indigo-600">#{idx + 1}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No top matches returned by the model.</p>
                  )}
                </div>
              </section>

              {/* raw output for debugging (small) */}
              {/* <details className="mt-6 text-sm text-gray-500">
                <summary className="cursor-pointer">Show raw response</summary>
                <pre className="mt-2 text-xs bg-gray-50 rounded p-3 overflow-auto">{JSON.stringify(prediction, null, 2)}</pre>
              </details> */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
