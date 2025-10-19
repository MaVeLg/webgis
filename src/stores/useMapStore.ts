import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import maplibregl, { Map, LngLatLike, MapOptions, MapStyle } from 'maplibre-gl'

type MapStatus = 'idle' | 'initializing' | 'ready' | 'error'
export type Coords = { lng: number; lat: number } | null

export const useMapStore = defineStore('map', {
  state: () => ({
    // Map-Instanz als shallow state, damit Pinia/Proxy nicht eingreift
    map: null as Map | null,
    status: 'idle' as MapStatus,
    lastError: null as unknown,
    coords: null as Coords,
    zoom: 0 as number
  }),

  getters: {
    isReady: (s) => s.status === 'ready' && !!s.map,
    instance: (s) => s.map as Map | null,
  },

  actions: {
    /**
     * Initialisiert die MapLibre-Map, falls noch nicht vorhanden.
     * idOrEl: HTMLElement oder string (DOM-ID) eines bestehenden Containers.
     */
    async initMap(
      idOrEl: string | HTMLElement,
      opts: Partial<MapOptions> & {
        center?: LngLatLike
        zoom?: number
        style?: string | MapStyle
      } = {},
    ) {
      if (this.map) return this.map
      this.status = 'initializing'
      this.lastError = null

      try {
        // Container auflösen
        const container =
          typeof idOrEl === 'string' ? (document.getElementById(idOrEl) as HTMLElement | null) : idOrEl

        if (!container) {
          throw new Error('Map container not found')
        }

        const {
          style = 'https://demotiles.maplibre.org/style.json',
          center = [8.6821, 50.1109], // Frankfurt a.M. 😉
          zoom = 10,
          ...rest
        } = opts

        const map = new maplibregl.Map({
          container,
          style,
          center,
          zoom,
          attributionControl: true,
          ...rest,
        })

        console.log("rest=", rest)

        this.zoom = zoom

        // Standard-Controls (optional)
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right')
        map.addControl(new maplibregl.ScaleControl({ maxWidth: 200, unit: 'metric' }))

        await new Promise<void>((resolve) => { map.once('load', () => resolve()) })

        this.map = markRaw(map)
        this.status = 'ready'

        // Event listeners
        map.on('zoom', () => {
          this.zoom = map.getZoom()
        })

        return map
      } catch (err) {
        this.lastError = err
        this.status = 'error'
        console.error('[useMapStore] initMap error:', err)
        throw err
      }
    },

    /**
     * Setzt Style neu; optional mit Style-Params.
     * Achtung: Quellen/Layers werden beim Stylewechsel zurückgesetzt (MapLibre-Standard).
     */
    async setStyle(style: string | MapStyle, options?: { diff?: boolean }) {
      if (!this.map) return
      await new Promise<void>((resolve) => {
        this.map!.setStyle(style, options)
        this.map!.once('styledata', () => resolve())
      })
    },

    resize() {
      this.map?.resize()
    },

    flyTo(center: LngLatLike, zoom?: number) {
      if (!this.map) return
      this.map.flyTo({ center, zoom })
    },

    setCenter(center: LngLatLike) {
      this.map?.setCenter(center)
    },

    setZoom(zoom: number) {
      this.map?.setZoom(zoom)
      this.zoom = zoom
    },

    addSource(id: string, source: maplibregl.AnySourceData) {
      if (!this.map) return
      if (this.map.getSource(id)) this.map.removeSource(id)
      this.map.addSource(id, source)
    },

    addLayer(layer: maplibregl.AnyLayer, beforeId?: string) {
      if (!this.map) return
      if (this.map.getLayer(layer.id)) this.map.removeLayer(layer.id)
      this.map.addLayer(layer, beforeId)
    },

    on<TName extends keyof maplibregl.MapEventType>(
      type: TName,
      listener: (ev: maplibregl.MapEventType[TName] & maplibregl.EventData) => void,
    ) {
      this.map?.on(type as string, listener as any)
    },

    off<TName extends keyof maplibregl.MapEventType>(
      type: TName,
      listener: (ev: maplibregl.MapEventType[TName] & maplibregl.EventData) => void,
    ) {
      this.map?.off(type as string, listener as any)
    },

    /**
     * Map sauber zerstören (z.B. beim Routenwechsel).
     */
    destroyMap() {
      try {
        this.map?.remove()
      } catch (e) {
        // ignore
      } finally {
        this.map = null
        this.status = 'idle'
        this.lastError = null
      }
    },

    setCoords(lng: number, lat: number) {
      this.coords = { lng, lat }
    },
    clearCoords() {
      this.coords = null
    }
  },
})

