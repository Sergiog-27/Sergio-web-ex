const URL_SUPABASE = "https://uqezzhneqpbtczbfnywi.supabase.co"; 
const CLE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZXp6aG5lcXBidGN6YmZueXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTk1NTAsImV4cCI6MjA5NjIzNTU1MH0.azvUSDsr88j03tiYuWdxhta2G_OYipQeM3P1X-0d_XY"; // votre clé anon (Project Settings → API)
const supabase = window.supabase.createClient(URL_SUPABASE, CLE_ANON);

const form = document.querySelector("#contacts");
const confirmation = document.querySelector("#confirmation");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const nom = document.querySelector("#nom").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  if (!nom || !email.includes("@") || !message) {
    confirmation.textContent = "Remplis tous les champs avec un e-mail valide.";
    return;
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ nom: nom, email: email, message: message });

  if (error) {
    confirmation.textContent = "Oups, l'envoi a échoué. Réessaie.";
    console.error(error);
  } else {
    confirmation.textContent = `Merci ${nom}, ton message a bien été enregistré.`;
    form.reset();
  }
});
