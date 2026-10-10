$(function() {
    const SWEEP_MS = 1000;
    const SWEEP_GAP = -800;
    const PADDING = 1;

    const FONT = {
        A: [
            '.###.',
            '#...#',
            '#...#',
            '#####',
            '#...#',
            '#...#',
            '#...#'
        ],
        P: [
            '####.',
            '#...#',
            '#...#',
            '####.',
            '#....',
            '#....',
            '#....'
        ],
        S: [
            '.####',
            '#....',
            '#....',
            '.###.',
            '....#',
            '....#',
            '####.'
        ],
        Z: [
            '#####',
            '....#',
            '...#.',
            '..#..',
            '.#...',
            '#....',
            '#####'
        ]
    };

    const word = 'APSZ';
    const rows = 7;
    const grid = Array.from({ length: rows }, () => []);

    word.split('').forEach((ch, li) => {
        const glyph = FONT[ch];
        if (!glyph) return;
        glyph.forEach((rowStr, r) => {
            rowStr.split('').forEach((c) => {
                grid[r].push(c);
            });
            if (li < word.length - 1) {
                grid[r].push('.');
            }
        });
    });

    for (let p = 0; p < PADDING; p++) {
        const padRow = Array(grid[0].length).fill('.');
        grid.unshift([...padRow]);
        grid.push([...padRow]);
    }
    grid.forEach((row) => {
        for (let p = 0; p < PADDING; p++) {
            row.unshift('.');
            row.push('.');
        }
    });

    const $matrix = $('.heroMatrix');
    if (!$matrix.length) return;
    $matrix.empty();
    $matrix.attr('role', 'img');
    $matrix.attr('aria-label', word);

    const cells = [];
    let maxBand = 0;

    grid.forEach((row, r) => {
        row.forEach((c, col) => {
            const isLetter = c === '#';
            const band = col + r;
            if (band > maxBand) maxBand = band;
            const $cell = $('<div></div>').addClass('px').addClass('off');
            $matrix.append($cell);
            cells.push({ el: $cell, band: band, isLetter: isLetter });
        });
    });

    const bands = maxBand + 1;
    const perBand = SWEEP_MS / bands;

    function showFinal() {
        cells.forEach((cell) => {
            if (cell.isLetter) {
                cell.el.removeClass('off').addClass('on');
            } else {
                cell.el.removeClass('on').addClass('off');
            }
        });
        $matrix.addClass('settled');
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showFinal();
        return;
    }

    for (let b = 0; b < bands; b++) {
        setTimeout(() => {
            cells.forEach((cell) => {
                if (cell.band === b) {
                    cell.el.removeClass('off').addClass('on');
                }
            });
        }, Math.round(b * perBand));
    }

    const phase2Start = Math.round(SWEEP_MS + SWEEP_GAP);

    for (let b = 0; b < bands; b++) {
        setTimeout(() => {
            cells.forEach((cell) => {
                if (cell.band === b && !cell.isLetter) {
                    cell.el.removeClass('on').addClass('off');
                }
            });
            if (b === bands - 1) {
                $matrix.addClass('settled');
            }
        }, Math.round(phase2Start + b * perBand));
    }
});
