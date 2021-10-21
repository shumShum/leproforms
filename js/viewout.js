$(function () {
    new ClipboardJS('.btn-clipboard');
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
                "#album\n" +
                "**" + form_hash['artist'] + " — " + form_hash['album-name'] + " (" + (form_hash['year'] || "2021") + ")**\n\n"

            var links = "";
            if (form_hash['vk']) {
                links += "[Spotify](" + form_hash['spotify'] + ")"
            }
            if (form_hash['deezer']) {
                if (links) { links += " | " }
                links += "[Deezer](" + form_hash['deezer'] + ")"
            }
            if (form_hash['spotify']) {
                if (links) { links += " | " }
                links += "[Apple](" + form_hash['apple'] + ")"
            }
            if (form_hash['yandex']) {
                if (links) { links += "\n" }
                links += "[Yandex](" + form_hash['yandex'] + ")"
            }
            if (form_hash['apple']) {
                if (links) { links += " | " }
                links += "[VK](" + form_hash['vk'] + ")"
            }
            if (form_hash['youtube']) {
                if (links) { links += " | " }
                links += "[YouTube](" + form_hash['youtube'] + ")"
            }

            code += links + "\n\n" +
                form_hash['annotation'].trim() + "\n\n\n" +
                form_hash['tags'].split(" ").map(function (e) { return "#" + e }).join(" ")

            return code;
        }
    }

    $('.post-form').submit(function (e) {
        var outarea = $('#viewout #code-post pre');
        var viewarea = $('#viewout #preview-post');

        var form_data = $(this).serializeArray();
        var form_hash = {};
        form_data.forEach(function (elem) {
            form_hash[elem['name']] = elem['value'];
        });

        var generator;
        switch (this['id']) {
            case 'music-form':
                generator = new MusicGenerator(form_hash);
                break;
        }
        var code = generator.generate();

        $('#viewout #code-post').show();
        outarea.text(code.replace(/<\/br>/g, "\n").trim());
        viewarea.html(code);
        return false;
    });

    function genLinks() {
        var artist = $('#artist-input').val()
        var album = $('#album-input').val()
        var search = artist + " " + album

        $('#vk-link').attr("href", "https://vk.com/search?c%5Bq%5D=" + search + "&c%5Bsection%5D=auto");
        $('#deezer-link').attr("href", "https://www.deezer.com/search/" + search)
        $('#spotify-link').attr("href", "https://open.spotify.com/search/" + search)
        $('#youtube-link').attr("href", "https://music.youtube.com/search?q=" + search)
        $('#yandex-link').attr("href", "https://music.yandex.ru/search?text=" + search)
        $('#lastfm-link').attr("href", "https://www.last.fm/ru/music/" + artist)
        $('#googlepic-link').attr("href", "https://www.google.com/search?tbm=isch&tbs=isz:l&q=" + search)
    }

    $('#artist-input').on('input', function (e) { genLinks(); });
    $('#album-input').on('input', function (e) { genLinks(); });
});
