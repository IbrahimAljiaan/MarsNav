# MarsNav

MarsNav is a local web application that lets users select a start and destination on orbital imagery of Jezero Crater and displays a calculated rover route.

The application uses A\* to search a grid of Mars elevation data. It compares routes using a simplified rolling and uphill energy cost and skips moves with slopes of 32 degrees or more. The model assumes a 1 kg rover and a rolling resistance coefficient of 0.1.

Built using FastAPI for the backend and React frontend.

## Sources

- Jezero imagery and elevation model, USGS — [CTX dataset](https://astrogeology.usgs.gov/search/map/mars_2020_science_investigation_ctx_dem_mosaic), [imagery](https://planetarymaps.usgs.gov/mosaic/mars2020_trn/CTX/ScienceInvestigationMaps_JPL/M20_JezeroCrater_CTXortho_mosaic_5m.tif), and [elevation model](https://planetarymaps.usgs.gov/mosaic/mars2020_trn/CTX/ScienceInvestigationMaps_JPL/M20_JezeroCrater_CTXDEM_20m.tif).
- Additional dataset information — [CaltechDATA](https://data.caltech.edu/records/h2xd4-zbd29).
- A* pathfinding — [Hart, Nilsson, and Raphael, 1968](https://doi.org/10.1109/TSSC.1968.300136).
- Mars gravity and rover slopes — [NASA Mars facts](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars/) and [Perseverance rover components](https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/).
- Energy and rolling resistance background — [OpenStax gravitational potential energy](https://openstax.org/books/college-physics/pages/7-3-gravitational-potential-energy) and [NC State rover modeling study](https://repository.lib.ncsu.edu/server/api/core/bitstreams/8541c94e-fe81-435c-9938-f0c21610efe8/content). The coefficient used by MarsNav is an assumption.
- Map preparation — [QGIS](https://docs.qgis.org/3.44/en/docs/user_manual/map_views/map_view.html) and [GDAL](https://gdal.org/en/stable/programs/gdalwarp.html).
- Application tools — [FastAPI](https://fastapi.tiangolo.com/tutorial/), [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/), [React](https://react.dev/), and [Vite](https://vite.dev/guide/).

## Additional team resources

<!-- Add your resources here. -->
