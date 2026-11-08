import { Icon } from "../components/Icon";

// Put your CV at public/Murphy_CV.pdf (same file name) to replace the placeholder.
const CV_URL = "/Murphy_CV.pdf";
export function Cv() {
  return (
    <div className="cv">
      <div className="cvbar">
        <a className="btn" href={CV_URL} download><Icon name="download" size={16} /> Download</a>
        <a className="btn alt" href={CV_URL} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> Open in new tab</a>
      </div>
      <iframe title="Curriculum vitae" src={`${CV_URL}#view=FitH`} />
      <p>If the preview doesn't load on your device, use Download.</p>
    </div>
  );
}
