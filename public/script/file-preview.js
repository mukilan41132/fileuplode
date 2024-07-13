const filepicker = document.getElementById("image");
const imagepreview = document.getElementById("image-preview");

function showpreview() {
    const files = filepicker.files;
    if (!files || files.length === 0) {
        imagepreview.style.display = 'none';
        return;
    }
    const pickedfile = files[0];
    imagepreview.src = URL.createObjectURL(pickedfile);
    imagepreview.style.display = 'block';
}
filepicker.addEventListener('change', showpreview);