.framework-viewer-pro {
  text-align: center;
}

.framework-viewer-pro__intro {
  max-width: 900px;
  margin: 0 auto 24px;
}

.framework-viewer-pro__media {
  max-width: var(--framework-max-width);
  margin: 0 auto;
}

.framework-viewer-pro__trigger {
  background: none;
  border: 0;
  padding: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  cursor: zoom-in;
}

.framework-viewer-pro__image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 16px;
}

.framework-viewer-pro__caption {
  max-width: var(--framework-max-width);
  margin: 16px auto 0;
}

.framework-viewer-pro__actions {
  margin-top: 20px;
}

.framework-viewer-pro__download {
  display: inline-block;
  text-decoration: none;
}

.framework-viewer-pro__placeholder {
  max-width: var(--framework-max-width);
  margin: 0 auto;
  padding: 40px;
  border: 1px dashed #ccc;
  border-radius: 16px;
}

.framework-viewer-pro__lightbox[hidden] {
  display: none;
}

.framework-viewer-pro__lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
}

.framework-viewer-pro__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, calc(var(--framework-overlay-opacity) / 100));
}

.framework-viewer-pro__dialog {
  position: relative;
  z-index: 2;
  width: min(95vw, 1400px);
  max-height: 95vh;
  margin: 2.5vh auto;
  padding: 16px;
  box-sizing: border-box;
}

.framework-viewer-pro__dialog-image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: calc(95vh - 80px);
}

.framework-viewer-pro__dialog-image {
  display: block;
  max-width: 100%;
  max-height: 88vh;
  width: auto;
  height: auto;
  border-radius: 12px;
}

.framework-viewer-pro__dialog-caption {
  margin-top: 16px;
  color: #fff;
  text-align: center;
}

.framework-viewer-pro__close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 767px) {
  .framework-viewer-pro__dialog {
    width: 100vw;
    margin: 0;
    padding: 12px;
  }

  .framework-viewer-pro__dialog-image {
    max-height: 78vh;
  }
}