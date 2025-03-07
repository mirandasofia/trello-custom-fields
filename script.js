var t = TrelloPowerUp.iframe();

document.addEventListener("DOMContentLoaded", async function() {
    const formContainer = document.body;
    
    try {
        // Buscar os campos personalizados do JSON
        const response = await fetch("custom-fields.json");
        const customFields = await response.json();

        // Criar os campos dinamicamente no HTML
        customFields.fields.forEach(field => {
            const label = document.createElement("label");
            label.textContent = field.name;
            formContainer.appendChild(label);

            let input;
            if (field.type === "text") {
                input = document.createElement("input");
                input.type = "text";
            } else if (field.type === "date") {
                input = document.createElement("input");
                input.type = "date";
            } else if (field.type === "dropdown") {
                input = document.createElement("select");
                field.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
            }

            input.id = `field-${field.id}`;
            formContainer.appendChild(input);
            formContainer.appendChild(document.createElement("br"));
        });

        // Adiciona botão de salvar
        const saveButton = document.createElement("button");
        saveButton.textContent = "Salvar";
        formContainer.appendChild(saveButton);

        // Carregar dados salvos no Trello
        t.get("card", "shared", "customFields").then(savedData => {
            if (savedData) {
                customFields.fields.forEach(field => {
                    const input = document.getElementById(`field-${field.id}`);
                    if (input && savedData[field.id]) {
                        input.value = savedData[field.id];
                    }
                });
            }
        });

        // Evento para salvar os dados no Trello
        saveButton.addEventListener("click", function() {
            let dataToSave = {};
            customFields.fields.forEach(field => {
                const input = document.getElementById(`field-${field.id}`);
                if (input) {
                    dataToSave[field.id] = input.value;
                }
            });

            t.set("card", "shared", "customFields", dataToSave).then(() => {
                alert("Campos salvos com sucesso!");
            });
        });

        // Garante que o Power-Up seja renderizado corretamente
        t.render(() => {
            console.log("Power-Up carregado corretamente!");
        });

    } catch (error) {
        console.error("Erro ao carregar os campos personalizados:", error);
    }
});
