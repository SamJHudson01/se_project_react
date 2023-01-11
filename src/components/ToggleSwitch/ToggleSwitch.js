const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    context.handleToggleSwitchChange();
  };

  return (
    <CurrentTemperatureUnitContext.Consumer>
      {(context) => {
        return (
          <>
            <input
              className="toggle-switch__checkbox"
              id={`react-switch-new`}
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
            />
            <label
              className="toggle-switch__label"
              htmlFor={`react-switch-new`}
            >
              <p
                className={`toggle-switch__label-farenheit ${
                  isChecked ? "grey" : "white"
                }`}
              >
                F
              </p>
              <p
                className={`toggle-switch__label-celsius ${
                  isChecked ? "white" : "grey"
                }`}
              >
                C
              </p>
              <span className={`toggle-switch__button`} />
            </label>
          </>
        );
      }}
    </CurrentTemperatureUnitContext.Consumer>
  );
};

export default ToggleSwitch;
