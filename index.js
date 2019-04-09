export default function(kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/draxis_visualazation/draxis_visualazation']
    }
  });
}
