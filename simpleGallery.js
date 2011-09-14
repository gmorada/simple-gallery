/* SimpleGallery
 * By Gustavo Hingel Morada
    @gmorada, www.facebook.com/gusmorada
 * MIT Licensed.
 */

var SimpleGallery = Class.extend({

    init: function()
    {
        this.totalObjs = ($('._gallery').length-1),
        this.wrapImgs();
        this.bindEvents();
        this.createIds();
        this.wrapContent();
        this.createControlElements();
        this.bindControlEvents();
        this.refreshGalleryItems();
    },

    wrapImgs: function()
    {
        $('._gallery').wrap('<li class="_list list"></li>');
        $('._list').wrapAll('<ul class="_galleryController listWrapper"></ul>');
    },

    bindEvents: function()
    {
        $.each($('._list'), function(i)
        {
            $(this).attr('id', 'gallery'+i);
            $(this).click(function()
            {
                $.each($('._galleryContentWrapper'), function()
                {
                    $(this).hide();
                });
                var galleryId = $(this).attr('id');
                $('._list').removeClass('selected');
                $(this).addClass('selected');
                var id = galleryId.substr('gallery'.length);
                $('#wrapper'+id).show();
            });
        this.totalObjs += 1;
        });
    },

    createIds: function()
    {
        $.each($('._galleryContentWrapper'), function(i)
        {
            if(i > 0)
                $(this).hide();
            $(this).attr('id', 'wrapper'+i);
        });

    },

    wrapContent: function()
    {
        $('._galleryContentWrapper').wrapAll('<div class="galleryWrapper"></div>')

    },

    createControlElements: function()
    {
        $('._galleryController').before('<span id="galleryBackward" class="backward"><img alt="Voltar"/></span>');
        $('._galleryController').after('<span id="galleryForward" class="forward"><img alt="Avancar"/></span>');
    },

    bindControlEvents: function()
    {
        var total = this.totalObjs;
        $('#galleryForward').mouseenter(function()
        {
            if($('#gallery'+total).position().left > 380)
            {
                $.each($('._list'), function()
                {
                    $(this).css('left','-=10');
                });
            }
            timerFor = setTimeout(function()
            {
                $('#galleryForward').mouseenter();
            }, 25);
        });

        $('#galleryForward').mouseout(function()
        {
            clearTimeout(timerFor);
        });


        $('#galleryBackward').mouseenter(function()
        {
            if($('#gallery0').position().left < 20 )
            {
                $.each($('._list'), function()
                {
                    $(this).css('left','+=10');
                });
            }
            timerBack = setTimeout(function()
            {
                $('#galleryBackward').mouseenter();
            }, 25);
        });

        $('#galleryBackward').mouseout(function()
        {
            clearTimeout(timerBack);
        });
    },

    refreshGalleryItems: function()
    {
        $.each($('._list'), function(i)
        {
            $(this).css('left', (((i)*120)+20));
        });
    }
});
