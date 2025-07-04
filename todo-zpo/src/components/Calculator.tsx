import { useState } from "react";

export default function Calculator() {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [visible, setVisible] = useState(false);

    const calculate = () => {
        try {
            setResult(eval(expression));
        } catch {
            setResult(NaN);
        }
    };

    return (
        <div className="calculator-container">
            <button className="toggle-calculator" onClick={() => setVisible(!visible)}>
                🧮 Kalkulator
            </button>
            {visible && (
                <div className="calculator">
                    <input
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="np. 2+2"
                    />
                    <button onClick={calculate}>Oblicz</button>
                    {result !== null && <p>Wynik: {result}</p>}
                </div>
            )}
        </div>
    );
}
