const players = [
  { name: 'Louis Farina', country: 'France', emaNumber: '04530013', hasPaid: 'No' },
  { name: 'Paul-Arthur Valet', country: 'France', emaNumber: '04990106', hasPaid: 'No' },
  { name: 'Alexandre Dauriac', country: 'France', emaNumber: '04530002', hasPaid: 'No' },
  { name: 'Julien Fouques', country: 'France', emaNumber: '04160081', hasPaid: 'No' },
  { name: 'Nicolas Baptiste', country: 'France', emaNumber: '04410014', hasPaid: 'No' },
  { name: 'Pierric Willemet', country: 'France', emaNumber: '04310040', hasPaid: 'No' },
  { name: 'Loup Francineau', country: 'France', emaNumber: '04580033', hasPaid: 'No' },
  { name: 'Matthias Moyon', country: 'France', emaNumber: '04690010', hasPaid: 'No' },
  { name: 'Anthony Barbier', country: 'France', emaNumber: '04690008', hasPaid: 'No' },
  { name: 'Selim Tlatli', country: 'France', emaNumber: '04690009', hasPaid: 'No' },
  { name: 'Junjie Sun', country: 'Spain', emaNumber: '10990103', hasPaid: 'No' },
  { name: 'Mercure Bigot', country: 'France', emaNumber: '04580038', hasPaid: 'No' },
  { name: 'Lilian Billod', country: 'France', emaNumber: '04670001', hasPaid: 'No' },
  { name: 'Marie-Thérèse Lacaille', country: 'France', emaNumber: '04510004', hasPaid: 'No' },
  { name: 'Cécile Blanc', country: 'France', emaNumber: '04320014', hasPaid: 'No' },
  { name: 'Karten Zajac', country: 'France', emaNumber: '04530008', hasPaid: 'No' },
  { name: 'Maxime Rouvreau', country: 'France', emaNumber: '04160170', hasPaid: 'No' },
  { name: 'Niko Zajac', country: 'France', emaNumber: '04530009', hasPaid: 'No' },
  { name: 'Sasha Fourmage', country: 'France', emaNumber: '04530015', hasPaid: 'No' },
  { name: 'Kevin Chau', country: 'France', emaNumber: '04240014', hasPaid: 'No' },
  { name: 'Fabien Francois', country: 'France', emaNumber: '04990118', hasPaid: 'No' },
  { name: 'Michał Tkaczyk', country: 'Poland', emaNumber: '19000168', hasPaid: 'No' },
  { name: 'Łukasz Grzybowski', country: 'Poland', emaNumber: '19000073', hasPaid: 'No' },
  { name: 'Caroline Dupuis', country: 'France', emaNumber: '04580006', hasPaid: 'No' },
  { name: 'Miaou Toto', country: 'France', emaNumber: '04040105', hasPaid: 'No' },
  { name: 'Julien Delamarche', country: 'France', emaNumber: '04530005', hasPaid: 'No' },
  { name: 'Minh Tri Tran', country: 'France', emaNumber: '04320005', hasPaid: 'No' },
  { name: 'Chantal Tran', country: 'France', emaNumber: '04320006', hasPaid: 'No' },
  { name: 'Ho Ming Chan', country: 'United Kingdom', emaNumber: '11000090', hasPaid: 'No' },
  { name: 'Vianney Heimburger', country: 'France', emaNumber: '04670004', hasPaid: 'No' },
  { name: 'Loïc Allègre', country: 'France', emaNumber: '04580032', hasPaid: 'No' },
  { name: 'François Zhao', country: 'France', emaNumber: '04160181', hasPaid: 'No' },
  { name: 'Dimitri Gay', country: 'France', emaNumber: '', hasPaid: 'No' },
  { name: 'Erwan Sammut', country: 'France', emaNumber: '04530011', hasPaid: 'No' },
  { name: 'Vasile Gherman', country: 'France', emaNumber: '04210022', hasPaid: 'No' },
  { name: 'Sophie Delauche', country: 'Belgium', emaNumber: '002010084', hasPaid: 'No' }
];

const examRefereePlayers = [
    { name: 'Stelena Benes', country: 'France', emaNumber: '04530006', hasPaid: 'Yes' },
    { name: 'Nicolas Baptiste', country: 'France', emaNumber: '04410014', hasPaid: 'No' },
    { name: 'Loup Francineau', country: 'France', emaNumber: '04580033', hasPaid: 'No' },
    { name: 'Matthias Moyon', country: 'France', emaNumber: '04690010', hasPaid: 'No' },
    { name: 'Anthony Barbier', country: 'France', emaNumber: '04690008', hasPaid: 'No' },
    { name: 'Mercure Bigot', country: 'France', emaNumber: '04580038', hasPaid: 'No' },
    { name: 'Lilian Billod', country: 'France', emaNumber: '04670001', hasPaid: 'No' },
    { name: 'Dario Moed', country: 'France', emaNumber: '04530004', hasPaid: 'Yes' },
    { name: 'Sasha Fourmage', country: 'France', emaNumber: '04530015', hasPaid: 'No' },
    { name: 'Guillaume Aubut', country: 'France', emaNumber: '04530003', hasPaid: 'No' },
    { name: 'Kevin Chau', country: 'France', emaNumber: '04240014', hasPaid: 'No' },
    { name: 'Fabien Francois', country: 'France', emaNumber: '04990118', hasPaid: 'No' },
    { name: 'Caroline Dupuis', country: 'France', emaNumber: '04580006', hasPaid: 'No' },
    { name: 'Vianney Heimburger', country: 'France', emaNumber: '04670004', hasPaid: 'No' },
    { name: 'Nathan Chavas', country: 'France', emaNumber: '04530038', hasPaid: 'Yes' }

];

function getFlagUrl(country) {
  return country === 'France' ? 'https://flagcdn.com/fr.svg'
    : country === 'Poland' ? 'https://flagcdn.com/pl.svg'
    : country === 'Spain' ? 'https://flagcdn.com/es.svg'
    : country === 'United Kingdom' ? 'https://flagcdn.com/gb.svg'
    : country === 'Belgium' ? 'https://flagcdn.com/be.svg'
    : '';
}

function renderTableRows(lang = 'en') {
  const registered = players.slice(0, 64);
  const waiting = players.slice(64);

  let rows = '';
  registered.forEach((player, index) => {
    const paidText = lang === 'fr'
      ? (player.hasPaid === 'Yes' ? 'Oui' : 'Non')
      : player.hasPaid;
    const paidColor = player.hasPaid === 'Yes' ? 'green' : 'red';
    rows += '<tr>';
    rows += '<td>' + (index + 1) + '</td>';
    rows += '<td>' + player.name + '</td>';
    rows += '<td class="flag-cell"><img src="' + getFlagUrl(player.country) + '" alt="' + player.country + '" style="width:24px;height:16px;"></td>';
    rows += '<td style="text-align: right">' + player.emaNumber + '</td>';
    rows += '<td class="fee-paid" style="color: ' + paidColor + ';">' + paidText + '</td>';
    rows += '</tr>';
  });

  document.getElementById('60-body').innerHTML = rows;
  renderWaitRowsFromArray(waiting, lang);
}

function renderWaitRows(lang) {
  if (typeof lang === 'undefined' || lang === null) {
    lang = (document.documentElement.lang || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  const waiting = players.slice(64);
  renderWaitRowsFromArray(waiting, lang);
}

function renderWaitRowsFromArray(waitingArray, lang = 'en') {
  let rows = '';
  waitingArray.forEach(player => {
    const paidText = lang === 'fr' ? 'Non' : 'No';
    rows += '<tr>';
    rows += '<td class="row-num" style="color:#999;text-align:center;">-</td>';
    rows += '<td>' + player.name + '</td>';
    rows += '<td class="flag-cell"><img src="' + getFlagUrl(player.country) + '" alt="' + player.country + '" style="width:24px;height:16px;"></td>';
    rows += '<td style="text-align: right">' + player.emaNumber + '</td>';
    rows += '<td class="fee-paid" style="color: red;">' + paidText + '</td>';
    rows += '</tr>';
  });
  document.getElementById('wait-body').innerHTML = rows;
}

function renderExamRefereeRows(lang = 'en') {
  let rows = '';
  examRefereePlayers.forEach((player, index) => {
    const paidText = lang === 'fr'
      ? (player.hasPaid === 'Yes' ? 'Oui' : 'Non')
      : player.hasPaid;
    const paidColor = player.hasPaid === 'No' ? 'green' : 'red';
    rows += '<tr>';
    rows += '<td>' + (index + 1) + '</td>';
    rows += '<td>' + player.name + '</td>';
    rows += '<td class="flag-cell"><img src="' + getFlagUrl(player.country) + '" alt="' + player.country + '" style="width:24px;height:16px;"></td>';
    rows += '<td style="text-align: right">' + player.emaNumber + '</td>';
    rows += '<td class="fee-paid" style="color: ' + paidColor + ';">' + paidText + '</td>';
    rows += '</tr>';
  });
  document.getElementById('exam-referee-body').innerHTML = rows;
}