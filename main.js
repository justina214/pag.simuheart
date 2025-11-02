async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input?.value?.trim();
  if (!message) return;

  const chatlog = document.getElementById("chatlog");
  if (chatlog) {
    chatlog.innerHTML += `<div><strong>Vos:</strong> ${message}</div>`;
    chatlog.innerHTML += `<div><strong>SimuBot:</strong> (Chat deshabilitado temporalmente en GitHub Pages)</div>`;
  }
  if (input) input.value = "";
}

const pacientes = [
  {
    id: "9979",
    sexo: "Female",
    murmur: "Present",
    murmurLocations: ["AV", "MV", "PV", "TV"],
    mostAudible: "TV",
    systolic: {
      timing: "Holosystolic",
      shape: "Diamond",
      grade: "III/VI",
      pitch: "High",
      quality: "Harsh"
    },
    diastolic: {
      timing: "nan"
    }
  }
  // podés agregar más pacientes con el mismo formato
];
function filtrarPacientes() {
  const punto = document.getElementById("filtro-punto").value;
  const timing = document.getElementById("filtro-timing").value;

  const resultado = pacientes.find(p =>
    (p.mostAudible === punto || punto === "") &&
    (p.systolic.timing === timing || timing === "")
  );

  const resultadoAudio = document.getElementById("resultado-audio");
  resultadoAudio.innerHTML = "";

  if (resultado) {
    const puntos = ["AV", "MV", "PV", "TV"];
    puntos.forEach(punto => {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = `audios/${resultado.id}_${punto}.wav`;

      const label = document.createElement("p");
      label.textContent = `Punto de auscultación: ${punto}`;

      resultadoAudio.appendChild(label);
      resultadoAudio.appendChild(audio);
    });
  } else {
    resultadoAudio.innerHTML = "<p>No se encontraron coincidencias.</p>";
  }
}
