import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const questions = [
  "Are you carrying on or starting a business in Australia?",
  "Are you an Australian resident or a foreign entity operating in Australia?",
  "Do you need an ABN to interact with the Australian Tax Office?",
];

const EligibilityChecker = () => {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const eligible = answers.every((a) => a === true);

  const handleAnswer = (index: number, value: boolean) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    setSubmitted(false);
  };

  return (
    <section id="eligibility" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">ABN Eligibility Checker</h2>
          <p className="mb-6 text-muted-foreground">Answer a few questions to see if you qualify for an ABN.</p>

          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-4">
                <p className="mb-3 text-sm font-medium text-foreground">{q}</p>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant={answers[i] === true ? "hero" : "outline"}
                    onClick={() => handleAnswer(i, true)}
                  >
                    Yes
                  </Button>
                  <Button
                    size="sm"
                    variant={answers[i] === false ? "destructive" : "outline"}
                    onClick={() => handleAnswer(i, false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {allAnswered && (
            <Button
              variant="hero"
              className="mt-6 w-full"
              onClick={() => setSubmitted(true)}
            >
              Check Eligibility
            </Button>
          )}

          {submitted && (
            <div className={`mt-6 flex items-center gap-3 rounded-lg p-4 ${
              eligible ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
            }`}>
              {eligible ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-medium">You are likely eligible for an ABN! Start your application now.</p>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  <p className="font-medium">Based on your answers, you may not be eligible. Contact us for assistance.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;
