import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  background: none;
  border: none;
  min-width: 120px;
  height: 30px;
  &:focus {
    outline: none;
  }
  background-color: ${props =>
    props.success
      ? `rgba(46, 204, 113, 1.0)`
      : props.error
      ? `rgba(231, 76, 60,1.0)`
      : `rgba(52, 152, 219, 1)`};
  color: white;
  font-size: 1.1em;
  transition: background-color 200ms ease;
  & > i {
    animation: ${props =>
      props.success ? `animate 1s` : props.error ? `animate 1s` : ``};
  }

  @keyframes animate {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

function ButtonWithLoader({ loading, error, label, success, ...rest }) {
  if (!success && !error && !loading) {
    return (
      <Button loading={loading} error={error} success={success} {...rest}>
        {label}
      </Button>
    );
  }

  let iconClassName = "";
  if (loading) {
    iconClassName = "fas fa-spinner fa-spin";
  } else if (success) {
    iconClassName = "fas fa-check-circle";
  } else {
    iconClassName = "fas fa-times-circle";
  }

  return (
    <Button loading={loading} error={error} success={success} {...rest}>
      <i className={iconClassName} />
    </Button>
  );
}

ButtonWithLoader.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool
};

ButtonWithLoader.defaultProps = {
  error: false,
  loading: false,
  success: false
};

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <Container>
      <ButtonWithLoader
        loading={loading}
        error={error}
        success={success}
        label="Save"
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setError(true);
          }, 1000);
          setTimeout(() => {
            setError(false);
            setSuccess(true);
          }, 2000);
        }}
        disabled={error || success || loading}
      />
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
