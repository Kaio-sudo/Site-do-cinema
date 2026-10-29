const accessForm = document.querySelector("#accessForm");
const visitorNameInput = document.querySelector("#visitorName");
const accessMessage = document.querySelector("#accessMessage");
const welcomeScreen = document.querySelector("#welcomeScreen");
const homeScreen = document.querySelector("#homeScreen");
const ticketScreen = document.querySelector("#ticketScreen");
const confirmDialog = document.querySelector("#confirmDialog");
const ticketCodeElement = document.querySelector("#ticketCode");
const whatsappLink = document.querySelector("#whatsappLink");

const cinemaName = "CineLove";
const guestName = "Geovanna";
const filmTitle = "Filme surpresa";
const sessionDate = "07/11/2026";
const sessionLocation = "sua casa";
let ticketCode = "";

accessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredName = visitorNameInput.value.trim();
    if (enteredName.toLocaleLowerCase("pt-BR") !== guestName.toLocaleLowerCase("pt-BR")) {
        accessMessage.textContent = "Este cantinho é exclusivo para uma pessoa muito especial. Tente novamente ♥";
        visitorNameInput.setAttribute("aria-invalid", "true");
        visitorNameInput.focus();
        return;
    }

    accessMessage.textContent = "";
    visitorNameInput.removeAttribute("aria-invalid");
    welcomeScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

visitorNameInput.addEventListener("input", () => {
    visitorNameInput.removeAttribute("aria-invalid");
    accessMessage.textContent = "";
});

document.querySelector("#openConfirm").addEventListener("click", () => {
    confirmDialog.showModal();
});

function closeConfirmation() {
    confirmDialog.close();
}

document.querySelector("#closeConfirm").addEventListener("click", closeConfirmation);
document.querySelector("#cancelConfirm").addEventListener("click", closeConfirmation);

document.querySelector("#generateTicket").addEventListener("click", () => {
    ticketCode = createTicketCode();
    ticketCodeElement.textContent = ticketCode;
    updateWhatsAppLink();
    closeConfirmation();
    homeScreen.classList.add("hidden");
    ticketScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function createTicketCode() {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return `CL-${randomNumber}`;
}

function updateWhatsAppLink() {
    const message = [
        "Olá! Aqui está meu ingresso para a sessão especial do CineLove! 🎬❤️",
        `Nome: ${guestName}`,
        `Filme: ${filmTitle}`,
        `Data: ${sessionDate}`,
        `Local: ${sessionLocation}`,
        `Código do ingresso: ${ticketCode}`
    ].join("\n");

    whatsappLink.href = `https://wa.me/5561993717158?text=${encodeURIComponent(message)}`;
}

document.querySelector("#downloadTicket").addEventListener("click", downloadTicketImage);

function downloadTicketImage() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
        window.alert("Não foi possível preparar a imagem do ingresso neste navegador.");
        return;
    }

    canvas.width = 1200;
    canvas.height = 520;
    context.fillStyle = "#21171d";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#d5b27a";
    context.lineWidth = 3;
    context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

    context.fillStyle = "#d5b27a";
    context.font = "700 24px Arial";
    context.fillText("♥  CINELOVE", 64, 82);
    context.font = "700 16px Arial";
    context.fillText("INGRESSO ESPECIAL", 840, 78);

    context.fillStyle = "#b24665";
    context.font = "700 22px Arial";
    context.fillText("UMA SESSÃO PARA", 64, 170);
    context.fillStyle = "#f8f1ed";
    context.font = "500 62px Georgia";
    context.fillText(guestName, 64, 244);
    context.fillStyle = "#b7a9ae";
    context.font = "24px Arial";
    context.fillText(`${filmTitle} · escolhido com carinho`, 64, 291);

    context.fillStyle = "#d5b27a";
    context.font = "700 17px Arial";
    context.fillText("DATA", 64, 356);
    context.fillText("LOCAL", 310, 356);
    context.fillText("SESSÃO", 540, 356);
    context.fillStyle = "#f8f1ed";
    context.font = "22px Arial";
    context.fillText("07 NOV 2026", 64, 392);
    context.fillText("Minha casa", 310, 392);
    context.fillText("Exclusiva", 540, 392);
    context.fillStyle = "#b24665";
    context.font = "40px Arial";
    context.fillText("♥", 1050, 230);
    context.fillStyle = "#a99ba1";
    context.font = "700 13px Arial";
    context.fillText("CÓDIGO DO INGRESSO", 910, 310);
    context.fillStyle = "#d5b27a";
    context.font = "700 25px Arial";
    context.fillText(ticketCode, 930, 348);

    const barcodeX = 921;
    for (let index = 0; index < 24; index += 1) {
        const width = index % 3 === 0 ? 5 : 2;
        context.fillStyle = "#e0cba6";
        context.fillRect(barcodeX + index * 6, 375, width, 54);
    }

    canvas.toBlob((blob) => {
        if (!blob) {
            window.alert("Não foi possível gerar a imagem do ingresso. Tente novamente.");
            return;
        }

        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = `ingresso-${cinemaName.toLowerCase()}-${ticketCode.toLowerCase()}.png`;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    }, "image/png");
}

document.querySelector("#backHome").addEventListener("click", () => {
    ticketScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
});
