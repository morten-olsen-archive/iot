(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1235:function(e,t,n){"use strict";n.r(t),n.d(t,"setupTypeScript",(function(){return E})),n.d(t,"setupJavaScript",(function(){return K})),n.d(t,"getJavaScriptWorker",(function(){return R})),n.d(t,"getTypeScriptWorker",(function(){return W}));var r,i,o=n(248),s=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},a=function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},u=function(){function e(e,t){var n=this;this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return n._updateExtraLibs()}))}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()},e.prototype._updateExtraLibs=function(){return s(this,void 0,void 0,(function(){var e,t;return a(this,(function(n){switch(n.label){case 0:return this._worker?(e=++this._updateExtraLibsToken,[4,this._worker.getProxy()]):[2];case 1:return t=n.sent(),this._updateExtraLibsToken!==e?[2]:(t.updateExtraLibs(this._defaults.getExtraLibs()),[2])}}))}))},e.prototype._getClient=function(){var e=this;if(!this._client){this._worker=o.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then((function(t){return e._worker?e._worker.withSyncedResources(o.editor.getModels().filter((function(t){return t.getModeId()===e._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return this._getClient().then((function(t){e=t})).then((function(e){if(t._worker)return t._worker.withSyncedResources(n)})).then((function(t){return e}))},e}(),l={"lib.d.ts":!0,"lib.dom.d.ts":!0,"lib.dom.iterable.d.ts":!0,"lib.es2015.collection.d.ts":!0,"lib.es2015.core.d.ts":!0,"lib.es2015.d.ts":!0,"lib.es2015.generator.d.ts":!0,"lib.es2015.iterable.d.ts":!0,"lib.es2015.promise.d.ts":!0,"lib.es2015.proxy.d.ts":!0,"lib.es2015.reflect.d.ts":!0,"lib.es2015.symbol.d.ts":!0,"lib.es2015.symbol.wellknown.d.ts":!0,"lib.es2016.array.include.d.ts":!0,"lib.es2016.d.ts":!0,"lib.es2016.full.d.ts":!0,"lib.es2017.d.ts":!0,"lib.es2017.full.d.ts":!0,"lib.es2017.intl.d.ts":!0,"lib.es2017.object.d.ts":!0,"lib.es2017.sharedmemory.d.ts":!0,"lib.es2017.string.d.ts":!0,"lib.es2017.typedarrays.d.ts":!0,"lib.es2018.asyncgenerator.d.ts":!0,"lib.es2018.asynciterable.d.ts":!0,"lib.es2018.d.ts":!0,"lib.es2018.full.d.ts":!0,"lib.es2018.intl.d.ts":!0,"lib.es2018.promise.d.ts":!0,"lib.es2018.regexp.d.ts":!0,"lib.es2019.array.d.ts":!0,"lib.es2019.d.ts":!0,"lib.es2019.full.d.ts":!0,"lib.es2019.object.d.ts":!0,"lib.es2019.string.d.ts":!0,"lib.es2019.symbol.d.ts":!0,"lib.es2020.bigint.d.ts":!0,"lib.es2020.d.ts":!0,"lib.es2020.full.d.ts":!0,"lib.es2020.intl.d.ts":!0,"lib.es2020.promise.d.ts":!0,"lib.es2020.string.d.ts":!0,"lib.es2020.symbol.wellknown.d.ts":!0,"lib.es5.d.ts":!0,"lib.es6.d.ts":!0,"lib.esnext.d.ts":!0,"lib.esnext.full.d.ts":!0,"lib.esnext.intl.d.ts":!0,"lib.esnext.promise.d.ts":!0,"lib.esnext.string.d.ts":!0,"lib.scripthost.d.ts":!0,"lib.webworker.d.ts":!0,"lib.webworker.importscripts.d.ts":!0},c=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),d=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))},p=function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function f(e,t,n){if(void 0===n&&(n=0),"string"==typeof e)return e;if(void 0===e)return"";var r="";if(n){r+=t;for(var i=0;i<n;i++)r+="  "}if(r+=e.messageText,n++,e.next)for(var o=0,s=e.next;o<s.length;o++){r+=f(s[o],t,n)}return r}function g(e){return e?e.map((function(e){return e.text})).join(""):""}!function(e){e[e.None=0]="None",e[e.Block=1]="Block",e[e.Smart=2]="Smart"}(i||(i={}));var h,m=function(){function e(e){this._worker=e}return e.prototype._textSpanToRange=function(e,t){var n=e.getPositionAt(t.start),r=e.getPositionAt(t.start+t.length);return{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:r.lineNumber,endColumn:r.column}},e}(),b=function(){function e(e){this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return e.prototype.isLibFile=function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!l[e.path.slice(1)])},e.prototype.getOrCreateModel=function(e){var t=o.editor.getModel(e);return t||(this.isLibFile(e)&&this._hasFetchedLibFiles?o.editor.createModel(this._libFiles[e.path.slice(1)],"javascript",e):null)},e.prototype._containsLibFile=function(e){for(var t=0,n=e;t<n.length;t++){var r=n[t];if(this.isLibFile(r))return!0}return!1},e.prototype.fetchLibFilesIfNecessary=function(e){return d(this,void 0,void 0,(function(){return p(this,(function(t){switch(t.label){case 0:return this._containsLibFile(e)?[4,this._fetchLibFiles()]:[2];case 1:return t.sent(),[2]}}))}))},e.prototype._fetchLibFiles=function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise},e}();!function(e){e[e.Warning=0]="Warning",e[e.Error=1]="Error",e[e.Suggestion=2]="Suggestion",e[e.Message=3]="Message"}(h||(h={}));var v=function(e){function t(t,n,r,i){var s=e.call(this,i)||this;s._libFiles=t,s._defaults=n,s._selector=r,s._disposables=[],s._listener=Object.create(null);var a=function(e){if(e.getModeId()===r){var t,n=e.onDidChangeContent((function(){clearTimeout(t),t=setTimeout((function(){return s._doValidate(e)}),500)}));s._listener[e.uri.toString()]={dispose:function(){n.dispose(),clearTimeout(t)}},s._doValidate(e)}},u=function(e){o.editor.setModelMarkers(e,s._selector,[]);var t=e.uri.toString();s._listener[t]&&(s._listener[t].dispose(),delete s._listener[t])};s._disposables.push(o.editor.onDidCreateModel(a)),s._disposables.push(o.editor.onWillDisposeModel(u)),s._disposables.push(o.editor.onDidChangeModelLanguage((function(e){u(e.model),a(e.model)}))),s._disposables.push({dispose:function(){for(var e=0,t=o.editor.getModels();e<t.length;e++){var n=t[e];u(n)}}});var l=function(){for(var e=0,t=o.editor.getModels();e<t.length;e++){var n=t[e];u(n),a(n)}};return s._disposables.push(s._defaults.onDidChange(l)),s._disposables.push(s._defaults.onDidExtraLibsChange(l)),o.editor.getModels().forEach(a),s}return c(t,e),t.prototype.dispose=function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]},t.prototype._doValidate=function(e){return d(this,void 0,void 0,(function(){var t,n,r,i,s,a,u,l,c,d=this;return p(this,(function(p){switch(p.label){case 0:return[4,this._worker(e.uri)];case 1:return t=p.sent(),e.isDisposed()?[2]:(n=[],r=this._defaults.getDiagnosticsOptions(),i=r.noSyntaxValidation,s=r.noSemanticValidation,a=r.noSuggestionDiagnostics,i||n.push(t.getSyntacticDiagnostics(e.uri.toString())),s||n.push(t.getSemanticDiagnostics(e.uri.toString())),a||n.push(t.getSuggestionDiagnostics(e.uri.toString())),[4,Promise.all(n)]);case 2:return!(u=p.sent())||e.isDisposed()?[2]:(l=u.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(d._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),c=l.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?o.Uri.parse(e.file.fileName):null})),[4,this._libFiles.fetchLibFilesIfNecessary(c)]);case 3:return p.sent(),e.isDisposed()?[2]:(o.editor.setModelMarkers(e,this._selector,l.map((function(t){return d._convertDiagnostics(e,t)}))),[2])}}))}))},t.prototype._convertDiagnostics=function(e,t){var n=t.start||0,r=t.length||1,i=e.getPositionAt(n),s=i.lineNumber,a=i.column,u=e.getPositionAt(n+r),l=u.lineNumber,c=u.column,d=[];return t.reportsUnnecessary&&d.push(o.MarkerTag.Unnecessary),t.reportsDeprecated&&d.push(o.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:s,startColumn:a,endLineNumber:l,endColumn:c,message:f(t.messageText,"\n"),code:t.code.toString(),tags:d,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}},t.prototype._convertRelatedInformation=function(e,t){var n=this;if(t){var r=[];return t.forEach((function(t){var i=e;if(t.file){var s=o.Uri.parse(t.file.fileName);i=n._libFiles.getOrCreateModel(s)}if(i){var a=t.start||0,u=t.length||1,l=i.getPositionAt(a),c=l.lineNumber,d=l.column,p=i.getPositionAt(a+u),g=p.lineNumber,h=p.column;r.push({resource:i.uri,startLineNumber:c,startColumn:d,endLineNumber:g,endColumn:h,message:f(t.messageText,"\n")})}})),r}},t.prototype._tsDiagnosticCategoryToMarkerSeverity=function(e){switch(e){case h.Error:return o.MarkerSeverity.Error;case h.Message:return o.MarkerSeverity.Info;case h.Warning:return o.MarkerSeverity.Warning;case h.Suggestion:return o.MarkerSeverity.Hint}return o.MarkerSeverity.Info},t}(m),y=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!1,configurable:!0}),t.prototype.provideCompletionItems=function(e,n,r,i){return d(this,void 0,void 0,(function(){var r,i,s,a,u;return p(this,(function(l){switch(l.label){case 0:return r=e.getWordUntilPosition(n),i=new o.Range(n.lineNumber,r.startColumn,n.lineNumber,r.endColumn),s=e.uri,a=e.getOffsetAt(n),[4,this._worker(s)];case 1:return[4,l.sent().getCompletionsAtPosition(s.toString(),a)];case 2:return!(u=l.sent())||e.isDisposed()?[2]:[2,{suggestions:u.entries.map((function(r){var u,l=i;if(r.replacementSpan){var c=e.getPositionAt(r.replacementSpan.start),d=e.getPositionAt(r.replacementSpan.start+r.replacementSpan.length);l=new o.Range(c.lineNumber,c.column,d.lineNumber,d.column)}var p=[];return-1!==(null===(u=r.kindModifiers)||void 0===u?void 0:u.indexOf("deprecated"))&&p.push(o.languages.CompletionItemTag.Deprecated),{uri:s,position:n,offset:a,range:l,label:r.name,insertText:r.name,sortText:r.sortText,kind:t.convertKind(r.kind),tags:p}}))}]}}))}))},t.prototype.resolveCompletionItem=function(e,n){return d(this,void 0,void 0,(function(){var n,r,i,o,s;return p(this,(function(a){switch(a.label){case 0:return r=(n=e).uri,i=n.position,o=n.offset,[4,this._worker(r)];case 1:return[4,a.sent().getCompletionEntryDetails(r.toString(),o,n.label)];case 2:return(s=a.sent())?[2,{uri:r,position:i,label:s.name,kind:t.convertKind(s.kind),detail:g(s.displayParts),documentation:{value:t.createDocumentationString(s)}}]:[2,n]}}))}))},t.convertKind=function(e){switch(e){case I.primitiveType:case I.keyword:return o.languages.CompletionItemKind.Keyword;case I.variable:case I.localVariable:return o.languages.CompletionItemKind.Variable;case I.memberVariable:case I.memberGetAccessor:case I.memberSetAccessor:return o.languages.CompletionItemKind.Field;case I.function:case I.memberFunction:case I.constructSignature:case I.callSignature:case I.indexSignature:return o.languages.CompletionItemKind.Function;case I.enum:return o.languages.CompletionItemKind.Enum;case I.module:return o.languages.CompletionItemKind.Module;case I.class:return o.languages.CompletionItemKind.Class;case I.interface:return o.languages.CompletionItemKind.Interface;case I.warning:return o.languages.CompletionItemKind.File}return o.languages.CompletionItemKind.Property},t.createDocumentationString=function(e){var t=g(e.documentation);if(e.tags)for(var n=0,r=e.tags;n<r.length;n++){t+="\n\n"+_(r[n])}return t},t}(m);function _(e){var t="*@"+e.name+"*";if("param"===e.name&&e.text){var n=e.text.split(" "),r=n[0],i=n.slice(1);t+="`"+r+"`",i.length>0&&(t+=" — "+i.join(" "))}else e.text&&(t+=" — "+e.text);return t}var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.signatureHelpTriggerCharacters=["(",","],t}return c(t,e),t.prototype.provideSignatureHelp=function(e,t,n){return d(this,void 0,void 0,(function(){var n,r,i,o;return p(this,(function(s){switch(s.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)];case 1:return[4,s.sent().getSignatureHelpItems(n.toString(),r)];case 2:return!(i=s.sent())||e.isDisposed()?[2]:(o={activeSignature:i.selectedItemIndex,activeParameter:i.argumentIndex,signatures:[]},i.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:g(e.documentation)},t.label+=g(e.prefixDisplayParts),e.parameters.forEach((function(n,r,i){var o=g(n.displayParts),s={label:o,documentation:{value:g(n.documentation)}};t.label+=o,t.parameters.push(s),r<i.length-1&&(t.label+=g(e.separatorDisplayParts))})),t.label+=g(e.suffixDisplayParts),o.signatures.push(t)})),[2,{value:o,dispose:function(){}}])}}))}))},t}(m),S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideHover=function(e,t,n){return d(this,void 0,void 0,(function(){var n,r,i,o,s,a;return p(this,(function(u){switch(u.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)];case 1:return[4,u.sent().getQuickInfoAtPosition(n.toString(),r)];case 2:return!(i=u.sent())||e.isDisposed()?[2]:(o=g(i.documentation),s=i.tags?i.tags.map((function(e){return _(e)})).join("  \n\n"):"",a=g(i.displayParts),[2,{range:this._textSpanToRange(e,i.textSpan),contents:[{value:"```typescript\n"+a+"\n```\n"},{value:o+(s?"\n\n"+s:"")}]}])}}))}))},t}(m),k=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideDocumentHighlights=function(e,t,n){return d(this,void 0,void 0,(function(){var n,r,i,s=this;return p(this,(function(a){switch(a.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)];case 1:return[4,a.sent().getOccurrencesAtPosition(n.toString(),r)];case 2:return!(i=a.sent())||e.isDisposed()?[2]:[2,i.map((function(t){return{range:s._textSpanToRange(e,t.textSpan),kind:t.isWriteAccess?o.languages.DocumentHighlightKind.Write:o.languages.DocumentHighlightKind.Text}}))]}}))}))},t}(m),x=function(e){function t(t,n){var r=e.call(this,n)||this;return r._libFiles=t,r}return c(t,e),t.prototype.provideDefinition=function(e,t,n){return d(this,void 0,void 0,(function(){var n,r,i,s,a,u,l,c,d;return p(this,(function(p){switch(p.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)];case 1:return[4,p.sent().getDefinitionAtPosition(n.toString(),r)];case 2:return!(i=p.sent())||e.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(i.map((function(e){return o.Uri.parse(e.fileName)})))];case 3:if(p.sent(),e.isDisposed())return[2];for(s=[],a=0,u=i;a<u.length;a++)l=u[a],c=o.Uri.parse(l.fileName),(d=this._libFiles.getOrCreateModel(c))&&s.push({uri:c,range:this._textSpanToRange(d,l.textSpan)});return[2,s]}}))}))},t}(m),C=function(e){function t(t,n){var r=e.call(this,n)||this;return r._libFiles=t,r}return c(t,e),t.prototype.provideReferences=function(e,t,n,r){return d(this,void 0,void 0,(function(){var n,r,i,s,a,u,l,c,d;return p(this,(function(p){switch(p.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)];case 1:return[4,p.sent().getReferencesAtPosition(n.toString(),r)];case 2:return!(i=p.sent())||e.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(i.map((function(e){return o.Uri.parse(e.fileName)})))];case 3:if(p.sent(),e.isDisposed())return[2];for(s=[],a=0,u=i;a<u.length;a++)l=u[a],c=o.Uri.parse(l.fileName),(d=this._libFiles.getOrCreateModel(c))&&s.push({uri:c,range:this._textSpanToRange(d,l.textSpan)});return[2,s]}}))}))},t}(m),F=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideDocumentSymbols=function(e,t){return d(this,void 0,void 0,(function(){var t,n,r,i,s=this;return p(this,(function(a){switch(a.label){case 0:return t=e.uri,[4,this._worker(t)];case 1:return[4,a.sent().getNavigationBarItems(t.toString())];case 2:return!(n=a.sent())||e.isDisposed()?[2]:(r=function(t,n,i){var a={name:n.text,detail:"",kind:P[n.kind]||o.languages.SymbolKind.Variable,range:s._textSpanToRange(e,n.spans[0]),selectionRange:s._textSpanToRange(e,n.spans[0]),tags:[],containerName:i};if(n.childItems&&n.childItems.length>0)for(var u=0,l=n.childItems;u<l.length;u++){var c=l[u];r(t,c,a.name)}t.push(a)},i=[],n.forEach((function(e){return r(i,e)})),[2,i])}}))}))},t}(m),I=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e}(),P=Object.create(null);P[I.module]=o.languages.SymbolKind.Module,P[I.class]=o.languages.SymbolKind.Class,P[I.enum]=o.languages.SymbolKind.Enum,P[I.interface]=o.languages.SymbolKind.Interface,P[I.memberFunction]=o.languages.SymbolKind.Method,P[I.memberVariable]=o.languages.SymbolKind.Property,P[I.memberGetAccessor]=o.languages.SymbolKind.Property,P[I.memberSetAccessor]=o.languages.SymbolKind.Property,P[I.variable]=o.languages.SymbolKind.Variable,P[I.const]=o.languages.SymbolKind.Variable,P[I.localVariable]=o.languages.SymbolKind.Variable,P[I.variable]=o.languages.SymbolKind.Variable,P[I.function]=o.languages.SymbolKind.Function,P[I.localFunction]=o.languages.SymbolKind.Function;var D,A,L=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:i.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},t.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},t}(m),T=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,r){return d(this,void 0,void 0,(function(){var r,i,o,s,a=this;return p(this,(function(u){switch(u.label){case 0:return r=e.uri,i=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),[4,this._worker(r)];case 1:return[4,u.sent().getFormattingEditsForRange(r.toString(),i,o,L._convertOptions(n))];case 2:return!(s=u.sent())||e.isDisposed()?[2]:[2,s.map((function(t){return a._convertTextChanges(e,t)}))]}}))}))},t}(L),O=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),Object.defineProperty(t.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!1,configurable:!0}),t.prototype.provideOnTypeFormattingEdits=function(e,t,n,r,i){return d(this,void 0,void 0,(function(){var i,o,s,a=this;return p(this,(function(u){switch(u.label){case 0:return i=e.uri,o=e.getOffsetAt(t),[4,this._worker(i)];case 1:return[4,u.sent().getFormattingEditsAfterKeystroke(i.toString(),o,n,L._convertOptions(r))];case 2:return!(s=u.sent())||e.isDisposed()?[2]:[2,s.map((function(t){return a._convertTextChanges(e,t)}))]}}))}))},t}(L),N=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideCodeActions=function(e,t,n,r){return d(this,void 0,void 0,(function(){var r,i,o,s,a,u,l=this;return p(this,(function(c){switch(c.label){case 0:return r=e.uri,i=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),s=L._convertOptions(e.getOptions()),a=n.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),[4,this._worker(r)];case 1:return[4,c.sent().getCodeFixesAtPosition(r.toString(),i,o,a,s)];case 2:return!(u=c.sent())||e.isDisposed()?[2,{actions:[],dispose:function(){}}]:[2,{actions:u.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(t){return l._tsCodeFixActionToMonacoCodeAction(e,n,t)})),dispose:function(){}}]}}))}))},t.prototype._tsCodeFixActionToMonacoCodeAction=function(e,t,n){for(var r=[],i=0,o=n.changes;i<o.length;i++)for(var s=0,a=o[i].textChanges;s<a.length;s++){var u=a[s];r.push({resource:e.uri,edit:{range:this._textSpanToRange(e,u.span),text:u.newText}})}return{title:n.description,edit:{edits:r},diagnostics:t.markers,kind:"quickfix"}},t}(L),M=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.provideRenameEdits=function(e,t,n,r){return d(this,void 0,void 0,(function(){var r,i,s,a,u,l,c,d,f,g;return p(this,(function(p){switch(p.label){case 0:return r=e.uri,i=r.toString(),s=e.getOffsetAt(t),[4,this._worker(r)];case 1:return[4,(a=p.sent()).getRenameInfo(i,s,{allowRenameOfImportPath:!1})];case 2:if(!1===(u=p.sent()).canRename)return[2,{edits:[],rejectReason:u.localizedErrorMessage}];if(void 0!==u.fileToRename)throw new Error("Renaming files is not supported.");return[4,a.findRenameLocations(i,s,!1,!1,!1)];case 3:if(!(l=p.sent())||e.isDisposed())return[2];for(c=[],d=0,f=l;d<f.length;d++)g=f[d],c.push({resource:o.Uri.parse(g.fileName),edit:{range:this._textSpanToRange(e,g.textSpan),text:n}});return[2,{edits:c}]}}))}))},t}(m);function E(e){A=V(e,"typescript")}function K(e){D=V(e,"javascript")}function R(){return new Promise((function(e,t){if(!D)return t("JavaScript not registered!");e(D)}))}function W(){return new Promise((function(e,t){if(!A)return t("TypeScript not registered!");e(A)}))}function V(e,t){var n=new u(t,e),r=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.getLanguageServiceWorker.apply(n,e)},i=new b(r);return o.languages.registerCompletionItemProvider(t,new y(r)),o.languages.registerSignatureHelpProvider(t,new w(r)),o.languages.registerHoverProvider(t,new S(r)),o.languages.registerDocumentHighlightProvider(t,new k(r)),o.languages.registerDefinitionProvider(t,new x(i,r)),o.languages.registerReferenceProvider(t,new C(i,r)),o.languages.registerDocumentSymbolProvider(t,new F(r)),o.languages.registerDocumentRangeFormattingEditProvider(t,new T(r)),o.languages.registerOnTypeFormattingEditProvider(t,new O(r)),o.languages.registerCodeActionProvider(t,new N(r)),o.languages.registerRenameProvider(t,new M(r)),new v(i,e,t,r),r}}}]);