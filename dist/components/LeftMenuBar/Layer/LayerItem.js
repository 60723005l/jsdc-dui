import e,{useState as t}from"react";var n=function(n){var a=n.name,r=n.type,c=n.show,o=n.onToggleShow,u=n.onOpacityChange,m=t(!1),i=m[0],l=m[1],p=t(0),s=p[0],g=p[1];return e.createElement("div",{className:"rui-LayerItem"},e.createElement("input",{type:"checkbox",checked:c,onChange:function(e){return o(e.currentTarget.checked)}}),e.createElement("div",{className:"rui-LayerItem-content"},e.createElement("span",{onClick:function(){return l(!i)}},a),e.createElement("div",{className:"rui-LayerItem-opacity-config ".concat(i&&"image"===r&&"open")},e.createElement("span",null,"透明度"),e.createElement("input",{type:"range",min:"0",max:"100",step:"1",value:s,onInput:function(e){return t=Number(e.currentTarget.value),g(t),void u(t);var t}}),e.createElement("span",null,s,"%"))))};export{n as default};
//# sourceMappingURL=LayerItem.js.map
