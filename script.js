//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      reject("Failed to download image: " + url);
    };

    img.src = url;
  });
}

function downloadImages() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.innerHTML = '<div class="spinner"></div>';
  error.textContent = "";
  output.innerHTML = "";

  const promises = images.map(function (image) {
    return downloadImage(image.url);
  });

  Promise.all(promises)
    .then(function (downloadedImages) {
      loading.innerHTML = "";

      downloadedImages.forEach(function (img) {
        output.appendChild(img);
      });
    })
    .catch(function (err) {
      loading.innerHTML = "";
      error.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);