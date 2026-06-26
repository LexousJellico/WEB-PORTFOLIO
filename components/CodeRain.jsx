const codeColumns = [
  ["const", "UI", "=", "responsive", "Laravel", "React", "deploy"],
  ["npm", "run", "verify", "200", "API", "OK", "ship"],
  ["RFID", "tap", "fare", "GPS", "route", "sync", "log"],
  ["SQL", "query", "model", "view", "cache", "auth", "safe"],
  ["tailwind", "motion", "grid", "hover", "focus", "aria", "seo"],
  ["git", "commit", "push", "build", "lint", "audit", "zero"],
];

const CodeRain = () => {
  return (
    <div className="code-rain" aria-hidden="true">
      {codeColumns.map((tokens, index) => (
        <span
          className="code-rain-column"
          style={{
            "--column-left": `${8 + index * 16}%`,
            "--column-delay": `${index * -1.2}s`,
            "--column-duration": `${12 + index * 1.4}s`,
          }}
          key={tokens.join("-")}
        >
          {[...tokens, ...tokens].map((token, tokenIndex) => (
            <span key={`${token}-${tokenIndex}`}>{token}</span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default CodeRain;
