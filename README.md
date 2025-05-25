# file-uploader-doc-blurring
A file uploader for blurring sensitive documents within upload process

This component is communicating with API Gateway in AWS to blure out sensitive documents from the image being uploaded.

HOW TO USE:
1. In head add <script type="module" src="https://cdn.jsdelivr.net/gh/MariDreamer/file-uploader-doc-blurring@main/custom-uploader.js"></script>
2. In HTML add <custom-uploader></custom-uploader>
3. In JS add event listeners to handle the processingerror and processingcomplete events, f.e:
 
 document.querySelector('custom-uploader').addEventListener('processingcomplete', (e) => {
    const blob = e.detail;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  document.querySelector('custom-uploader').addEventListener('processingerror', (e) => {
    alert("Error uploading or processing the image: " + e.detail.message);
  });
