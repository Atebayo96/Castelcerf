document.addEventListener("DOMContentLoaded", () => {
    let level = 1;
    let hp = Math.floor(Math.random() * 100) + 1;
    let stats = {
      force: 1,
      intelligence: 1,
      agilite: 1,
      sagesse: 1,
      endurance: 1 // Ajouté pour infanterie
    };
  
    const levelSpan = document.getElementById("level");
    const hpSpan = document.getElementById("hp");
    const logText = document.getElementById("log-text");
    const trainBtn = document.getElementById("train-btn");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupChoices = document.getElementById("popup-choices");
  
    hpSpan.textContent = hp;
    levelSpan.textContent = level;
  
    const trainingMessages = [
      "Le vent fouette ton visage. Tu tiens un peu plus longtemps.",
      "Tes bras tremblent, mais tu ne lâches pas la pierre.",
      "Une prière s'élève au loin. Tu ne sais pas pourquoi… mais tu l'entends.",
      "Tu tombes. Tu te relèves. Encore.",
      "Une vieille nonne t'observe. Elle ne dit rien.",
      "Tu cours jusqu'à en vomir. Et pourtant, tu continues.",
      "Le froid pénètre ta peau. Mais il ne gèle pas ton courage.",
      "Ton cœur bat plus fort. Ton corps s'endurcit.",
      "Tes mains saignent. Tes yeux brillent.",
      "Tu entends un murmure... ou peut-être est-ce ton souffle."
    ];
  
    trainBtn.addEventListener("click", () => {
      level++;
      levelSpan.textContent = level;
  
      // HP fluctuation
      let hpChange = Math.random() < 0.01 ? Math.floor(Math.random() * 11) - 5 : Math.floor(Math.random() * 3) - 1;
      hp += hpChange;
      if (hp < 0) hp = 0;
      hpSpan.textContent = hp;
  
      // Stats gain
      stats.force += Math.floor(Math.random() * 3);
      stats.intelligence += Math.floor(Math.random() * 3);
      stats.agilite += Math.floor(Math.random() * 3);
      stats.sagesse += Math.floor(Math.random() * 3);
      stats.endurance += Math.floor(Math.random() * 2); // Bonus pour infanterie future
  
      // Message d'entraînement
      const message = trainingMessages[Math.floor(Math.random() * trainingMessages.length)];
      logText.textContent = `"${message}"`;
  
      if (level === 20) {
        triggerWarPopup();
      }
    });
  
    function triggerWarPopup() {
      trainBtn.disabled = true;
      popup.classList.remove("hidden");
      popup.style.display = "flex";
      popupText.textContent = "Des sabots frappent la terre battue. La paix vacille. Les bannières du roi flottent à l'horizon. Les recruteurs arpentent les villages, criant le besoin de bras pour la guerre à venir. ";
  
      popupChoices.innerHTML = "";
  
      const flee = document.createElement("button");
      flee.textContent = "L'ombre est plus douce que le sang versé";
      flee.onclick = () => handleFuite();
  
      const join = document.createElement("button");
      join.textContent = "Je prendrai les armes pour le royaume";
      join.onclick = () => {
        localStorage.setItem("playerStats", JSON.stringify({
          level,
          hp,
          stats
        }));
        window.location.href = "war.html";
      };
  
      popupChoices.appendChild(flee);
      popupChoices.appendChild(join);
    }
  
    function handleFuite() {
      popup.style.display = "flex";
      popupText.textContent = " Lorsque les recruteurs arrivent, vous vous cachez. Le bruit des sabots s'éloigne, et le silence revient. Personne ne vous a vu. Vous n'êtes pas monté dans les chariots. Vous ne partez pas à la guerre. Mais une voix en vous murmure : Et si tu avais été celui qui aurait pu tout changer ?";
   
      popupChoices.innerHTML = "";
      const trainAgain = document.createElement("button");
      trainAgain.textContent = "Continuer à s'entrainer";
      trainAgain.onclick = () => {
        localStorage.setItem("playerStats", JSON.stringify({
          level,
          hp,
          stats,
          role: "fuite"
        }));
        window.location.href = "fuite.html";
      };
      popupChoices.appendChild(trainAgain);}

  });
  