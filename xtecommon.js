//http://www.htmlgoodies.com/beyond/javascript/article.php/3887346
/*
 //  in the body of your web page, add the following where you want the text to appear:
 <form name="it">
 <div align="center">
 <input onclick="copyit(this.form.select1)" type="button" value="Press to copy the highlighted text" name="btnCopy">
 <p>
 <textarea name="select1" rows="4" cols="45"></textarea>
 </div>
 </form>
 onload="if(varCommit%JSID) alert('Merci pour votre suggestion !'); return false;"></iframe>
 <script type="text/javascript">var varCommit%JSID=false;</script>
 */


if(!String.prototype.trim)
{
  String.prototype.trim = function ()
  {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if(undefined == window.xte)
{
  xte = {};
  xte.bavure = {};
  xte.desiderata = {};
}

(function ($)
{

  xte.jsid = null;
  xte.savedSelection = '';

  jQuery.fn.xteEnviron = function ()
  {
    xte.jsid = $(this).closest('.i3common');

    //==== Setup the permalink (avoid errors in html code)
    $('.i3buttonLink', xte.jsid)
      .click(function ()
             {
               var aref = $(this).attr('title').match(/#.+/);
               var msg = 'Ctrl+C pour copier le permalien:' + (Array(92).join(' '));
               var txt = ''
                           + location.protocol + '//'
                           + location.hostname
                           + xte.jsid.prop('id').replace(/i3(\d{4})(\d{2})(.+)/, '/$1/$2/$1$2$3')
                           + '.html'
                 + aref;
               window.prompt(msg, txt);
             });

    //==== Disable the options for view=classic
    if(window.location.search.match(/view=classic/))
    {
      $('.i3buttonDlg', xte.jsid).hide();
      return;
    }

    // All other views are correct

    // Initialize tabs only once !
    $('.i3dialogs')
      .accessibleTabs({
                        position: 'bottom',
                        fx: "fadeIn",
                        fxspeed: "slow"
                      });

    // Click on button initializes the dialogs
    $('.i3buttonDlg')
      .click(function ()
             {
               xte.jsid = $(this).closest('.i3common');

               var el = $(".i3dialogs", xte.jsid);

               xte.resetErrors();
               xte.bavure.isCommitted = false;
               xte.bavure.savedSelection = '';
               xte.desiderata.isCommitted = false;
               xte.desiderata.savedSelection = '';


               el.toggle();
               if(el.is(":visible"))
               {
                 xte.bavure.init();
                 xte.desiderata.init();
               }
             });

    xte.resetErrors = function ()
    {
      // Reset context
      $(".i3formError", xte.jsid).hide();
      $('.i3fieldError', xte.jsid).removeClass('i3fieldError');
    };

    xte.closeDialogs = function ()
    {
      $(".i3dialogs", xte.jsid).hide();

      // Reset context
      $(".i3formError", xte.jsid).hide();
      $('.i3fieldError', xte.jsid).removeClass('i3fieldError');
      xte.bavure.savedSelection = '';
      xte.desiderata.savedSelection = '';
    };


    // ========== BAVURES

    xte.bavure.init = function ()
    {
      $(".i3BavNick", xte.jsid).val("");
      $(".i3BavSelected", xte.jsid).val("");
      $(".i3BavModified", xte.jsid).val("");

      $(".i3formError", xte.jsid).hide();
      $('.i3fieldError', xte.jsid).removeClass('i3fieldError');

      xte.bavure.isCommitted = false;
      xte.bavure.savedSelection = '';
      xte.bavure.copy();

      // submission event
      $('.i3formBavure', xte.jsid)
        .submit(function (e)
                {
                  /* post box blank */
                  var s = $(".i3BavSelected").val().trim();
                  var m = $(".i3BavModified").val().trim();
                  if((!s.length) || (!m.length) || (s == m))
                  {
                    var formError = '';
                    if(!s.length)     formError = "Indiquez le texte source contenant la bavure. ";
                    else if(!m.length) formError = "Indiquez la correction souhaitée.";
                    else if(m == s) formError = "Vous n'avez rien modifié.";

                    $(".i3BavModified").addClass('i3fieldError').focus();
                    $(".i3formError", this).text(formError).show();


                    e.preventDefault();
                    return false;
                  }
                  xte.bavure.isCommitted = true;    // Allow confirmation Alert
                  xte.closeDialogs();
                  return true;
                });

      // Iframe Callback after submission
      $('.i3frameBavure', xte.jsid)
        .load(function (e)
              {
                e.preventDefault();
                if(true == xte.bavure.isCommitted)
                {
                  alert('Merci ! Votre correction est enregistrée !');
                  $(this).off('load');
                  xte.bavure.isCommitted = false;
                }
              });
    };
    // Append the selection to the xte buffer
    xte.bavure.copy = function ()
    {
      xte.resetErrors();
      var currentSelected = xte.getSelectedText();
      if(currentSelected.length)
      {
        xte.bavure.savedSelection += currentSelected + "\n";
      }
      $(".i3BavSelected", xte.jsid).val(xte.bavure.savedSelection);

      var currentModified = $(".i3BavModified", xte.jsid).val();
      if(0 == currentModified.length)
      {
        $(".i3BavModified", xte.jsid).val(xte.bavure.savedSelection);
      }
    };

    // ========== DESIDERATA

    xte.desiderata.init = function ()
    {
      xte.desiderata.isCommitted = false;
      xte.desiderata.savedSelection = '';

      $(".i3DesNick", xte.jsid).val("");
      $(".i3DesComment", xte.jsid).val("");
      $(".i3DesEmail", xte.jsid).val("");

      xte.resetErrors();


      // submission event
      $('.i3formDesiderata', xte.jsid)
        .submit(function (e)
                {
                  var s;
                  /* error for post box blank */
                  s = $(".i3DesComment").val().trim();
                  if((!s.length))
                  {
                    var formError;
                    if(!s.length)     formError = "Votre commentaire est vide.";

                    $(".i3DesComment").addClass('i3fieldError').focus();
                    $(".i3formError", this).text(formError).show();

                    e.preventDefault();
                    return false;
                  }
                  /* Defaults */
                  s = $(".i3DesNick").val().trim();
                  if(!s.length)
                  { $(".i3DesNick").val('none');}
                  s = $(".i3DesMail").val().trim();
                  if(!s.length)
                  { $(".i3DesMail").val('none');}


                  xte.desiderata.isCommitted = true;    // Allow confirmation Alert
                  xte.closeDialogs();
                  return true;
                });

      // Iframe Callback after submission
      $('.i3frameDesiderata', xte.jsid)
        .load(function (e)
              {
                e.preventDefault();
                if(true == xte.desiderata.isCommitted)
                {
                  alert('Merci ! Votre commentaire est enregistré !');
                  xte.desiderata.isCommitted = false;
                  $(this).off('load');
                }
              });
    };
    // Append the selection to the xte buffer
    xte.desiderata
      .copy = function ()
    {
      xte.resetErrors();
      var currentSelected = xte.getSelectedText();
      if(currentSelected.length)
      {
        xte.desiderata.savedSelection += currentSelected + "\n";
      }
      $(".i3DesComment", xte.jsid).val(xte.desiderata.savedSelection);

    };

    //============== HELPERS

    xte.getSelectedText = function ()
    {
      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */
      var t = '';
      if(window.getSelection)
      {
        t = window.getSelection();
      }
      else if(document.getSelection)
      {
        t = document.getSelection();
      }
      else if(document.selection)
      {
        t = document.selection.createRange().text;
      }
      return t.toString().trim();
    };

  };


})(jQuery);
