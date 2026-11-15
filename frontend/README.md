## MarsNav by Ibrahim Al-jiaan and Furqan Abassi


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Sources

### Jezero Crater terrain data

MarsNav uses orbital imagery and elevation data from the Context Camera (CTX)
aboard NASA’s Mars Reconnaissance Orbiter. The USGS Astrogeology Science Center
publishes the matching datasets as part of the Mars 2020 Science Investigation.

- **Orbital imagery (5 m/pixel).** Source for the map displayed in the frontend. [Download the CTX orthomosaic GeoTIFF](https://asc-pds-services.s3.us-west-2.amazonaws.com/mosaic/mars2020_trn/CTX/ScienceInvestigationMaps_JPL/M20_JezeroCrater_CTXortho_mosaic_5m.tif)
- **Elevation data (20 m/pixel).** Source for the elevation grid used by the route planner. [Download the CTX DEM GeoTIFF](https://asc-pds-services.s3.us-west-2.amazonaws.com/mosaic/mars2020_trn/CTX/ScienceInvestigationMaps_JPL/M20_JezeroCrater_CTXDEM_20m.tif)
- **Dataset metadata and credits.** [USGS Astrogeology catalog entry](https://astrogeology.usgs.gov/search/map/mars_2020_science_investigation_ctx_dem_mosaic)

### Technical references

- **QGIS** — Raster clipping and terrain preparation. [Raster extraction documentation](https://documentation.qgis.org/3.44/en/docs/user_manual/processing_algs/gdal/rasterextraction.html)
- **React** — State for the selected map cells and returned route. [`useState` reference](https://react.dev/reference/react/useState)
- **Vite** — Frontend setup and local development server. [Getting Started guide](https://vite.dev/guide/)
- **FastAPI** — JSON request bodies for sending the selected coordinates to the backend. [Request Body guide](https://fastapi.tiangolo.com/tutorial/body/)