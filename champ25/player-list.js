const players = [
  { name: 'Julien Delamarche', country: 'France', emaNumber: '04530005', hasPaid: 'Yes' },
  { name: 'Marion Hoarau', country: 'France', emaNumber: '04090005', hasPaid: 'Yes' },
  { name: 'Jérémie Pierard de Maujoy', country: 'France', emaNumber: '04160071', hasPaid: 'Yes' },
  { name: 'Matthieu Fontaine', country: 'France', emaNumber: '04530001', hasPaid: 'Yes' },
  { name: 'Antony Ea', country: 'France', emaNumber: '04041005', hasPaid: 'Yes' },
  { name: 'Anne Royet', country: 'France', emaNumber: '04090098', hasPaid: 'Yes' },
  { name: 'Omar Mansour', country: 'France', emaNumber: '04040321', hasPaid: 'Yes' },
  { name: 'Sacha Dunan', country: 'France', emaNumber: '04320030', hasPaid: 'Yes' },
  { name: 'Nicolas Baptiste', country: 'France', emaNumber: '04410014', hasPaid: 'Yes' },
  { name: 'Nehuen Penaloza', country: 'France', emaNumber: '04160088', hasPaid: 'Yes' },
  { name: 'Sergio Lima', country: 'Portugal', emaNumber: '12990014', hasPaid: 'Yes' },
  { name: 'Henri Devillez', country: 'Belgium', emaNumber: '02010074', hasPaid: 'Yes' },
  { name: "Christiane D'Angelo", country: 'France', emaNumber: '04040036', hasPaid: 'Yes' },
  { name: 'Pierric Willemet', country: 'France', emaNumber: '04310040', hasPaid: 'Yes' },
  { name: 'Karten Zajac', country: 'France', emaNumber: '04530008', hasPaid: 'Yes' },
  { name: 'Benoit Dessort', country: 'France', emaNumber: '04160103', hasPaid: 'Yes' },
  { name: 'Alexandre Dauriac', country: 'France', emaNumber: '04530002', hasPaid: 'Yes' },
  { name: 'Anthony Barbier', country: 'France', emaNumber: '04160158', hasPaid: 'Yes' },
  { name: 'Valentin Courtois', country: 'France', emaNumber: '04310012', hasPaid: 'Yes' },
  { name: 'Nikolas Zajac', country: 'France', emaNumber: '04530009', hasPaid: 'Yes' },
  { name: 'Samuel Marchal', country: 'France', emaNumber: '04140010', hasPaid: 'Yes' },
  { name: 'Maxime Rouvreau', country: 'France', emaNumber: '04160170', hasPaid: 'Yes' },
  { name: 'Jordan Hemmings', country: 'France', emaNumber: '04160114', hasPaid: 'Yes' },
  { name: 'Guillaume Chambas', country: 'France', emaNumber: '04230050', hasPaid: 'Yes' },
  { name: 'Cédric Aguerre', country: 'France', emaNumber: '04090080', hasPaid: 'Yes' },
  { name: 'Gabriel Destrieux', country: 'France', emaNumber: '04090078', hasPaid: 'Yes' },
  { name: 'Annie Manzo', country: 'France', emaNumber: '04090024', hasPaid: 'Yes' },
  { name: 'Bruno Manzo', country: 'France', emaNumber: '04090025', hasPaid: 'Yes' },
  { name: 'Manuel Tertre', country: 'France', emaNumber: '04160092', hasPaid: 'Yes' },
  { name: 'Hugues Motte', country: 'France', emaNumber: '04530016', hasPaid: 'Yes' },
  { name: 'Lilian Billod', country: 'France', emaNumber: '04670001', hasPaid: 'Yes' },
  { name: 'Anthony Suong', country: 'France', emaNumber: '04300046', hasPaid: 'Yes' },
  { name: 'Vianney Heimburger', country: 'France', emaNumber: '04670004', hasPaid: 'Yes' },
  { name: 'Manuel Santos', country: 'France', emaNumber: '04290023', hasPaid: 'Yes' },
  { name: 'Fabien François', country: 'France', emaNumber: '04990118', hasPaid: 'Yes' },
  { name: 'Benoît Messi-Fouda', country: 'France', emaNumber: '04040026', hasPaid: 'No' },
  { name: 'Marie-Thérèse Lacaille', country: 'France', emaNumber: '04510004', hasPaid: 'Yes' },
  { name: 'Marian Jones', country: 'France', emaNumber: '04310050', hasPaid: 'Yes' },
  { name: 'Jean-Marc Cazarre', country: 'France', emaNumber: '04990009', hasPaid: 'Yes' },
  { name: 'Erwan Sammut', country: 'France', emaNumber: '04530011', hasPaid: 'Yes' },
  { name: 'Louis Farina', country: 'France', emaNumber: '04530013', hasPaid: 'Yes' },
  { name: 'Alexis Petitjean', country: 'France', emaNumber: '04160082', hasPaid: 'Yes' },
  { name: 'Sasha Fourmage', country: 'France', emaNumber: '04530015', hasPaid: 'Yes' },
  { name: 'Steven Hue', country: 'France', emaNumber: '04310086', hasPaid: 'Yes' },
  { name: 'Vasile Gherman', country: 'France', emaNumber: '04210032', hasPaid: 'No' },
  { name: 'Loïc de Kergommeaux', country: 'France', emaNumber: '04290031', hasPaid: 'No' },
  { name: 'Debbie Chan', country: 'Switzerland', emaNumber: '16000065', hasPaid: 'Yes' },
  { name: 'Matthias Moyon', country: 'France', emaNumber: '04990115', hasPaid: 'Yes' },
  { name: 'Bryan Manchez', country: 'France', emaNumber: '04320013', hasPaid: 'Yes' },
  { name: 'Claude Sessin', country: 'France', emaNumber: '04320026', hasPaid: 'Yes' },
  { name: 'Jimin Yoon', country: 'France', emaNumber: '04520003', hasPaid: 'Yes' },
  { name: 'Alexandre Pinchard', country: 'France', emaNumber: '04600009', hasPaid: 'Yes' },
  { name: 'Julien Borderas', country: 'France', emaNumber: '04530018', hasPaid: 'Yes' },
  { name: 'Filipp Sporykhin', country: 'France', emaNumber: '04520005', hasPaid: 'Yes' },
  { name: 'Silène Yu', country: 'France', emaNumber: '04690001', hasPaid: 'Yes' },
  { name: 'Zageeth Mannokaran', country: 'France', emaNumber: '04160108', hasPaid: 'Yes' },
  { name: 'Abdelah El Fahim', country: 'France', emaNumber: '04600002', hasPaid: 'Yes' },
  { name: 'Abdoullah Abid', country: 'France', emaNumber: '04600003', hasPaid: 'No' },
  { name: 'Rayen Haddad', country: 'France', emaNumber: '04600016', hasPaid: 'No' },  
  { name: 'Adrien Leroy', country: 'France', emaNumber: '04520001', hasPaid: 'Yes' },
  { name: 'Dean Wang', country: 'Germany', emaNumber: '05000060', hasPaid: 'No' },
  { name: 'Jeroen Chen', country: 'Netherlands', emaNumber: '08010752', hasPaid: 'Yes' },
  { name: 'Nina Popławska-Lima', country: 'Poland', emaNumber: '19000071', hasPaid: 'Yes' },
  { name: 'Andy Xu', country: 'France', emaNumber: '04530017', hasPaid: 'No' },
  { name: 'Alexis Gouet', country: 'France', emaNumber: '04310037', hasPaid: 'No' },
  { name: 'Guillaume Bonnamour', country: 'France', emaNumber: '04670003', hasPaid: 'No' },
  { name: 'Cécile Blanc', country: 'France', emaNumber: '04320014', hasPaid: 'Yes' },
  { name: 'Theophane Jeronimo', country: 'France', emaNumber: '04670008', hasPaid: 'No' },
  { name: 'Claire Warin', country: 'France', emaNumber: '04310079', hasPaid: 'No' },
  { name: 'Pei Tang', country: 'Germany', emaNumber: '05000071', hasPaid: 'No' },
  { name: 'Feiyang Qiu', country: 'Belgium', emaNumber: '02000043', hasPaid: 'No' },
  { name: 'Florent Guth', country: 'France', emaNumber: '', hasPaid: 'No' }
];

function getFlagUrl(country) {
    let url = '';
    if (country === 'France') {
        url = 'https://flagcdn.com/fr.svg';
    } else if (country === 'Belgium') {
        url = 'https://flagcdn.com/be.svg';
    } else if (country === 'Portugal') {
        url = 'https://flagcdn.com/pt.svg';
    } else if (country === 'Switzerland') {
        url = 'https://flagcdn.com/ch.svg';
    } else if (country === 'United Kingdom') {
        url = 'https://flagcdn.com/gb.svg';
    } else if (country === 'Germany') {
        url = 'https://flagcdn.com/de.svg';
    } else if (country === 'Netherlands') {
        url = 'https://flagcdn.com/nl.svg';
    } else if (country === 'Poland') {
        url = 'https://flagcdn.com/pl.svg';
    }
    return url;
}


function renderTableRows(lang = "en") {
    // Build registered (paid) list up to 64, push everyone else to waiting
    const registered = [];
    const waiting = [];

    players.forEach(player => {
        if (player.hasPaid === 'Yes' && registered.length < 64) {
            registered.push(player);
        } else {
            waiting.push(player);
        }
    });

    var rows = '';
    // Render registered players with numbering
    registered.forEach((player, idx) => {
        rows += '<tr>';
        rows += '<td>' + (idx + 1) + '</td>';
        rows += '<td>' + player.name + '</td>';
        rows += '<td class="flag-cell"><img src="' + getFlagUrl(player.country) + '" alt="' + player.country + '" style="width:24px;height:16px;"></td>';
        rows += '<td style="text-align: right">' + (player.emaNumber || '') + '</td>';
        let color = (player.hasPaid === 'Yes') ? 'green' : 'red';
        let paidText = player.hasPaid;
        if (lang === "fr") {
            paidText = (player.hasPaid === 'Yes') ? 'Oui' : 'Non';
        }
        rows += '<td class="fee-paid" style="color: ' + color + ';">' + paidText + '</td>';
        rows += '</tr>';
    });

    // Fill up to 64 rows with empty placeholders
    for (let i = registered.length; i < 64; i++) {
        rows += '<tr>';
        rows += '<td>' + (i + 1) + '</td>';
        rows += '<td></td>';
        rows += '<td class="flag-cell"></td>';
        rows += '<td style="text-align: right"></td>';
        rows += '<td class="fee-paid"></td>';
        rows += '</tr>';
    }

    document.getElementById('60-body').innerHTML = rows;

    // Also render waiting rows for convenience (so a single call updates both)
    renderWaitRowsFromArray(waiting, lang);
}

function renderWaitRows() {
    // kept for compatibility, builds waiting list from scratch same as above
    const registered = [];
    const waiting = [];
    players.forEach(player => {
        if (player.hasPaid === 'Yes' && registered.length < 64) {
            registered.push(player);
        } else {
            waiting.push(player);
        }
    });

    // If no lang provided, infer from document; otherwise use provided value
    if (typeof lang === 'undefined' || lang === null) {
        const docLang = (document.documentElement.lang || '').toLowerCase();
        lang = docLang.startsWith('fr') ? 'fr' : 'en';
    }

    renderWaitRowsFromArray(waiting, lang);
}

function renderWaitRowsFromArray(waitingArray, lang = "en") {
    var waitrows = '';
    // Waiting list: first column is a greyed-out "-" to keep columns aligned,
    // then Name, Flag, EMA ID (right), Fee Paid (localized)
    waitingArray.forEach((player) => {
        waitrows += '<tr>';
        waitrows += '<td class="row-num" style="color:#999;text-align:center;">-</td>';
        waitrows += '<td>' + player.name + '</td>';
        waitrows += '<td class="flag-cell"><img src="' + getFlagUrl(player.country) + '" alt="' + player.country + '" style="width:24px;height:16px;"></td>';
        waitrows += '<td style="text-align: right">' + (player.emaNumber || '') + '</td>';

        let color = (player.hasPaid === 'Yes') ? 'green' : 'red';
        let paidText;
        if (lang === "fr") {
            paidText = (player.hasPaid === 'Yes') ? 'Oui' : 'Non';
        } else {
            paidText = (player.hasPaid === 'Yes') ? 'Yes' : 'No';
        }
        waitrows += '<td class="fee-paid" style="color: ' + color + ';">' + paidText + '</td>';
        waitrows += '</tr>';
    });
    document.getElementById('wait-body').innerHTML = waitrows;
}
