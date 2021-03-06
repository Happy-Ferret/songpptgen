'use strict';
var define = typeof define === 'function' ? define : (dep, def) => { module.exports = def.apply(null, dep.map(d => require(d))) };

/*
 * Classic layouter: layouts a song similar to SongBeamer
 *
 */
define(['../parser'], function(parser) {
    'use strict';
    return function(song_) {
        let song = parser.validateOrder(song_);

        let ret = {
            algorithm: 'classic',
            pages: [],
            pageheight: 7.5 * 72,
            pagewidth: 10 * 72
        };

        song.order.reduce((r, a) => r.concat(song.parts[a]), [])
        .forEach((part, i, a) => {
            if (!part)
                return;

            var page = {
                bgcolor: 'background',
                shapes: []
            };

            if (i == 0) {
                var title = {
                    type: 'text',
                    content: song.title,
                    color: 'title',
                    align: 'center',
                    underline: true,
                    fontsize: 32,
                    fontface: 'Arial',
                    x: 0,
                    y: 0,
                    w: ret.pagewidth,
                    h: 64
                };
                page.shapes.push(title);
            }

            if (i == a.length-1) {
                page.shapes.push({
                    type: 'text',
                    content: song.copyright,
                    color: 'copyright',
                    align: 'left',
                    fontsize: 16,
                    fontface: 'Arial',
                    x: 0,
                    y: 0,
                    w: ret.pagewidth,
                    h: ret.pageheight,
                    valign: 'bottom'
                });
            }

            page.shapes.push({
                type: 'text',
                content: part,
                color: 'text',
                align: 'center',
                fontsize: 32,
                lineheight: 1.4,
                fontface: 'Arial',
                x: 0,
                y: 64,
                w: ret.pagewidth,
                h: ret.pageheight - 64
            });

            ret.pages.push(page);
        });

        return ret;
    }
});
