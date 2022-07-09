import React from "react"
import { createCustomEqual } from "fast-equals"
import { isLatLngLiteral } from "@googlemaps/typescript-guards"
import { Wrapper, Status } from '@googlemaps/react-wrapper'


export const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof window.google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }
    // TODO extend to other types
    // use fast-equals for other objects
    return deepEqual(a, b);
  });

export function useDeepCompareMemoize(value) {
    const ref = React.useRef();
  
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
    return ref.current;
  }


export function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }


export function isAnswerCloseEnough(guess, answer) {
  const distance = window.google.maps.geometry.spherical.computeDistanceBetween(guess, answer)

  if (distance < 10000) return true
  else return false
}