export default class Alert {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      const alerts = await response.json();

      if (alerts.length > 0) {
        this.displayAlerts(alerts);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  displayAlerts(alerts) {
    const section = document.createElement('section');
    section.classList.add('alert-list');

    alerts.forEach(alert => {
      const p = document.createElement('p');
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = '1rem';
      p.style.margin = '0';
      p.style.fontWeight = 'bold';
      p.classList.add("alert-message", alert.class);

      section.appendChild(p);
    });

    const main = document.querySelector('main');
    if (main) {
      main.prepend(section);
    }
  }
}