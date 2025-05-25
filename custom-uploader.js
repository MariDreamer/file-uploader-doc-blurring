class CustomUploader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <input type="file" accept="image/jpeg" />
      <style>
        input { margin: 10px; }
      </style>`
    ;

    this.input = this.shadowRoot.querySelector('input');
    this.input.addEventListener('change', this.handleUpload.bind(this));
  }

  async handleUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'image/jpeg') {
      alert("Only JPEG files are supported.");
      return;
    }

    try {
      const response = await fetch('https://7h7rl41agh.execute-api.eu-central-1.amazonaws.com/processFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: file
      });

      if (!response.ok) throw new Error('Upload failed.');

      const blob = await response.blob();

      // Dispatch custom event with the blob
      this.dispatchEvent(new CustomEvent('processingcomplete', {
        detail: blob,
        bubbles: true,
        composed: true
      }));
    } catch (err) {
      console.error(err);
      this.dispatchEvent(new CustomEvent('processingerror', {
        detail: err,
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('custom-uploader', CustomUploader);