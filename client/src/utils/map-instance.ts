import { ref } from 'vue'
import type { Ref } from 'vue'

export const map: Ref<google.maps.Map | null> = ref(null)

export const setMap = (mapInstance: google.maps.Map) => {
  map.value = mapInstance
}

export const getMap = (): google.maps.Map | null => {
  return map.value
}
