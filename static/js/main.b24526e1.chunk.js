(this.webpackJsonpserve_model_viewer=this.webpackJsonpserve_model_viewer||[]).push([[0],{69:function(e,t,a){},74:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var r=a(0),l=a(29),o=a.n(l),n=(a(69),a(12)),i=a(15),s=a(17),c=a(104),m=a(105),u=a(45),d=a(1),p=["./wraps/bin_1.png","./wraps/bin_2.png","./wraps/bin_3.png","./wraps/bin_4.png","./wraps/bin_5.png"],g=["./wraps/lid_1.png","./wraps/lid_2.png","./wraps/lid_3.png","./wraps/lid_4.png","./wraps/lid_5.png"],h=["./decals/decal_cat.png","./decals/decal_mask.png","./decals/decal_mustache.png","./decals/decal_postmates.png","./decals/decal_smile.png"],b=["./engrave/engrave_maze.png","./engrave/engrave_word.png"],j=function(e){return e?(new d.TextureLoader).load(e,(function(e){return e.flipY=!1,e.encoding=d.sRGBEncoding,Object(s.b)(),e}),void 0,(function(e){return console.error("An error happened: ",e),Object(s.b)(),null})):(Object(s.b)(),null)},_=Object(u.a)((function(e,t){var a;return{current:null,setCurrent:function(t){e({current:t})},background:"black",setBackground:function(t){e({background:t})},binDecals:p,lidDecals:g,generalDecals:h,armBandDecals:b,setItem:function(t){e({})},loadTexture:function(e){return j(e)},items:{wheels:{name:"Wheels",showHubs:!0,showShadow:!0,wheelAngle:0,wheelSpeed:0,serveAngle:0},aluminum:{name:"Aluminum",color:"#ded8dd"},lid:{name:"Lid",color:"#ffffff",open:!1,selectedIndex:0,texture:j(g[0]),textures:g},bin:(a={name:"Bin",color:"#ffffff",texture:"/wraps/bin_1.png",selectedIndex:0},Object(n.a)(a,"texture",j(p[0])),Object(n.a)(a,"textures",p),a),front_decal:{name:"Front decal",texture:null,selectedIndex:null,textures:h},rear_bottom_decal:{name:"Rear bottom decal",texture:null,selectedIndex:null,textures:h},rear_top_decal:{name:"Rear top decal",texture:null,selectedIndex:null,textures:h},side_arm_decal:{name:"Side arm",engraveDepth:-.2,texture:null,selectedIndex:null,textures:b}}}})),x=a(11),f=a(102),y=a(6),O=function(e){var t=Object(r.useRef)(),a=Object(f.a)("serve.glb"),l=a.nodes,o=a.materials,n=_((function(e){return[e.setCurrent,e.items]})),s=Object(i.a)(n,2),c=s[0],m=s[1],u=Object(r.useState)(null),d=Object(i.a)(u,2),p=d[0],g=d[1];return Object(r.useEffect)((function(){var e='<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <rect x="5" y="30" width="59" height="19" rx="2" fill="black"/>  \n      <text fill="white" style="white-space:pre" dominant-baseline="middle" text-anchor="middle" font-weight="bold" font-family="Montserrat, sans-serif" font-size="11" letter-spacing="-.01em"><tspan x="53%" y="41">'.concat(p&&m[p].name,'</tspan></text>\n      <path opacity="0.2" d="M26.8258 21.451L16.4335 27.451C15.9139 27.751 15.3675 27.6046 15.0675 27.085C14.3175 25.786 13.2613 25.3565 11.6086 24.6941C10.739 24.3879 9.6828 23.9585 8.52658 23.3558C5.38114 21.7078 2.10889 19.4401 1.11248 18.5142C0.116071 17.5884 -0.0741217 16.659 0.0222885 16.026C0.0686986 15.3063 0.611518 14.6465 1.39094 14.1965C2.43017 13.5965 3.9694 13.8626 5.57203 14.4384L0.422031 5.51834C-0.427969 4.04609 0.0478632 2.27026 1.52011 1.42026C2.99235 0.570261 4.76818 1.04609 5.61818 2.51834L7.71818 6.15564C7.92799 5.91904 8.1378 5.68244 8.48421 5.48244C9.43684 4.93244 10.5163 5.00205 11.3493 5.44487C11.5457 4.98507 11.9287 4.64847 12.3617 4.39847C13.5741 3.69847 14.9768 3.92789 15.9732 4.85372C16.183 4.61712 16.4794 4.33052 16.8258 4.13052C18.2981 3.28052 20.0739 3.75635 20.9239 5.22859L22.4239 7.82667C23.7239 10.0783 24.3409 12.147 24.9079 14.129C25.4748 16.1111 25.9918 18.0065 27.1918 20.085C27.4918 20.6046 27.3454 21.151 26.8258 21.451Z" fill="black"/>\n      <path opacity="0.3" d="M22 10.5C24.1467 14.5355 23.5 16 26 21.5L16 27.5L13.5 25C12.3333 24.5 7 22.5 7 22.5L1.40808 18.5058C0.597393 17.9267 0.328147 16.8437 0.773687 15.9526C1.19806 15.1039 2.13182 14.7381 2.97895 15.1658C4.1363 15.75 5.5 16.5 5.5 16.5C5.5 16.5 8.33333 18.3333 9 19L0.883403 5.47234C0.38886 4.6481 0.628869 3.58075 1.42865 3.04757C2.28412 2.47725 3.44266 2.73777 3.97164 3.6194L9 12L7.81796 9.3404C7.36799 8.32797 7.8328 7.14309 8.85114 6.70665C9.7878 6.30523 10.8763 6.67735 11.3712 7.56816L13 10.5L11.7584 7.70642C11.3519 6.79182 11.822 5.72599 12.7715 5.40949C13.4968 5.16772 14.2942 5.44131 14.7183 6.07744L17 9.5L16.2118 7.39812C15.843 6.41477 16.4637 5.33939 17.4996 5.16673C18.1142 5.0643 18.7342 5.31333 19.0899 5.8249C19.8644 6.93877 21.1034 8.81442 22 10.5Z" fill="black"/>\n      <path d="M22.5 9C24.6467 13.0355 24 14.5 26.5 20L16.5 26L14 23.5C12.8333 23 7.5 21 7.5 21L1.90808 17.0058C1.09739 16.4267 0.828147 15.3437 1.27369 14.4526C1.69806 13.6039 2.63182 13.2381 3.47895 13.6658C4.6363 14.25 6 15 6 15C6 15 8.83333 16.8333 9.5 17.5L1.3834 3.97234C0.88886 3.1481 1.12887 2.08075 1.92865 1.54757C2.78412 0.977251 3.94266 1.23777 4.47164 2.1194L9.5 10.5L8.31796 7.8404C7.86799 6.82797 8.3328 5.64309 9.35114 5.20665C10.2878 4.80523 11.3763 5.17735 11.8712 6.06816L13.5 9L12.2584 6.20642C11.8519 5.29182 12.322 4.22599 13.2715 3.90949C13.9968 3.66772 14.7942 3.94131 15.2183 4.57744L17.5 8L16.7118 5.89812C16.343 4.91477 16.9637 3.83939 17.9996 3.66673C18.6142 3.5643 19.2342 3.81333 19.5899 4.3249C20.3644 5.43877 21.6034 7.31442 22.5 9Z" fill="white" stroke="black" stroke-linejoin="round"/>\n    </svg>');document.body.style.cursor="url('data:image/svg+xml;base64,".concat(btoa(p?e:'<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">\n      <path opacity="0.3" d="M3.5 25.5L0.5 2L19.5 16.5L10 18.5L3.5 25.5Z" fill="black"/>\n      <path d="M10.397 17.0107L10.2416 17.0434L10.1336 17.1598L4.36067 23.3768L1.64743 2.12306L18.8293 15.2355L10.397 17.0107Z" fill="black" stroke="white"/>\n    </svg>'),"'), auto")}),[p]),Object(y.jsxs)("group",Object(x.a)(Object(x.a)({"rotation-y":m.wheels.serveAngle,ref:t},e),{},{dispose:null,onPointerOver:function(e){return e.stopPropagation(),e.object.name?g(e.object.name):g(null)},onPointerOut:function(e){return 0===e.intersections.length&&g(null)},onPointerMissed:function(){return c(null)},onPointerDown:function(e){return e.stopPropagation(),e.object.name?c(e.object.name):c(null)},children:[Object(y.jsxs)("group",{position:[0,.26,0],children:[Object(y.jsxs)("group",{position:[.16,0,0],children:[Object(y.jsxs)("group",{"rotation-y":m.wheels.wheelAngle,position:[.02,-.11,.23],children:[m.wheels.showHubs&&Object(y.jsx)("mesh",{name:"wheels",geometry:l.cap_fl.geometry,material:l.cap_fl.material,"material-transparent":!0,"material-aoMapIntensity":1.5,"material-roughnessMap":o.tex_cloud_ref.map}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.hub_fl.geometry,"material-color":1907997,"material-roughnessMap":o.tex_cloud_ref.map,material:l.hub_fl.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.tire_fl.geometry,material:l.tire_fl.material,"material-color":3355443,"material-aoMapIntensity":.5,"material-normalScale":[-2,-2],"material-roughnessMap":o.tex_cloud_ref.map})]}),Object(y.jsxs)("group",{position:[.02,-.11,-.23],children:[m.wheels.showHubs&&Object(y.jsx)("mesh",{name:"wheels",geometry:l.cap_rl.geometry,material:l.cap_rl.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.hub_rl.geometry,material:l.hub_rl.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.tire_rl.geometry,material:l.tire_rl.material})]}),Object(y.jsx)("mesh",{geometry:l.boggy_arm_l.geometry,"material-color":4473924,material:l.boggy_arm_l.material,position:[-.16,-.26,0]})]}),Object(y.jsxs)("group",{position:[-.16,0,0],children:[Object(y.jsxs)("group",{"rotation-y":m.wheels.wheelAngle,position:[-.02,-.11,.23],children:[m.wheels.showHubs&&Object(y.jsx)("mesh",{name:"wheels",geometry:l.cap_fr.geometry,material:l.cap_fr.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.hub_fr.geometry,material:l.hub_fr.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.tire_fr.geometry,material:l.tire_fr.material})]}),Object(y.jsxs)("group",{position:[-.02,-.11,-.23],children:[m.wheels.showHubs&&Object(y.jsx)("mesh",{name:"wheels",geometry:l.cap_rr.geometry,material:l.cap_rr.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.hub_rr.geometry,material:l.hub_rr.material}),Object(y.jsx)("mesh",{name:"wheels",geometry:l.tire_rr.geometry,material:l.tire_rr.material})]}),Object(y.jsx)("mesh",{geometry:l.boggy_arm_r.geometry,material:l.boggy_arm_r.material,position:[.16,-.26,0]})]}),Object(y.jsxs)("group",{"rotation-x":m.lid.open?-.9:0,position:[0,.55,-.33],children:[Object(y.jsx)("mesh",{name:"lid",geometry:l.lid_top.geometry,material:o.mat_lid_vinyl,position:[0,-.81,.33],"material-roughness":.5,"material-roughnessMap":o.tex_cloud_ref.map,"material-transparent":!0,"material-map":m.lid.texture,"material-opacity":m.lid.texture?1:0,onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{geometry:l.lid_top.geometry,material:o.mat_lid_base,position:[0,-.81,.33],"material-roughnessMap":o.tex_cloud_ref.map,"material-color":m.lid.color}),Object(y.jsx)("mesh",{name:"lid",geometry:l.strip.geometry,"material-color":11316396,"material-roughnessMap":o.tex_cloud_ref.map,material:l.strip.material,position:[0,-.81,.33]}),Object(y.jsx)("mesh",{name:"lid",geometry:l.lid_inside.geometry,material:l.lid_inside.material,"material-color":15658734,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.81,.33]}),Object(y.jsx)("mesh",{name:"lid",geometry:l.lid_liner.geometry,material:l.lid_liner.material,"material-color":1118481,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.81,.33]})]}),Object(y.jsx)("mesh",{name:"bin",geometry:l.bin.geometry,material:o.mat_bin_vinyl,"material-roughness":.5,"material-roughnessMap":o.tex_cloud_ref.map,"material-transparent":!0,position:[0,-.26,0],"material-map":m.bin.texture,"material-opacity":m.bin.texture?1:0,onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{geometry:l.bin.geometry,material:o.mat_bin_base,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0],"material-color":m.bin.color}),Object(y.jsx)("mesh",{name:"front_decal",material:o.mat_front_decal,"material-color":16777215,"material-alphaTest":.8,"material-opacity":m.front_decal.texture?1:0,"material-map":m.front_decal.texture,"material-roughnessMap":o.tex_cloud_ref.map,geometry:l.front_decal.geometry,position:[0,-.26,0],onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{name:"rear_bottom_decal",material:o.mat_rear_bottom_decal,"material-color":16777215,"material-alphaTest":.8,"material-opacity":m.rear_bottom_decal.texture?1:0,"material-map":m.rear_bottom_decal.texture,"material-roughnessMap":o.tex_cloud_ref.map,geometry:l.rear_bottom_decal.geometry,position:[0,-.26,0],onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{name:"rear_top_decal",material:o.mat_rear_top_decal,"material-color":16777215,"material-alphaTest":.8,"material-opacity":m.rear_top_decal.texture?1:0,"material-map":m.rear_top_decal.texture,"material-roughnessMap":o.tex_cloud_ref.map,geometry:l.rear_top_decal.geometry,position:[0,-.26,0],onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{name:"side_arm_decal",material:o.mat_side_arm_aluminum,"material-color":m.aluminum.color,"material-alphaTest":.1,"material-opacity":m.side_arm_decal.texture?1:0,"material-flatShading":!1,"material-bumpScale":m.side_arm_decal.engraveDepth,"material-bumpMap":m.side_arm_decal.texture,"material-alphaMap":m.side_arm_decal.texture,"material-transparent":!0,"material-roughnessMap":o.tex_cloud_ref.map,geometry:l.side_arm_decal.geometry,position:[0,-.26,0],onUpdate:function(e){return e.material.needsUpdate=!0}}),Object(y.jsx)("mesh",{geometry:l.screen.geometry,material:o.mat_screen,"material-roughnessMap":o.tex_cloud_ref.map,"material-color":657174,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.tail_lights.geometry,material:o.mat_tail_lights,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.eye_lense.geometry,material:l.eye_lense.material,position:[0,-.26,0]}),Object(y.jsx)("mesh",{name:"aluminum",geometry:l.aluminum.geometry,material:l.aluminum.material,"material-color":m.aluminum.color,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.black_glass.geometry,material:o.mat_lense,"material-color":657174,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.black_plastic.geometry,material:l.black_plastic.material,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.black_plastic_base.geometry,material:l.black_plastic_base.material,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.blocker.geometry,material:o.mat_light_blocker,"material-color":1118481,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.eye_plate.geometry,material:o.mat_metal_black_rough,"material-color":4473924,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0]}),Object(y.jsx)("mesh",{geometry:l.liner.geometry,material:l.liner.material,"material-roughnessMap":o.tex_cloud_ref.map,position:[0,-.26,0]})]}),m.wheels.showShadow&&Object(y.jsx)("mesh",{material:o.mat_floor,"material-transparent":!0,"material-color":0,"material-alphaMap":o.tex_floor_ref.map,geometry:l.floor.geometry})]}))};f.a.preload("serve.glb");var w=a(60),C=a(100),v=a(106),k=a(101),L=a(16),M=a(103),A=(a(74),Object(L.a)({root:{color:"#52af77",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)"},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(M.a)),I=Object(L.a)({switchBase:{color:"fff","&$checked":{color:"#52af77"},"&$checked + $track":{backgroundColor:"#52af77"}},checked:{},track:{backgroundColor:"grey"}})(k.a),D=function(e){var t=_((function(e){return[e.current,e.setCurrent,e.items,e.background,e.setBackground,e.setItem,e.loadTexture]})),a=Object(i.a)(t,7),l=a[0],o=(a[1],a[2]),n=a[3],s=a[4],c=a[5],m=a[6],u=l?o[l]:null,p=Object(r.useRef)();return Object(y.jsxs)("div",{className:"Customizer",children:[u&&Object(y.jsxs)("div",{className:"Actions ".concat(n),children:[Object(y.jsxs)("div",{className:"ItemActions ".concat(n),children:[u.color&&Object(y.jsx)(w.a,{className:"picker",color:u.color,onChange:function(e){return u.color=e,c(u)}}),Object(y.jsx)("h1",{children:u.name})]}),Object(y.jsxs)("div",{className:"OtherActions ".concat(n),children:["textures"in u&&Object(y.jsxs)("div",{className:"Textures",children:[u.textures.map((function(e,t){return Object(y.jsx)("div",{className:"Texture ".concat(u.selectedIndex===t?"active":""," ").concat(l),style:{backgroundImage:"url(".concat(e,")"),backgroundColor:"bin"==l||"lid"==l?u.color:o.aluminum.color},onClick:function(a){a.stopPropagation(),a.preventDefault(),u.selectedIndex==t?(u.selectedIndex=null,u.texture=m(null)):(u.selectedIndex=t,u.texture=m(e)),c(u)}},t)})),Object(y.jsx)("div",{className:"addWrap",onClick:function(){p.current.click()},children:"+ Add"})]}),Object(y.jsx)(C.a,{row:!0,className:"sliders",children:Object.entries(u).map((function(e){var t=Object(i.a)(e,2),a=t[0],r=t[1];if("number"===typeof r&&!a.includes("Index"))return Object(y.jsx)(v.a,{control:Object(y.jsx)(A,{value:a.includes("Angle")?parseInt(d.Math.radToDeg(r)):r,valueLabelDisplay:"auto",onChange:function(e,t){return u[a]=a.includes("Angle")?d.Math.degToRad(t):t,c(u)},step:.01,min:a.includes("Angle")?a.includes("wheel")?-30:0:a.includes("Depth")?-1:0,max:a.includes("Angle")?a.includes("wheel")?30:360:a.includes("Depth")?1:100,name:a,color:"primary"}),label:a},a)}))}),Object(y.jsx)(C.a,{row:!0,className:"switch",children:Object.entries(u).map((function(e){var t=Object(i.a)(e,2),a=t[0],r=t[1];if("boolean"===typeof r)return Object(y.jsx)(v.a,{control:Object(y.jsx)(I,{checked:r,onChange:function(e){return u[a]=e.target.checked,c(u)},name:a,color:"primary"}),label:a},a)}))})]}),Object(y.jsx)("input",{id:"myInput",type:"file",accept:"image/*",ref:p,style:{display:"none"},onChange:function(e){e.stopPropagation(),e.preventDefault();var t=e.target.files[0];if(t){var a=URL.createObjectURL(t);u.textures.push(a),u.selectedIndex=u.textures.length-1,u.texture=m(a),c(u)}}})]}),Object(y.jsxs)("div",{className:"GlobalActions ".concat(n),children:[Object(y.jsx)(v.a,{control:Object(y.jsx)(I,{checked:"black"==n,onChange:function(e){return s("black"==n?"white":"black")},name:"darkMode",color:"primary"}),label:"Dark Mode"}),Object(y.jsx)("div",{className:"Button",onClick:function(e){e.stopPropagation(),e.preventDefault();var t=document.getElementsByTagName("canvas")[0];if(t){var a=t.toDataURL("image/png"),r=document.createElement("a");r.setAttribute("href",a),r.setAttribute("target","_blank"),r.setAttribute("download","render"),r.click()}else console.warn("Could not find canvas to render from!")},children:"\ud83d\udcf7 Save PNG"})]})]})},U=function(e){var t,a=_((function(e){return[e.background]})),l=Object(i.a)(a,1)[0];return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)(s.a,(t={style:{background:l},shadows:!0,concurrent:!0,gl:{preserveDrawingBuffer:!0},frameloop:!0,dpr:[1,2]},Object(n.a)(t,"shadows",!0),Object(n.a)(t,"camera",{position:[1.5,1,1.7],fov:45,near:.25,far:20}),Object(n.a)(t,"children",[Object(y.jsxs)(r.Suspense,{fallback:null,children:[Object(y.jsx)(O,{}),Object(y.jsx)(c.a,{preset:"sunset"})]}),Object(y.jsx)(m.a,{target:[0,.5,0],minDistance:1,maxDistance:5,enableDamping:!0,dampingFactor:.3,minPolarAngle:.3,maxPolarAngle:1.7}),Object(y.jsx)("hemisphereLight",{skyColor:"blue",groundColor:16777215,intensity:.2,position:[0,50,0]}),Object(y.jsx)("directionalLight",{position:[8,20,8],"shadow-camera-left":-4,"shadow-camera-bottom":-4,"shadow-camera-right":16,"shadow-camera-top":16,"shadow-mapSize-height":1024,"shadow-mapSize-width":1024,castShadow:!0})]),t)),Object(y.jsx)(D,{})]})},N=function(){return Object(y.jsx)(U,{})};o.a.render(Object(y.jsx)(N,{}),document.getElementById("root"))}},[[79,1,2]]]);
//# sourceMappingURL=main.b24526e1.chunk.js.map