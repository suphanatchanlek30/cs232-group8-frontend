// components/report-incident/description-field.tsx

"use client";

import { Mic, Square } from "lucide-react";
import { useRef, useState } from "react";
import type {
  SpeechRecognitionType,
  SpeechRecognitionEventLike,
  DescriptionFieldProps,
} from "./types";

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType;
    webkitSpeechRecognition?: new () => SpeechRecognitionType;
  }
}

export default function DescriptionField({
  value,
  onChange,
}: DescriptionFieldProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("เบราว์เซอร์นี้ยังไม่รองรับการแปลงเสียงเป็นข้อความ");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "th-TH";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }

      onChange(transcript.trim());
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <section>
      <label className="mb-2 block text-base font-medium text-(--color-text)">
        Describe what happened.
      </label>

      <div className="grid gap-4 md:grid-cols-[1fr_150px]">
        <div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="อธิบายเหตุการณ์ที่เกิดขึ้น..."
            className="min-h-[140px] w-full rounded-2xl border border-neutral-400 bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
          />
          <p className="mt-2 text-xs text-(--color-subtext)">
            (เกิดอะไรขึ้น, ที่ไหน, รูปแบบไหน)
          </p>
        </div>

        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`flex min-h-[100px] flex-col items-center justify-center rounded-xl border px-3 py-3 text-center transition ${
            isListening
              ? "border-(--color-primary) bg-(--primary-soft) text-(--color-primary)"
              : "border-neutral-300 bg-(--color-muted) text-(--color-subtext) hover:bg-neutral-200"
          }`}
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            {isListening ? <Square size={26} /> : <Mic size={26} />}
          </div>

          <span className="text-sm font-medium">
            {isListening ? "กำลังฟัง..." : "Speak instead of typing"}
          </span>

          <span className="mt-1 text-xs text-(--color-subtext)">
            รองรับภาษาไทย
          </span>
        </button>
      </div>
    </section>
  );
}