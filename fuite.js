document.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("playerStats"));
  
    let level = saved?.level || 20;
    let hp = saved?.hp || 50;
  
    const levelSpan = document.getElementById("level");
    const hpSpan = document.getElementById("hp");
    const logText = document.getElementById("log-text");
    const trainBtn = document.getElementById("train-btn");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupChoices = document.getElementById("popup-choices");
  
    levelSpan.textContent = level;
    hpSpan.textContent = hp;
  
    trainBtn.addEventListener("click", () => {
      level++;
      levelSpan.textContent = level;
  
      const logMessages = [
        "Vous courez seul, chaque souffle est plus lourd.",
        "Le silence devient votre seule arme.",
        "Vous répétez les gestes vus autrefois, maladroitement.",
        "Chaque jour vous éloigne… et pourtant vous n'oubliez pas.",
        "L’ombre est votre manteau, mais elle ne réchauffe rien."
      ];
  
      const message = logMessages[Math.floor(Math.random() * logMessages.length)];
      logText.textContent = message;
  
      if (level === 30) {
        triggerFuiteFinal();
      }
    });
  
    function triggerFuiteFinal() {
      trainBtn.disabled = true;
      popup.style.display = "flex";
  
      popupText.textContent = `Les années passent… ou peut-être seulement des semaines.\nLes nouvelles sont rares, puis funestes.\nL’armée royale a été balayée.\n Le château dans lequel vous vous cachez est l’un des derniers bastions du royaume.\nL’ennemi approche. Ils ne font pas de prisonniers.\n 🏰 Les tambours de guerre résonnent à nouveau, mais cette fois, plus proches.\n Le Lord du château refuse de se rendre.\nLes archers se placent. Les épées sont tirées.\nEt vous, qui aviez fui… êtes cette fois au milieu de la mêlée, sans entraînement, sans repère. \n 💀 \b \n Une lance vous transperce. Vous tombez.\nLe sol est froid. La guerre vous a rattrapé.`;
  
      const restart = document.createElement("button");
      restart.textContent = "Vous avez fui la guerre… mais pas le destin.";
      restart.onclick = () => window.location.href = "index.html";
      popupChoices.appendChild(restart);
    }
  });
  