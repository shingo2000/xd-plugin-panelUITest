/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */


const {Ellipse, Color} = require("scenegraph");

let panel;

function create() {
  const html = `
    <style>
    .show{
      display:block;
    }
    .hide{
      display:none;
    }
    </style>
    <div id="tool" class="show">
      <button>円を作成</button>
    </div>
    <div id="property" class="hide">
      <label>
        <p>線の太さ: <span>1</span>
        <input type="range" min="0.5" max="5" step="0.5" value="1">
      <label>
    </div>
  `;
  function createCircle(e){
    const { editDocument } = require("application");
    editDocument({ editLabel: "create circle" }, function(selection) {
      const circle = new Ellipse();
      circle.radiusX = 50;
      circle.radiusY = 50;
      circle.stroke = new Color("#333333");
      circle.pluginData = "XDPluginCircle";
      selection.insertionParent.addChild(circle);
      selection.items = [circle];
    });
  }
  function onChangeSlider(e){
    const sliderValue = e.currentTarget.value;
    const propertyPanel = document.getElementById("property");
    const valueLabel = propertyPanel.querySelector("span");
    valueLabel.innerHTML = String(sliderValue);

    const { editDocument } = require("application");
    editDocument({ editLabel: "edit strokeWdith" }, function(selection) {
      const circle = selection.items[0];
      circle.strokeWidth = sliderValue;
    });
  }

  panel = document.createElement("div");
  panel.innerHTML = html;

  panel.querySelector("button").addEventListener("click", createCircle);
  panel.querySelector("input").addEventListener("change", onChangeSlider);

  return panel;

}

function show(event) {
  if (!panel) event.node.appendChild(create());
}


function update(selection) {
  const toolPanel = document.getElementById("tool");
  const propertyPanel = document.getElementById("property");

  if(selection && selection.items[0] && selection.items[0].pluginData == "XDPluginCircle"){

    const strokeWidth = selection.items[0].strokeWidth;
    const valueLabel = propertyPanel.querySelector("span");
    const slider = propertyPanel.querySelector("input");
    valueLabel.innerHTML = String(strokeWidth);
    slider.value = strokeWidth;

    toolPanel.className = "hide";
    propertyPanel.className = "show";
  }else{
    toolPanel.className = "show";
    propertyPanel.className = "hide";
  }
}


module.exports = {
  panels: {
    panelUITest: {
      show,
      update
    }
  }
};
