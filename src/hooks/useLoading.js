/*
 *
 * Project: winshot-crm
 * File Created: 28 June 2021 13:33
 * Author: Bouhouch Amjed (amjedbouhouch@gmail.com)
 * -----
 * Last Modified: 09 August 2021 20:25
 * -----
 * Copyright 2021
 */
import { useState } from "react";

export function useLoading(defaultValue = false) {
  const [loading, setLoading] = useState(defaultValue);
  const stopLoading = () => {
    setLoading(false);
  };
  const startLoading = () => {
    setLoading(true);
  };
  return {
    isLoading: loading,
    stopLoading,
    startLoading,
  };
}
