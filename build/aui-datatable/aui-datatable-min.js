AUI.add("aui-datatable-base",function(c){var f=c.Lang,k=f.isNumber,b=f.isString,i="childNodes",e="columnset",d="data",g="headers",h="id",a="#",j=" ";c.DataTable.Base=c.Base.create("datatable",c.DataTable.Base,[],{initializer:function(){var l=this;l.after("render",l._afterRender);l.after("recordsetChange",l._afterRecordsetChangeExt);},getCellNode:function(l,m){var n=c.one(a+l.get(h));return n.get(i).item(m.keyIndex);},getColumnByCell:function(m){var l=this;var n=m.getAttribute(g).split(j).pop()||m.get(h);return l.get(e).getColumn(n);},getColNode:function(m){var l=this;var n=l.get(e).getColumnIndex(l.getColumnByCell(m));return l._colgroupNode.get(i).item(n);},_afterRender:function(){var l=this;l._bindPluginsEvents();l._fixPluginsUI();},_afterRecordsetChangeExt:function(m){var l=this;l._fixPluginsUI();},_bindPluginsEvents:function(){var l=this;var m=l.sort;if(m){m.after("lastSortedByChange",c.bind(l._fixPluginsUI,l));}},_fixPluginsUI:function(){var m=this;var n=m.sort;var l=m.scroll;if(n&&l){l.syncUI();}}},{});c.Columnset=c.Base.create("columnset",c.Columnset,[],{getColumn:function(m){var l=this;if(b(m)){return this.idHash[m];}else{if(k(m)){return l.keys[m];}}return null;},getColumnIndex:function(l){return l.keyIndex;},getLength:function(){var l=this;return l.keys.length;},_setDefinitions:function(l){return l;}},{});c.Recordset=c.Base.create("recordset",c.Recordset,[],{getRecordByRow:function(m){var l=this;return l.getRecord(m.get(h));},getRecordIndex:function(m){var l=this;return c.Array.indexOf(l._items,m);},updateRecordDataByKey:function(m,n,p){var l=this;var o=m.get(d);if(o){o[n]=p;m.set(d,o);}l.update(m,l.getRecordIndex(m));}},{});},"@VERSION@",{requires:["aui-base","datatable","plugin"]});AUI.add("aui-datatable-events",function(j){var Q=j.Lang,s=Q.isArray,E=Q.isObject,e=Q.isValue,b=j.Array.each,D=j.Object.keys,K=j.Object.values,x=j.Selector.test,l=j.ClassNameManager.getClassName,t=j.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),h=j.cached(function(R,A){return R+t(A.toLowerCase());}),L="boundingBox",N="cell",C="cellSelector",G="click",n="column",r="dblclick",c="events",w="header",p="host",d="inHead",P="keydown",O="keyup",F="liner",y="mousedown",f="mouseenter",k="mouseleave",i="mouseup",B="recordset",H="row",u="table",M="tags",a="tagName",I="tbody",v="thead",z="tr",m="datatable",o=",",q=".",J=l(m,F);var g=j.Base.create("dataTableEvents",j.Plugin.Base,[],{_bubbling:false,_handler:null,_tagsFilter:null,initializer:function(S){var A=this;var R=A.get(M);A._tagsFilter=D(R).join(o);A._initEvents();},destructor:function(){var A=this;var R=A._handler;if(R){R.detach();}},getEvtPayload:function(U,R){var A=this;var T=A.get(p);var V=T._theadNode;var W=U.getData(d);var S=U.getData(F);var X=U.getData(H);if(!e(W)){W=V.contains(U);U.setData(d,W);}if(!e(S)){S=U.one(q+J);U.setData(F,S);}if(!e(X)){X=U.ancestor(z);U.setData(H,X);}return{cell:U,column:T.getColumnByCell(U),inHead:W,liner:S,originalEvent:R,row:X,record:T.get(B).getRecordByRow(X)};},_filterBubble:function(W){var A=this;var V=A.get(p);var R=V._tableNode.getDOM();var S=[];while(W){var U=(W===R);if(x(W,A._tagsFilter,(U?null:R))){S.push(W);}if(U){break;}W=W.parentNode;}if(S.length){var T=V.getColNode(j.one(S[0]));if(T){S.splice(2,0,T.getDOM());}}return S;},_handleEvents:function(A){var V,T;var Y=this;var Z=Y.get(p);var aa=Y.get(M);var S=A.currentTarget;var R=Y._filterBubble(S.getDOM());var X=Y.getEvtPayload(S,A);Y._bubbling=true;for(V=0,T=R.length;(V<T)&&Y._bubbling;V++){var U=j.one(R[V]);var W=aa[U.get(a).toLowerCase()];X.node=U;X.property=W;Z.fire(h(W,A.type),X);}},_initEvents:function(){var A=this;var U=A.get(p);var R=A.get(M);var S=A.get(c);var T={};b(K(R),function(V){b(S,function(W){var X=h(V,W);T[X]={stoppedFn:j.bind(A._stopBubble,A)};});});U.publish(T);A._handler=U.get(L).delegate(S,j.bind(A._handleEvents,A),A.get(C));},_stopBubble:function(){var A=this;A._bubbling=false;}},{NS:"events",NAME:"dataTableEvents",ATTRS:{cellSelector:{value:"td,th",writeOnce:true},events:{validator:s,value:[G,r,P,O,y,f,k,i]},tags:{validator:E,value:{col:n,table:u,thead:v,tbody:I,tr:H,th:w,td:N},writeOnce:true}}});j.namespace("Plugin").DataTableEvents=g;},"@VERSION@",{requires:["aui-datatable-base"]});AUI.add("aui-datatable-edit",function(V){var O=V.Lang,aH=V.Array,c=O.isArray,ap=O.isBoolean,ak=O.isFunction,w=O.isObject,au=O.isString,aj=O.String,ah=V.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),aA=function(A){return(A instanceof V.BaseCellEditor);},U=V.WidgetStdMod,o=V.getClassName,ai="baseCellEditor",i="boundingBox",E="calendar",R="cancel",am="cell",Z="celleditor",r="checkboxCellEditor",g="checked",af="click",q="columnset",l="contentBox",D="datatable",z="dateCellEditor",T="disk",al="dropDownCellEditor",t="editEvent",M="editable",d="editor",v="element",ac="elementName",an="field",X="hideOnSave",ae="id",aG="initToolbar",W="initValidator",b="inputFormatter",aF="key",Y="label",I="lazySyncUI",K="mousedown",aD="mousemove",N="multiple",f="name",aq="option",aw="options",k="optionsCellEditor",aE="outputFormatter",Q="radioCellEditor",e="recordset",aB="rendered",ag="save",ar="selected",ab="selectedAttrName",L="showToolbar",av="submit",F="textAreaCellEditor",n="textCellEditor",C="toolbar",p="unescapeValue",J="validator",az="value",P="visible",ax="wrapper",aC="\n",G="",aJ=",",j=/<br\s*\/?>/gi,s=/[\r\n]/g,H=o(Z,v),at=o(Z,Y),y=o(Z,aq),m=o(Z,ax),u=o(D,M),ao="<br/>";var ay=function(){};ay.NAME="dataTableCellEditorSupport";ay.ATTRS={editEvent:{setter:"_setEditEvent",validator:au,value:af},lazySyncUI:{value:true}};V.mix(ay.prototype,{activeColumnIndex:-1,activeRecordIndex:-1,initializer:function(){var A=this;A.after({columnsetChange:A._afterColumnsetChangeEditor,recordsetChange:A._afterRecordsetChangeEditor,render:A._afterRenderEditor});A.on(A.get(t),A._onCellEdit);},lazySyncUI:function(){var A=this;A.syncEditableColumnsUI();},getActiveColumn:function(){var A=this;return A.get(q).getColumn(A.activeColumnIndex);},getActiveRecord:function(){var A=this;
return A.get(e).getRecord(A.activeRecordIndex);},getRecordColumnValue:function(A,aK){return A.getValue(aK.get(an));},syncEditableColumnsUI:function(){var A=this;var aK=A.get(q);V.each(aK.idHash,function(aM){var aL=aM.get(d);if(aA(aL)){V.all("[headers="+aM.get(ae)+"]").addClass(u);}});},_afterRenderEditor:function(aK){var A=this;if(A.get(I)){A.get(i).once(aD,V.bind(A.lazySyncUI,A));}else{A.lazySyncUI();}if(!A.events){A.plug(V.Plugin.DataTableEvents);}},_afterColumnsetChangeEditor:function(aK){var A=this;A.syncEditableColumnsUI();},_afterRecordsetChangeEditor:function(aK){var A=this;A.syncEditableColumnsUI();},_editCell:function(aM){var A=this;var aO=A.get(q);var aN=A.get(e);var aL=aM.column;var aK=aL.get(d);A.activeColumnIndex=aO.getColumnIndex(aL);A.activeRecordIndex=aN.getRecordIndex(aM.record);if(aA(aK)){if(!aK.get(aB)){aK.on({visibleChange:V.bind(A._onEditorVisibleChange,A),save:V.bind(A._onEditorSave,A)});aK.render();}aK.set(az,A.getRecordColumnValue(aM.record,aL));aK.show().move(aM.liner.getXY());}},_onCellEdit:function(aK){var A=this;A._editCell(aK);},_onEditorVisibleChange:function(aM){var A=this;var aL=A.selection;if(aL){var aK=A.getCellNode(A.getActiveRecord(),A.getActiveColumn());aL.select(aK);}},_onEditorSave:function(aL){var A=this;var aK=aL.currentTarget;var aM=A.get(e);aK.set(az,aL.newVal);aM.updateRecordDataByKey(A.getActiveRecord(),A.getActiveColumn().get(aF),aL.newVal);A.set(e,aM);},_setEditEvent:function(A){return am+ah(A);}});V.DataTable.CellEditorSupport=ay;V.DataTable.Base=V.Base.create("dataTable",V.DataTable.Base,[V.DataTable.CellEditorSupport]);var h=V.Component.create({NAME:ai,ATTRS:{elementName:{value:az,validator:au},footerContent:{value:G},hideOnSave:{value:true,validator:ap},inputFormatter:{value:function(A){if(au(A)){A=A.replace(s,ao);}return A;}},outputFormatter:{value:function(aK){var A=this;if(au(aK)){if(A.get(p)){aK=aj.unescapeEntities(aK);}aK=aK.replace(j,aC);}return aK;}},showToolbar:{value:true,validator:ap},strings:{value:{save:"Save",cancel:"Cancel"}},tabIndex:{value:1},toolbar:{setter:"_setToolbar",validator:w,value:null},unescapeValue:{value:true,validator:ap},validator:{setter:"_setValidator",validator:w,value:null},value:{value:G},visible:{value:false}},EXTENDS:V.Overlay,UI_ATTRS:[L,az],prototype:{CONTENT_TEMPLATE:"<form></form>",ELEMENT_TEMPLATE:null,elements:null,validator:null,_hDocMouseDownEv:null,initializer:function(aK){var A=this;A._initEvents();},destructor:function(){var aK=this;var A=aK._hDocMouseDownEv;var aM=aK.toolbar;var aL=aK.validator;if(A){A.detach();}if(aM){aM.destroy();}if(aL){aL.destroy();}},bindUI:function(){var A=this;A.get(i).on(aF,V.bind(A._onEscKey,A),"down:27");},formatValue:function(aK,aL){var A=this;if(ak(aK)){aL=aK.call(A,aL);}return aL;},getValue:function(){var A=this;return A.formatValue(A.get(b),A.getElementsValue());},_initEvents:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn},initValidator:{defaultFn:A._defInitValidatorFn,fireOnce:true},initToolbar:{defaultFn:A._defInitToolbarFn,fireOnce:true},save:{defaultFn:A._defSaveFn}});A.after({render:A._afterRender,visibleChange:V.debounce(A._debounceVisibleChange,350,A)});A.on({"form-validator:submit":V.bind(A._onSubmit,A)});},_afterRender:function(){var A=this;A._handleInitValidatorEvent();A._handleInitToolbarEvent();},_defCancelFn:function(aK){var A=this;A.hide();},_defInitValidatorFn:function(aK){var A=this;A.validator=new V.FormValidator(A.get(J));},_defInitToolbarFn:function(aK){var A=this;A.toolbar=new V.Toolbar(A.get(C)).render(A.footerNode);},_defSaveFn:function(aK){var A=this;if(A.get(X)){A.hide();}},_debounceVisibleChange:function(aL){var aK=this;var A=aK._hDocMouseDownEv;if(aL.newVal){if(!A){aK._hDocMouseDownEv=V.getDoc().on(K,V.bind(aK._onDocMouseDownExt,aK));}}else{if(A){A.detach();aK._hDocMouseDownEv=null;}}},_handleCancelEvent:function(){var A=this;A.fire(R);},_handleInitValidatorEvent:function(){var A=this;if(A.get(aB)){this.fire(W);}},_handleInitToolbarEvent:function(){var A=this;if(A.get(aB)&&A.get(L)){this.fire(aG);}},_handleSaveEvent:function(){var A=this;if(!A.validator.hasErrors()){A.fire(ag,{newVal:A.getValue(),prevVal:A.get(az)});}},_onDocMouseDownExt:function(aL){var A=this;var aK=A.get(i);A.set(P,aK.contains(aL.target));},_onEscKey:function(aK){var A=this;A.hide();},_onSubmit:function(aL){var A=this;var aK=aL.validator;A._handleSaveEvent();if(aK){aK.formEvent.halt();}},_setToolbar:function(aL){var aK=this;var A=aK.getStrings();return V.merge({activeState:false,children:[{label:A[ag],icon:T,type:av},{handler:V.bind(aK._handleCancelEvent,aK),label:A[R]}]},aL);},_setValidator:function(aK){var A=this;return V.merge({boundingBox:A.get(l),bubbleTargets:A},aK);},_uiSetShowToolbar:function(aL){var A=this;var aK=A.footerNode;if(aL){aK.show();}else{aK.hide();}A._handleInitToolbarEvent();},getElementsValue:function(){var A=this;var aK=A.elements;if(aK){return aK.get(az);}return G;},renderUI:function(){var A=this;if(A.ELEMENT_TEMPLATE){A.elements=V.Node.create(A.ELEMENT_TEMPLATE);A._syncElementsName();A.setStdModContent(U.BODY,A.elements);}},_syncElementsName:function(){var A=this;A.elements.setAttribute(f,A.get(ac));},_uiSetValue:function(aL){var A=this;var aK=A.elements;if(aK){aK.val(A.formatValue(A.get(aE),aL));V.later(100,aK,aK.selectText);}}}});V.BaseCellEditor=h;var aI=V.Component.create({NAME:k,ATTRS:{inputFormatter:{value:null},options:{setter:"_setOptions",value:{},validator:w},outputFormatter:{value:null},selectedAttrName:{value:ar,validator:au}},EXTENDS:V.BaseCellEditor,UI_ATTRS:[aw],prototype:{options:null,_createOptions:function(aL){var aP=this;var A=aP.elements;var aN=[];var aK=[];var aM=aP.OPTION_TEMPLATE;var aQ=aP.OPTION_WRAPPER;V.each(aL,function(aU,aT){var aS={id:V.guid(),label:aU,name:aT,value:aT};if(aM){aN.push(V.substitute(aM,aS));}if(aQ){aK.push(V.substitute(aQ,aS));}});var aR=V.NodeList.create(aN.join(G));var aO=V.NodeList.create(aK.join(G));if(aO.size()){aO.each(function(aT,aS){aT.prepend(aR.item(aS));});A.setContent(aO);
}else{A.setContent(aR);}aP.options=aR;},_getSelectedOptions:function(){var A=this;var aK=[];A.options.each(function(aL){if(aL.get(A.get(ab))){aK.push(aL);}});return V.all(aK);},_setOptions:function(aK){var A={};if(c(aK)){aH.each(aK,function(aL){A[aL]=aL;});}else{if(w(aK)){A=aK;}}return A;},_uiSetOptions:function(aK){var A=this;A._createOptions(aK);A._syncElementsName();},_uiSetValue:function(aL){var A=this;var aK=A.options;if(aK&&aK.size()){aK.set(A.get(ab),false);aH.each(aH(aL),function(aM){aK.filter('[value="'+aM+'"]').set(A.get(ab),true);});}return aL;}}});V.BaseOptionsCellEditor=aI;var aa=V.Component.create({NAME:n,EXTENDS:V.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<input class="'+H+'" type="text" />'}});V.TextCellEditor=aa;var ad=V.Component.create({NAME:F,EXTENDS:V.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<textarea class="'+H+'"></textarea>'}});V.TextAreaCellEditor=ad;var B=V.Component.create({NAME:al,ATTRS:{multiple:{value:false,validator:ap}},EXTENDS:V.BaseOptionsCellEditor,UI_ATTRS:[N],prototype:{ELEMENT_TEMPLATE:'<select class="'+H+'"></select>',OPTION_TEMPLATE:'<option value="{value}">{label}</option>',getElementsValue:function(){var A=this;if(A.get(N)){return A._getSelectedOptions().get(az);}return A.elements.get(az);},_uiSetMultiple:function(aL){var A=this;var aK=A.elements;if(aL){aK.setAttribute(N,N);}else{aK.removeAttribute(N);}}}});V.DropDownCellEditor=B;var S=V.Component.create({NAME:r,ATTRS:{selectedAttrName:{value:g}},EXTENDS:V.BaseOptionsCellEditor,prototype:{ELEMENT_TEMPLATE:'<div class="'+H+'"></div>',OPTION_TEMPLATE:'<input class="'+y+'" id="{id}" name="{name}" type="checkbox" value="{value}"/>',OPTION_WRAPPER:'<label class="'+m+'" for="{id}"><span class="'+at+'">{label}</span></label>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(az);}}});V.CheckboxCellEditor=S;var x=V.Component.create({NAME:Q,EXTENDS:V.CheckboxCellEditor,prototype:{OPTION_TEMPLATE:'<input class="yui3-aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(az)[0];},_syncElementsName:function(){var A=this;var aK=A.options;if(aK){aK.setAttribute(f,A.get(ac));}}}});V.RadioCellEditor=x;var a=V.Component.create({NAME:z,EXTENDS:V.BaseCellEditor,ATTRS:{bodyContent:{value:G},calendar:{setter:"_setCalendar",validator:w,value:null}},prototype:{ELEMENT_TEMPLATE:'<input class="'+H+'" type="hidden" />',initializer:function(){var A=this;A.on("calendar:select",V.bind(A._onDateSelect,A));},getElementsValue:function(){var A=this;return A.calendar.getFormattedSelectedDates().join(aJ);},_afterRender:function(){var A=this;V.DateCellEditor.superclass._afterRender.apply(A,arguments);A.calendar=new V.Calendar(A.get(E)).render(A.bodyNode);},_onDateSelect:function(aK){var A=this;A.elements.val(aK.date.formatted.join(aJ));},_setCalendar:function(aK){var A=this;return V.merge({bubbleTargets:A},aK);},_uiSetValue:function(aL){var A=this;var aK=A.calendar;if(aK){if(aL&&au(aL)){aL=aL.split(aJ);}A.calendar.set("dates",aL);}}}});V.DateCellEditor=a;},"@VERSION@",{requires:["aui-calendar","aui-datatable-events","aui-toolbar","aui-form-validator","overlay"],skinnable:true});AUI.add("aui-datatable-selection",function(y){var i=y.Lang,r=i.isBoolean,t=i.isString,C=y.getClassName,h=y.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),n="cell",v="cellKeydown",m="columnset",f="columnsetChange",q="datatable",B="down",k="editor",F="esc",D="host",o="id",w="left",p="mousedown",z="mouseEvent",u="multiple",E="recordset",e="recordsetChange",l="return",s="right",c="select",j="selected",d="tab",x="tabindex",g="up",a=C(q,n,j);var b=y.Base.create("dataTableSelection",y.Plugin.Base,[],{selectedCellHash:null,selectedColumnHash:null,selectedRowHash:null,initializer:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};A.publish({select:{defaultFn:A._defSelectFn}});A.afterHostEvent(v,A._afterKeyEvent);A.afterHostEvent(A.get(z),A._afterMouseEvent);A.afterHostEvent(f,A._afterHostColumnsetChange);A.afterHostEvent(e,A._afterHostRecordsetChange);},isCellSelected:function(G){var A=this;return A.selectedCellHash[G.get(o)];},isColumnSelected:function(A){},isRowSelected:function(A){},select:function(G){var A=this;A.selectCell(G);},selectCell:function(G){var A=this;if(!A.get(u)){A.unselectAllCells();}A.selectedCellHash[G.get(o)]=G;G.setAttribute(x,0).focus();G.addClass(a);},selectColumn:function(A){},selectRow:function(A){},toggleCell:function(G,H){var A=this;if(H||!A.isCellSelected(G)){A.selectCell(G);}else{A.unselectCell(G);}},toggleColumn:function(A,G){},toggleRow:function(G,A){},unselectCell:function(G){var A=this;delete A.selectedCellHash[G.get(o)];G.removeAttribute(x);G.removeClass(a);},unselectColumn:function(A){},unselectRow:function(A){},unselectAllCells:function(){var A=this;y.each(A.selectedCellHash,y.bind(A.unselectCell,A));},unselectAllColumns:function(){},unselectAllRows:function(){},_afterHostColumnsetChange:function(G){var A=this;A._cleanUp();},_afterHostRecordsetChange:function(G){var A=this;A._cleanUp();},_afterMouseEvent:function(G){var A=this;A._handleSelectEvent(G);},_afterKeyEvent:function(H){var G=this;var A=H.originalEvent;if(A.isNavKey()){if(A.isKey(F)){G._onEscKey(H);}else{if(A.isKey(l)){G._onReturnKey(H);}else{G._navigate(H);}}A.halt();}},_cleanUp:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};},_defSelectFn:function(G){var A=this;A.selectCell(G.cell);},_navigate:function(G){var A=this;A._updateNavKeyInfo(G);A._handleSelectEvent(G);},_onEscKey:function(H){var A=this;var G=H.column.get(k);if(G){G.hide();}},_onReturnKey:function(H){var A=this;var G=A.get(D);G._editCell(H);},_handleSelectEvent:function(G){var A=this;A.fire(c,{cell:G.cell,column:G.column,inHead:G.inHead,liner:G.liner,originalEvent:G.originalEvent,row:G.row,record:G.record});},_updateNavKeyInfo:function(A){var Q=this;var R=Q.get(D);var G=A.originalEvent;
var I=R.get(m);var M=A.column.keyIndex;var O=R.get(E);var K=O.getRecordIndex(A.record);var H=G.ctrlKey||G.metaKey;var N=G.shiftKey;if(G.isKey(w)||(N&&G.isKey(d))){if(H){M=0;}else{M--;}}else{if(G.isKey(s)||(!N&&G.isKey(d))){if(H){M=I.getLength()-1;}else{M++;}}else{if(G.isKey(B)){if(H){K=O.getLength()-1;}else{K++;}}else{if(G.isKey(g)){if(H){K=0;}else{K--;}}}}}M=Math.max(Math.min(M,I.getLength()-1),0);K=Math.max(Math.min(K,O.getLength()-1),0);var J=I.getColumn(M);var L=O.getRecord(K);var P=R.getCellNode(L,J);if(R.events){y.mix(A,R.events.getEvtPayload(P,A),true);}},_setMouseEvent:function(A){return n+h(A);}},{NS:"selection",NAME:"dataTableSelection",ATTRS:{multiple:{value:false,validator:r},mouseEvent:{setter:"_setMouseEvent",value:p,validator:t}}});y.namespace("Plugin").DataTableSelection=b;},"@VERSION@",{requires:["aui-datatable-base"],skinnable:true});AUI.add("aui-datatable",function(a){},"@VERSION@",{use:["aui-datatable-base","aui-datatable-events","aui-datatable-edit","aui-datatable-selection"],skinnable:false});