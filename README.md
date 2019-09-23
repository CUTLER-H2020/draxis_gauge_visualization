# Draxis Gauge Visualization

> Draxis Plugin

![alt text](https://raw.githubusercontent.com/CUTLER-H2020/draxis_gauce_visualization/master/draxis%20gauce.png)

---

## About

This Kibana plugin is created using amCharts, a JavaScript library for data visualizations. It is specifically
customized to visualize certain Key Performance Indicators in the form of a gauge diagram based on the
following equation:

![alt text](<https://raw.githubusercontent.com/CUTLER-H2020/draxis_gauce_visualization/master/image%20(1).png>)

The users can select years Y and Z through the plugin from drop-down lists.

More information can be found in deliverable 5.2 here: https://zenodo.org/record/3386009#.XYirMCj7RnI.

## Version

- Plugin version: 0.0.7
- Made for Kibana version: 6.5.4

For any inquires contact Stelios Kitziris (skitziris@draxis.gr)

## development

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

- `yarn kbn bootstrap`

  Install dependencies and crosslink Kibana and all projects/plugins.

  > **_IMPORTANT:_** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

- `yarn start`

  Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

  ```
  yarn start --elasticsearch.hosts http://localhost:9220
  ```

- `yarn build`

  Build a distributable archive of your plugin.

- `yarn test:browser`

  Run the browser tests in a real web browser.

- `yarn test:server`

  Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.

## Installing plugin

- log in into your server
- cd your_kibana_installation_path
- if you are using docker run: docker exec -it { container_name } bash
- install plugin by running: bin/kibana-plugin install https://github.com/CUTLER-H2020/draxis_gauce_visualization.git
- this step takes about 5 minutes
- done!
