 /* <form name="it"> <div align="center"> <input onclick="copyit(this.form.select1)" type="button" value="Press to copy the highlighted text" name="btnCopy"> <p> <textarea name="select1" rows="4" cols="45"></textarea> </div> </form> onload="if(varCommit%JSID) alert('Merci pour votre suggestion !'); return false;"></iframe> <script type="text/javascript">var varCommit%JSID=false;</script> */ if(!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); }; } function isEmpty( el ){ return !$.trim(el.html()) } if(undefined == window.xte) { xte = {}; xte.bavure = {}; xte.desiderata = {}; } (function ($) { xte.jsid = null; xte.savedSelection = ''; jQuery.fn.xteEnviron = function () { xte.jsid = $(this).closest('.i3common'); $('div.comments').hide(); $('div.share-controls').hide(); $('.i3buttonLink', xte.jsid) .click(function () { var aref = $(this).attr('title').match(/#.+/); var msg = 'Ctrl+C pour copier le permalien:' + (Array(92).join(' ')); var txt = '' + location.protocol + '/'+'/' + location.hostname + xte.jsid.prop('id').replace(/i3(\d{4})(\d{2})(.+)/, '/$1/$2/$1$2$3') + '.html' + aref; window.prompt(msg, txt); }); if(window.location.search.match(/view=classic/)) { return; } /* */ $('.i3dialogs',xte.jsid) .accessibleTabs({ fx: "fadeIn", fxspeed: "normal" }); $('.i3buttonDlg', xte.jsid) .mouseup(function () { xte.jsid = $(this).closest('.i3common'); var el = $(".i3dialogs", xte.jsid); xte.resetErrors(); el.toggle(); if(el.is(":visible")) { xte.bavure.init(); xte.desiderata.init(); $('.i3buttonDlg', xte.jsid) .html("Moins...") .attr('title', "Fermer le volet interactif"); $('.i3social', xte.jsid) .append($('div.comments')); $('div.comments', xte.jsid).show(); $('div.share-controls', xte.jsid).show(); } else { xte.closeDialogs(); } }); xte.resetErrors = function () { $(".i3formError", xte.jsid).hide(); $('.i3fieldError', xte.jsid).removeClass('i3fieldError'); }; xte.closeDialogs = function () { $('.i3buttonDlg', xte.jsid) .html("Plus...") .attr('title', "Ouvrir le volet interactif"); $(".i3dialogs", xte.jsid).hide(); $(".i3formError", xte.jsid).hide(); $('.i3fieldError', xte.jsid).removeClass('i3fieldError'); xte.bavure.savedSelection = ''; xte.desiderata.savedSelection = ''; }; xte.bavure.init = function () { $(".i3BavNick", xte.jsid).val(""); $(".i3BavSelected", xte.jsid).val(""); $(".i3BavModified", xte.jsid).val(""); $(".i3formError", xte.jsid).hide(); $('.i3fieldError', xte.jsid).removeClass('i3fieldError'); xte.bavure.isCommitted = false; xte.bavure.savedSelection = ''; xte.bavure.copy(); $('.i3formBavure', xte.jsid) .submit(function (e) { var s = $(".i3BavSelected").val().trim(); var m = $(".i3BavModified").val().trim(); if((!s.length) || (!m.length) || (s == m)) { var formError = ''; if(!s.length) formError = "Indiquez le texte source contenant la bavure. "; else if(!m.length) formError = "Indiquez la correction souhaitée."; else if(m == s) formError = "Vous n'avez rien modifié."; $(".i3BavModified").addClass('i3fieldError').focus(); $(".i3formError", this).text(formError).show(); e.preventDefault(); return false; } xte.bavure.isCommitted = true; xte.closeDialogs(); return true; }); $('.i3frameBavure', xte.jsid) .load(function (e) { e.preventDefault(); if(true == xte.bavure.isCommitted) { alert('Merci ! Votre correction est enregistrée !'); $(this).off('load'); xte.bavure.isCommitted = false; } }); }; xte.bavure.copy = function () { xte.resetErrors(); var currentSelected = xte.getSelectedText(); if(currentSelected.length) { xte.bavure.savedSelection += currentSelected + "\n"; } $(".i3BavSelected", xte.jsid).val(xte.bavure.savedSelection); var currentModified = $(".i3BavModified", xte.jsid).val(); if(0 == currentModified.length) { $(".i3BavModified", xte.jsid).val(xte.bavure.savedSelection); } }; xte.desiderata.init = function () { $(".i3DesNick", xte.jsid).val(""); $(".i3DesComment", xte.jsid).val(""); $(".i3DesEmail", xte.jsid).val(""); xte.desiderata.isCommitted = false; xte.desiderata.savedSelection = ''; xte.desiderata.copy(); $('.i3formDesiderata', xte.jsid) .submit(function (e) { var s; s = $(".i3DesComment").val().trim(); if((!s.length)) { var formError; if(!s.length) formError = "Votre commentaire est vide."; $(".i3DesComment").addClass('i3fieldError').focus(); $(".i3formError", this).text(formError).show(); e.preventDefault(); return false; } s = $(".i3DesNick").val().trim(); if(!s.length) { $(".i3DesNick").val('none');} s = $(".i3DesMail").val().trim(); if(!s.length) { $(".i3DesMail").val('none');} xte.desiderata.isCommitted = true; xte.closeDialogs(); return true; }); $('.i3frameDesiderata', xte.jsid) .load(function (e) { e.preventDefault(); if(true == xte.desiderata.isCommitted) { alert('Merci ! Votre commentaire est enregistré !'); xte.desiderata.isCommitted = false; $(this).off('load'); } }); }; xte.desiderata .copy = function () { xte.resetErrors(); var currentSelected = xte.getSelectedText(); if(currentSelected.length) { xte.desiderata.savedSelection += currentSelected + "\n"; } $(".i3DesComment", xte.jsid).val(xte.desiderata.savedSelection); }; xte.getSelectedText = function () { /** * Copyright 2012, Digital Fusion * Licensed under the MIT license. * http://teamdf.com/jquery-plugins/license/ * * @author Sam Sehnert * @desc A small plugin that checks whether elements are within * the user visible viewport of a web browser. * only accounts for vertical position, not horizontal. */ var t = ''; if(window.getSelection) { t = window.getSelection(); } else if(document.getSelection) { t = document.getSelection(); } else if(document.selection) { t = document.selection.createRange().text; } return t.toString().trim(); }; }; })(jQuery); 