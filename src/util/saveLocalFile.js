
/**
 * Save a file to the local file system
 *
 * @param {*} text  text blob to save.
 * @param {*} defaultFileName User can change this in the File Chooser dialog
 */
export default function saveLocalFile(text, defaultFileName) {
    const safeText = encodeURI(text);
    const anchor = document.createElement("a");
    if ('download' in anchor) {
        anchor.href = "data:" + 'application/json;' + "charset=utf-8," + safeText;
        anchor.setAttribute("download", defaultFileName);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else throw 'File saving not supported for this browser';
}