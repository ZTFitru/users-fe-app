import React from "react";
import { useNavigate } from "react-router-dom";

import "./ErrorPage.css";

function ErrorPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate("/");
    };

    return (
      <section className="error-page-section">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button onClick={handleGoBack}>Back to login</button>
      </section>
    );
}

export default ErrorPage;
