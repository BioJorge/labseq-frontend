import React, { useState, FormEvent, CSSProperties } from "react";
import axios from "axios";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import CV from "./assets/CV_EN_Jorge_Filho.pdf";

// Define os tipos para o tema e idioma
type Theme = "light" | "dark";
type Language = "pt" | "en";

// Define as cores do tema
const themeColors = {
  light: {
    primary: "#253759",
    secondary: "#466273",
    tertiary: "#b0babf",
    background: "#c0d9d9",
    accent: "#b78c38",
    text: "#253759",
    headerBackground: "#253759",
    headerText: "#c0d9d9",
  },
  dark: {
    primary: "#c0d9d9",
    secondary: "#b0babf",
    tertiary: "#466273",
    background: "#253759",
    accent: "#b78c38",
    text: "#c0d9d9",
    headerBackground: "#466273",
    headerText: "#c0d9d9",
  },
};

// Define o texto para cada idioma
const translations = {
  pt: {
    title: "Calculadora Labseq",
    placeholder: "Digite um valor para n",
    calculate: "Calcular",
    result: "l({n}) => {result}",
    error:
      "Ocorreu um erro ao calcular o valor. Certifique-se de que n é um número inteiro não negativo.",
    downloadCV: "Baixar CV",
    copyright: "Direitos Autorais © 2024 | Jorge Filho",
  },
  en: {
    title: "Labseq Calculator",
    placeholder: "Enter a value for n",
    calculate: "Calculate",
    result: "l({n}) => {result}",
    error:
      "An error occurred while calculating the value. Make sure n is a non-negative integer.",
    downloadCV: "Download CV",
    copyright: "Copyright © 2024 | Jorge Filho",
  },
};

function App() {
  const [n, setN] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("pt");
  const [showSmallMenu, setShowSmallMenu] = useState<boolean>(false);

  // Obter as cores atuais com base no tema
  const colors = themeColors[theme];
  const text = translations[language];

  const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: colors.accent,
    position: "relative",
    zIndex: 9999,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    setN(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get<number>(
        `http://localhost:8080/labseq/${n}`
      );
      setResult(response.data);
    } catch (err) {
      setError(text.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: colors.background }}>
      <header
        style={{
          backgroundColor: colors.headerBackground,
          color: colors.headerText,
        }}
      >
        <nav className="navbar">
          <p
            style={{
              textAlign: "center",
            }}
          >
            Jorge Filho
          </p>
          <ul>
            <li>
              <a href="https://github.com/BioJorge">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jorge-sousa-filho/">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CV} download="CV_EN_Jorge_Filho.pdf" id="curriculo">
                {text.downloadCV}
              </a>
            </li>
          </ul>
        </nav>

        <div className="toggler-section">
          <i
            className={`bx bx-${
              theme === "light" ? "moon" : "sun"
            } config-toggle`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{ marginRight: "10px" }}
          ></i>

          <span
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            style={{}}
          >
            {language === "pt" ? "PT" : "EN"}
          </span>
        </div>

        <i
          className="bx bx-menu"
          onClick={() => setShowSmallMenu(!showSmallMenu)}
        ></i>
      </header>

      <div
        className={`sm-navbar ${showSmallMenu ? "active" : ""}`}
        style={{
          width: "100%",
          backgroundColor: colors.secondary,
        }}
      >
        <ul>
          <li>
            <a
              href="https://github.com/BioJorge"
              style={{
                color: theme === "light" ? "#c0d9d9" : "#000",
              }}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jorge-sousa-filho/"
              style={{
                color: theme === "light" ? "#c0d9d9" : "#000",
              }}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={CV}
              download="CV_EN_Jorge_Filho.pdf"
              id="curriculo"
              style={{
                color: theme === "light" ? "#c0d9d9" : "#000",
              }}
            >
              {text.downloadCV}
            </a>
          </li>
        </ul>
      </div>

      <main
        style={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        {loading ? (
          <ClipLoader
            loading={loading}
            cssOverride={override}
            size={250}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <div className="pre-form-container">
              <h1
                style={{
                  color: colors.primary,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {text.title}
              </h1>

              {error && <p className="error">{error}</p>}
            </div>

            {result !== null && (
              <p
                style={{
                  color: colors.accent,
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {text.result
                  .replace("{n}", n)
                  .replace("{result}", result.toString())}
              </p>
            )}

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  value={n}
                  onChange={handleInputChange}
                  placeholder={text.placeholder}
                  min="0"
                  style={{
                    backgroundColor: "#b0babf",
                    color: colors.text,
                    border: `1px solid ${colors.primary}`,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.headerText,
                  }}
                >
                  {text.calculate}
                </button>
              </form>
            </div>
          </>
        )}
      </main>

      <footer
        className="footer"
        style={{
          backgroundColor: colors.headerBackground,
          color: colors.headerText,
        }}
      >
        <nav
          className="footer-nav"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href="https://github.com/BioJorge"
            style={{
              color: "#c0d9d9",
            }}
          >
            <i className="bx bxl-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/jorge-sousa-filho/"
            style={{
              color: "#c0d9d9",
            }}
          >
            <i className="bx bxl-linkedin-square"></i>
          </a>

          <a
            href={CV}
            download="CV_EN_Jorge_Filho.pdf"
            id="curriculo"
            style={{
              color: "#c0d9d9",
            }}
          >
            <i className="bx bxs-download"></i>
          </a>
        </nav>
        <div className="footer-text">
          <p>{text.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
