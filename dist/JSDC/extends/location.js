import{Control as t,DomUtil as e,latLng as o,CircleMarker as n}from"leaflet";var l=t.extend({options:{position:"topright"},onAdd:function(t){var l,i=e.create("div","leaflet-bar leaflet-control leaflet-control-custom");return i.innerHTML="⌖",i.style.backgroundColor="white",i.style.width="30px",i.style.height="30px",i.style.fontWeight="800",i.style.fontSize="25px",i.style.textAlign="center",i.style.lineHeight="25px",i.style.cursor="pointer",navigator.geolocation.watchPosition((function(e){var i=e.coords,r=i.latitude,a=i.longitude,s=o(r,a);l?l.setLatLng(s):(l=new n(s)).addTo(t)})),i.onclick=function(){l&&t.flyTo(null==l?void 0:l.getLatLng(),17,{duration:2})},i}});export{l as default};
//# sourceMappingURL=location.js.map