$(function() {
  new Clipboard('.btn-clipboard');
  $('#viewout #code-post').hide();

  class CodeGenerator {
    constructor(form_hash) {
        this.form_hash = form_hash;
    }

    generate() {
        throw "Not implemented";
    }
  }

  class MusicGenerator extends CodeGenerator {
    generate() {
        var form_hash = this.form_hash;
        var code =
            "<b>" + form_hash['artist'] + " ー " + form_hash['album-name'] + " (" + form_hash['year'] + ")</b></br>" +
            "<i>" + form_hash['tags'] + "</i></br></br>"

        if (form_hash['cover']) {
            code +=  "<img src=\"" + form_hash['cover'] + "\" alt=\"" + form_hash['album-name'] + "\" width=\"550\" height=\"550\"></br></br>"
        }

        if (form_hash['annotation']) {
            code += form_hash['annotation'].replace(/\n/g, "</br>").trim() + "</br></br>";
        }

        if (form_hash['rutracker-mp3'] || form_hash['rutracker-flac'] || form_hash['other-load']) {
            code += "Скачать: "
            var links = "";
            if (form_hash['rutracker-mp3']) {
                links += "<a href=\"" + form_hash['rutracker-mp3'] + "\">Rutracker mp3</a>"
            }
            if (form_hash['rutracker-flac']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['rutracker-flac'] + "\">Rutracker FLAC</a>"
            }
            if (form_hash['other-load']) {
                if (links) { links += " | или " }
                links += "<a href=\"" + form_hash['other-load'] + "\">вот отсюда</a>"
            }
            code += links + "</br>"
        }

        if (form_hash['itunes'] || form_hash['ya-music'] || form_hash['bandcamp'] || form_hash['soundcloud'] || form_hash['other-listen']) {
            code += "Послушать / купить: "
            var links = "";
            if (form_hash['itunes']) {
                links += "<a href=\"" + form_hash['itunes'] + "\">iTunes</a>"
            }
            if (form_hash['ya-music']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['ya-music'] + "\">ЯМузыка</a>"
            }
            if (form_hash['bandcamp']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['bandcamp'] + "\">Bandcamp</a>"
            }
            if (form_hash['soundcloud']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['soundcloud'] + "\">Soundcloud</a>"
            }
            if (form_hash['other-listen']) {
                if (links) {
                    links += " | или "
                }
                links += "<a href=\"" + form_hash['other-listen'] + "\">вот здесь</a>"
            }
            code += links + "</br>"
        }
        return code;
    }
  }

  class CinemaGenerator extends CodeGenerator {
    generate() {
        var form_hash = this.form_hash;
        var code = "";

        if (form_hash['name_orig'] || form_hash['name_ru'] || form_hash['year'] || form_hash['from'] || form_hash['director']) {
            var title = "";
            if (form_hash['name_orig']) {
                title += form_hash['name_orig']
            }
            if (form_hash['name_ru']) {
                if (title) { title += " | " }
                title += form_hash['name_ru']
            }
            if (form_hash['year']) {
                if (title) { title += " | " }
                title += form_hash['year']
            }
            if (form_hash['from']) {
                if (title) { title += " | " }
                title += form_hash['from']
            }
            if (form_hash['director']) {
                if (title) { title += " | " }
                title += "Реж.: " + form_hash['director']
            }
            code += "<b>" + title + "</b></br></br>"
        }

        if (form_hash['poster']) {
            code +=  "<img src=\"" + form_hash['poster'] + "\" alt=\"" + form_hash['name_orig'] + "\" width=\"550\"></br></br>"
        }

        if (form_hash['trailer'] || form_hash['imdb'] || form_hash['kinopoisk'] || form_hash['rutracker']) {
            var links = "";
            if (form_hash['trailer']) {
                links += "<a href=\"" + form_hash['trailer'] + "\">Trailer</a>"
            }
            if (form_hash['imdb']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['imdb'] + "\">IMDb</a>"
            }
            if (form_hash['kinopoisk']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['kinopoisk'] + "\">КП</a>"
            }
            if (form_hash['rutracker']) {
                if (links) { links += " | " }
                links += "<a href=\"" + form_hash['rutracker'] + "\">Rutracker</a>"
            }
            code += links + "</br></br>"
        }

        if (form_hash['annotation']) {
            code += "<i>" + form_hash['annotation'].replace(/\n/g, "</br>").trim() + "</i></br></br>";
        }
        if (form_hash['my_annotation']) {
            code += form_hash['my_annotation'].replace(/\n/g, "</br>").trim() + "</br></br>";
        }

        return code;
    }
  }

  $('.post-form').submit( function(e) {
    var outarea = $('#viewout #code-post pre');
    var viewarea = $('#viewout #preview-post');

    var form_data = $(this).serializeArray();
    var form_hash = {};
    form_data.forEach(function(elem) {
        form_hash[elem['name']] = elem['value'];
    });

    var generator;
    switch(this['id']) {
    case 'music-form':
        generator = new MusicGenerator(form_hash);
        break;
    case 'cinema-form':
        generator = new CinemaGenerator(form_hash);
        break;
    }
    var code = generator.generate();

    $('#viewout #code-post').show();
    outarea.text(code.replace(/<\/br>/g, "\n").trim());
    viewarea.html(code);
    return false;
  });
});
