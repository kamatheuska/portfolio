import { useState } from "react";

export function useFccTestToggle() {
    const [isFccTestSuiteVisible, setIsFccTestSuiteVisible] = useState(false);

    const toggleFccTestSuit = () => {
      setIsFccTestSuiteVisible(!isFccTestSuiteVisible);
  
      const newDisplay = isFccTestSuiteVisible ? 'none' : '';
      document.querySelector('#fcc_test_suite_wrapper').style.display = newDisplay;
    }
    
    return [toggleFccTestSuit];
}