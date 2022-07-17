import React, {useEffect, useState} from 'react'

const Marker = (position) => {
  const [marker, setMarker] = useState()

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker())
    }
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker && !(position instanceof window.google.maps.LatLng)) {
      marker.setOptions(position)
    }
  }, [marker, position])


  return (null)
}

export default Marker