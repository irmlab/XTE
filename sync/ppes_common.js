//=================== Helpers
if(!String.prototype.trim)
{
  String.prototype.trim = function ()
  {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
function isEmpty( el ){ return !$.trim(el.html()) }
//=================== EO Helpers



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


    //==== Be sure to hide all social items
    $('div.comments').hide();
    $('div.share-controls').hide();

    //==== Setup the permalink (avoid errors in html code)
    $('.i3buttonLink', xte.jsid)
      .click(function ()
             {
               var aref = $(this).attr('title').match(/#.+/);
               var msg = 'Ctrl+C para copiar el permalink:' + (Array(92).join(' '));
               var txt = ''
                           + location.protocol + '/'+'/'    // Do not confuse packing
                           + location.hostname
                           + (xte.jsid.prop('id').replace(/i3(\d{4})(\d{2})(.+)/, '/$1/$2/$1$2$3'))
                           + '.html'
                 + aref;
               window.prompt(msg, txt);
             });

    //==== Disable the options for view=classic
    if(window.location.search.match(/view=classic/))
    {
      //$('.i3buttonDlg', xte.jsid).hide();
      return;
    }

    // All other views are correct
    // Initialize tabs only once !
    $('.i3dialogs',xte.jsid)
      .accessibleTabs({
//                        position: 'bottom',
                        fx: "fadeIn",
                        fxspeed: "slow"
                      });

    // Click on button initializes the dialogs
    $('.i3buttonDlg', xte.jsid)
      .mouseup(function ()
             {
               xte.jsid = $(this).closest('.i3common');

               var el = $(".i3dialogs", xte.jsid);

               xte.resetErrors();
//               xte.bavure.isCommitted = false;
//               xte.bavure.savedSelection = '';
//               xte.desiderata.isCommitted = false;
//               xte.desiderata.savedSelection = '';


               el.toggle();
               if(el.is(":visible"))
               {
                  xte.bavure.init();
                  xte.desiderata.init();
                  $('.i3buttonDlg', xte.jsid)
                    .html("Menos...")
                    .attr('title', "Cerrar panel interactivo");


                  //==== Move the social footer to the social tab
                  $('.i3social', xte.jsid)
//                    .append($('div.share-controls').has('.share-twitter'))
                    .append($('div.comments'));
                  $('div.comments', xte.jsid).show();
                  $('div.share-controls', xte.jsid).show();
               }
               else
               {
                 xte.closeDialogs();
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
      $('.i3buttonDlg', xte.jsid)
       .html("Más...")
       .attr('title', "Abrir panel interactivo");

      //==== Remove  social footer to the social tab
//      $('div.comments', xte.jsid).remove();
//      $('div.share-controls', xte.jsid).remove();


      $(".i3dialogs", xte.jsid).hide();

      // Reset context
      $(".i3formError", xte.jsid).hide();
      $('.i3fieldError', xte.jsid).removeClass('i3fieldError');
      xte.bavure.savedSelection = '';
      xte.desiderata.savedSelection = '';
    };


    // ========== BAVURES     (unused for mono-language)

    xte.bavure.init = function ()
    {
    };
    // Append the selection to the xte buffer
    xte.bavure.copy = function ()
    {
    };

    // ========== DESIDERATA

    xte.desiderata.init = function ()
    {

      $(".i3DesNick", xte.jsid).val("");
      $(".i3DesComment", xte.jsid).val("");
      $(".i3DesEmail", xte.jsid).val("");

//      xte.resetErrors();
      xte.desiderata.isCommitted = false;
      xte.desiderata.savedSelection = '';


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
                    if(!s.length)     formError = "Su comentario está vacío.";

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
      /*
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


// Use the / * * to preserve the comments on packing
      /**
        ppcc script -- (c) 2013-2016 irmlab.com
      **/
      /**
       * @See GetSelectedText function
       * Copyright 2012, Sam Sehnert, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       **/
