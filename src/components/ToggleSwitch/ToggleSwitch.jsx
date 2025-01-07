import './ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../../contexts/AppContexts';
import { useContext } from 'react';

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="ToggleSwitch">
      <input
        type="checkbox"
        className="ToggleSwitch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === 'F'
            ? 'ToggleSwitch__slider ToggleSwitch__slider-F'
            : 'ToggleSwitch__slider ToggleSwitch__slider-C'
        }
      ></span>
      <p
        className={`ToggleSwitch__temp-C ${currentTemperatureUnit === 'C' && 'ToggleSwitch__active'}`}
      >
        C
      </p>
      <p
        className={`ToggleSwitch__temp-F ${currentTemperatureUnit === 'F' && 'ToggleSwitch__active'}`}
      >
        F
      </p>
    </label>
  );
}

export default ToggleSwitch;
