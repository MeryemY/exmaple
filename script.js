const button = document.getElementById("button");
const input = document.getElementById("prompt");

button.addEventListener("click", async () => {
  const res = await fetch("/api",{
    method: "POST", body: JSON.stringify({prompt: input.value})  });
  const result = await res.json();
  const img1 = document.getElementById("sticker_image");
  img1.src = result.images[0].url;
  console.log(result);
});
