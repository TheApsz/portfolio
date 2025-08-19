$(document).ready(function () {
    const seasonToMonth = {
        's': 3,  // Spring → April
        'S': 6,  // Summer → July
        'a': 9,  // Autumn → October
        'w': 0   // Winter → January
    };

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = Jan

    $('[class*="expDate"]').each(function () {
        const classes = $(this).attr('class').split(/\s+/);

        for (const cls of classes) {
            const match = cls.match(/^expDate(\d{4})([sSaw])$/);
            if (match) {
                const startYear = parseInt(match[1]);
                const season = match[2];
                const startMonth = seasonToMonth[season];

                let totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
                totalMonths = Math.max(totalMonths, 0);

                const rawYears = totalMonths / 12;
                const years = Math.floor(rawYears);
                const decimal = Math.floor((rawYears - years) * 10);

                const result = `${years}.${decimal} years of`;
                $(this).text(result);
                break;
            }
        }
    });
});