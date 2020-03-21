# Draxis Gauge Visualization

![alt text](/src/draxis_gauge.png)

---

## About

This Kibana plugin is created using amCharts, a JavaScript library for data visualizations. It is specifically
customized to visualize certain Key Performance Indicators in the form of a gauge diagram based on the
following equation:

![alt text](/src/image.png)

The users can select years Y and Z through the plugin from drop-down lists.

More information can be found in deliverable 5.2 here: https://zenodo.org/record/3386009#.XYirMCj7RnI.

## Version

- Plugin version: 0.0.7
- Made for Kibana version: 7.4.0

For any inquires contact Stergios Bampakis (ababakis@draxis.gr) or DRAXIS Developers (dev@draxis.gr)

## Plugin Creation
This repository contains a docker-compose.yml file which helps you get this plugin as a __.zip file__ and place it in your Kibana installation (<= 7.4.0)

In order to get the plugin as a zip file:

- Change permissions to distribution folder in order Docker to be able to copy the plugin later
  
  `chmod -R 0777 dist/`
- `cd deploy/`
- `docker-compose build`
- `docker-compose up -d`
- (*__Be patient__* since the whole procedure needs to download Kibana's source code and bootstrap the plugin)
- (Optional): In case you want to see the progress of plugin building run: 

  `docker logs -f gauge-plugin-kibana`
- The final zip is under your "/dist" directory
 
Check how you can [install this zip file](#installing-markdown)

<h2 id="installing-markdown">Installing plugin</h2>

Assuming this plugin is named: "draxis_visualazation-0.0.9.zip"

- Log in into your server
- cd your_kibana_installation_path
- If you are using docker run:

   `docker exec -it {container_name} bash`
- Install plugin by running:

  `bin/kibana-plugin install file:///(absolute/path/to/)draxis_visualazation-0.0.9.zip`
- Done !